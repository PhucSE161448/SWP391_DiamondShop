using Application.Commons;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Diamond;
using Application.ViewModels.Diamonds;
using Application.ViewModels.Products;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces.Images;
using Application.IRepositories.Images;
using Domain.Model;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services.Diamonds
{
    public class DiamondService : IDiamondService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;

        public DiamondService(IUnitOfWork unitOfWork, IMapper mapper, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<GetDiamondDetailDTO> GetDiamondDetailById(int id)
        {
            var diamond = await _unitOfWork.DiamondRepo.GetAsync(d => d.Id == id, "Images");
            if (diamond is null)
            {
                throw new NotFoundException("Diamond is not existed");
            }
            return _mapper.Map<GetDiamondDetailDTO>(diamond);
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
            var diamond = _mapper.Map<Diamond>(createDiamondDto);
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
            var diamond = await _unitOfWork.DiamondRepo.GetAsync(p => p.Id == id, "Images");
            if (diamond is null)
            {
                throw new NotFoundException("Diamond is not existed");
            }
            _unitOfWork.DiamondRepo.Update(_mapper.Map(updateDiamondDto, diamond));
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
            return _mapper.Map<Pagination<GetDiamondPaginationDTO>>(await _unitOfWork.DiamondRepo.GetPagedDiamonds(queryDiamondDTO));
        }
    }
}
