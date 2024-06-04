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

namespace Application.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Pagination<GetProductPaginationDTO>> GetPagedProducts(QueryProductDTO queryProductDTO)
        {
            if (queryProductDTO.StartPrice > queryProductDTO.EndPrice)
            {
                throw new BadRequestException("Start price must be less than end price");
            }
            return _mapper.Map<Pagination<GetProductPaginationDTO>>(await _unitOfWork.ProductRepo.GetPagedProducts(queryProductDTO));
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
