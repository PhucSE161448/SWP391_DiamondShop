using Application.Commons;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Products;
using Application.ViewModels.Products;
using Application.ViewModels.WarrantyDocuments;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces.Images;
using Application.Interfaces.ProductParts;
using Application.Interfaces.ProductSizes;
using Domain.Model;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IProductPartService _productPartService;
        private readonly IProductSizeService _productSizeService;
        private readonly IImageService _imageService;

        public ProductService(IUnitOfWork unitOfWork, IMapper mapper, IProductPartService productPartService, IProductSizeService productSizeService, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _productPartService = productPartService;
            _productSizeService = productSizeService;
            _imageService = imageService;
        }
        public async Task<Pagination<GetProductPaginationDTO>> GetPagedProducts(QueryProductDTO queryProductDTO)
        {
            if (queryProductDTO.StartPrice > queryProductDTO.EndPrice)
            {
                throw new BadRequestException("Start price must be less than end price");
            }
            return _mapper.Map<Pagination<GetProductPaginationDTO>>(await _unitOfWork.ProductRepo.GetPagedProducts(queryProductDTO));
        }

        public async Task<GetProductIdDTO> CreateProduct(CreateProductDTO createProductDto)
        {
            var category = await _unitOfWork.CategoryRepo.GetByIdAsync(createProductDto.CategoryId);
            var warrantyDocument = await _unitOfWork.WarrantyDocumentRepo.GetByIdAsync(createProductDto.WarrantyDocumentsId);
            if (category is null)
            {
                throw new NotFoundException("Category is not existed");
            }
            if (warrantyDocument is null)
            {
                throw new NotFoundException("Warranty Document is not existed");
            }
            var product = _mapper.Map<Product>(createProductDto); 
            await _unitOfWork.ProductRepo.AddAsync(product);
            await _unitOfWork.SaveChangeAsync();
            if (!createProductDto.ProductImages.IsNullOrEmpty())
            {
                await _imageService.UploadProductImages(createProductDto.ProductImages, product.Id);
            }

            return new GetProductIdDTO {Id = product.Id};
        }

        public async Task<GetProductIdDTO> CreateProductProperties(int productId, CreateProductPropertiesDTO createProductPropertiesDto)
        {
            var product = await _unitOfWork.ProductRepo.GetByIdAsync(productId);
            if (product is null)
            {
                throw new NotFoundException("Product is not existed");
            }
            var inputDiamondIds = createProductPropertiesDto.CreateProductPartDtos.Select(p => p.DiamondId);
            var validDiamondIds = (await _unitOfWork.DiamondRepo.GetAllAsync()).Select(d => d.Id);
            foreach (var diamondId in inputDiamondIds)
            {
                if (!validDiamondIds.Contains(diamondId))
                {
                    throw new NotFoundException($"Diamond with ID: {diamondId} is not existed");
                }
            }
            await _productPartService.CreateProductPart(product.Id, createProductPropertiesDto.CreateProductPartDtos);
            if (!createProductPropertiesDto.CreateProductSizeDtos.IsNullOrEmpty())
            {
                await _productSizeService.CreateProductSizes(productId, createProductPropertiesDto.CreateProductSizeDtos);
            } 
            return new GetProductIdDTO {Id = product.Id};
        }
        public async Task UpdateProduct(int id, UpdateProductDTO updateProductDto)
        {
            var product = await _unitOfWork.ProductRepo.GetProductDetailById(id);
            if (product is null)
            {
                throw new NotFoundException("Product is not existed");
            }
            var category = await _unitOfWork.CategoryRepo.GetByIdAsync(updateProductDto.CategoryId);
            var warrantyDocument = await _unitOfWork.WarrantyDocumentRepo.GetByIdAsync(updateProductDto.WarrantyDocumentsId);
            if (category is null)
            {
                throw new NotFoundException("Category is not existed");
            }
            if (warrantyDocument is null)
            {
                throw new NotFoundException("Warranty Document is not existed");
            }
            _mapper.Map(updateProductDto, product);
            _unitOfWork.ProductRepo.Update(product);
            if (product.Images.Any())
            {
                await _imageService.DeleteImages(product.Images);
                product.Images.Clear();
            }
            await _unitOfWork.SaveChangeAsync();
            if (!updateProductDto.ProductImages.IsNullOrEmpty())
            {
                await _imageService.UploadProductImages(updateProductDto.ProductImages, product.Id);
            }
        }
        public async Task UpdateProductProperties(int productId, CreateProductPropertiesDTO createProductPropertiesDto)
        {
            var product = await _unitOfWork.ProductRepo.GetProductDetailById(productId);
            if (product is null)
            {
                throw new NotFoundException("Product is not existed");
            }
            var inputDiamondIds = createProductPropertiesDto.CreateProductPartDtos.Select(p => p.DiamondId);
            var validDiamondIds = (await _unitOfWork.DiamondRepo.GetAllAsync()).Select(d => d.Id);
            foreach (var diamondId in inputDiamondIds)
            {
                if (!validDiamondIds.Contains(diamondId))
                {
                    throw new NotFoundException($"Diamond with ID: {diamondId} is not existed");
                }
            }
            if (product.ProductParts.Any())
            {
                await _unitOfWork.ProductPartRepo.DeleteRangeAsync(product.ProductParts);
                product.ProductParts.Clear();
            }
            if (product.ProductSizes.Any())
            {
                await _productSizeService.DeleteProductSize(product.ProductSizes);
                product.ProductSizes.Clear();
            }
            await _unitOfWork.SaveChangeAsync();
            await _productPartService.CreateProductPart(product.Id, createProductPropertiesDto.CreateProductPartDtos);
            if (!createProductPropertiesDto.CreateProductSizeDtos.IsNullOrEmpty())
            {
                await _productSizeService.CreateProductSizes(product.Id, createProductPropertiesDto.CreateProductSizeDtos);
            }
        }

        public async Task DeleteOrEnable(int productId, bool isDeleted)
        {
            var product = await _unitOfWork.ProductRepo.GetProductDetailById(productId);
            if (product is null)
            {
                throw new NotFoundException("Product is not existed");
            }

            product.IsDeleted = isDeleted;
            foreach (var image in product.Images)
            {
                image.IsDeleted = isDeleted;
            }

            foreach (var productPart in product.ProductParts)
            {
                productPart.IsDeleted = isDeleted;
            }

            foreach (var productSize in product.ProductSizes)
            {
                productSize.IsDeleted = isDeleted;
            }
            await _unitOfWork.SaveChangeAsync();
        }

        public async Task<GetProductDetailDTO> GetProductDetailById(int id)
        {
            var product = await _unitOfWork.ProductRepo.GetProductDetailById(id);
            if (product is null)
            {
                throw new NotFoundException("Product not found");
            }
            return _mapper.Map<GetProductDetailDTO>(product);
        }
    }
}
