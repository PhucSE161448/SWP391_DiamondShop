using Application.Commons;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Diamond;
using Application.ViewModels.Diamonds;
using Application.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces.Images;
using Application.IRepositories.Images;
using Domain.Model;
using Mapster;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services.Diamonds
{
    public class DiamondService : IDiamondService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;

        public DiamondService(IUnitOfWork unitOfWork, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
        }

        public async Task<GetDiamondDetailDTO> GetDiamondDetailById(int id)
        {
            var diamond = await _unitOfWork.DiamondRepo.GetDiamondDetailById(id);
            if (diamond is null)
            {
                throw new NotFoundException("Diamond is not existed");
            }

            //Check if voucher exist?
            var voucherList = await _unitOfWork.VoucherRepository.GetAllVoucherAsync();
            foreach(var voucher in voucherList)
            {
                if(voucher.IsAllProduct == true)
                {
                    //Final price = Price - (Price * discount/100)
                    diamond.Price = diamond.Price - (diamond.Price * (voucher.DiscountPercentage / 100));
                }
            }

            return diamond.Adapt<GetDiamondDetailDTO>();
        }

        public async Task DeleteOrEnable(int diamondId, bool isDeleted)
        {
            var diamond = await _unitOfWork.DiamondRepo.GetAsync(d => d.Id == diamondId, "Images");
            if (diamond is null)
            {
                throw new NotFoundException("Diamond is not existed");
            }
            diamond.IsDeleted = isDeleted;
            foreach (var image in diamond.Images)
            {
                image.IsDeleted = isDeleted;
            }

            await _unitOfWork.SaveChangeAsync();
        }

        public async Task<GetDiamondIdDTO> CreateDiamond(CreateDiamondDTO createDiamondDto)
        {
            var certificate = await _unitOfWork.CertificateRepo.GetAsync(x => x.Id == createDiamondDto.CertificateId,
                includeProperties: "Diamond");
            if (certificate is  null)
            {
                throw new NotFoundException("Certificate is not existed");
            }

            if (certificate.Diamond is not null)
            {
                throw new BadRequestException("This certificate is already related to another diamond");
            }
            var diamond = createDiamondDto.Adapt<Diamond>();
            diamond.Name = createDiamondDto.Origin + " " + createDiamondDto.CaratWeight + " " + createDiamondDto.Color + " "
                           + createDiamondDto.Clarity + " "
                           + createDiamondDto.Cut;
            await _unitOfWork.DiamondRepo.AddAsync(diamond);
            await _unitOfWork.SaveChangeAsync();
            if (!createDiamondDto.DiamondImages.IsNullOrEmpty())
            {
                await _imageService.UploadDiamondImages(createDiamondDto.DiamondImages, diamond.Id);
            }
            return new GetDiamondIdDTO { Id = diamond.Id };
        }

        public async Task UpdateDiamond(int id, UpdateDiamondDTO updateDiamondDto)
        {
            var diamond = await _unitOfWork.DiamondRepo.GetDiamondDetailById(id);
            if (diamond is null)
            {
                throw new NotFoundException("Diamond is not existed");
            }
            _unitOfWork.DiamondRepo.Update(updateDiamondDto.Adapt(diamond));
            diamond.Name = diamond.Origin + " " + diamond.CaratWeight + " " + diamond.Color + " "
                           + diamond.Clarity + " "
                           + diamond.Cut;
            _unitOfWork.CertificateRepo.Update(updateDiamondDto.Adapt(diamond.Certificate));
            if (diamond.Images.Any())
            {
                await _imageService.DeleteImages(diamond.Images);
                diamond.Images.Clear();
            }

            await _unitOfWork.SaveChangeAsync();
            if (!updateDiamondDto.DiamondImages.IsNullOrEmpty())
            {
                await _imageService.UploadDiamondImages(updateDiamondDto.DiamondImages, diamond.Id);
            }
        }

        public async Task<Pagination<GetDiamondPaginationDTO>> GetPageDiamonds(QueryDiamondDTO queryDiamondDTO)
        {
            if (queryDiamondDTO.StartPrice > queryDiamondDTO.EndPrice)
            {
                throw new BadRequestException("Start price must be less than end price");
            }
            var pagedDiamondList = await _unitOfWork.DiamondRepo.GetPagedDiamonds(queryDiamondDTO);

            // Check voucher
            var voucherList = await _unitOfWork.VoucherRepository.GetAllVoucherAsync();

            foreach (var voucher in voucherList)
            {
                if (voucher.IsAllProduct == true)
                {
                    foreach (var diamond in pagedDiamondList.Items)
                    {
                        diamond.Price = diamond.Price - (diamond.Price * voucher.DiscountPercentage / 100);
                    }
                }
            }

            return pagedDiamondList.Adapt<Pagination<GetDiamondPaginationDTO>>();
            
        }
    }
}
