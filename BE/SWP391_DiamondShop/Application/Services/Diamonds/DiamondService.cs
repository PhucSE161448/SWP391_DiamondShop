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
using Domain.Model;

namespace Application.Services.Diamonds
{
    public class DiamondService : IDiamondService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DiamondService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<GetDiamondDetailDTO> GetDiamondDetailById(int id)
        {
            var diamond = await _unitOfWork.DiamondRepo.GetDiamondDetailById(id);
            if (diamond is null)
            {
                throw new NotFoundException("Product is not existed");
            }
            return _mapper.Map<GetDiamondDetailDTO>(diamond);
        }

        public async Task<GetDiamondIdDTO> CreateDiamond(CreateDiamondDTO createDiamondDto)
        {
            var clarity = await _unitOfWork.ClarityRepo.GetByIdAsync(createDiamondDto.ClarityId);
            var cut = await _unitOfWork.CutRepo.GetByIdAsync(createDiamondDto.CutId);
            var origin = await _unitOfWork.OriginRepo.GetByIdAsync(createDiamondDto.OriginId);
            var caratWeight = await _unitOfWork.CaratWeightRepo.GetByIdAsync(createDiamondDto.CaratWeightId);
            if (clarity is null)
            {
                throw new NotFoundException("Clarity is not existed");
            }
            if (cut is null)
            {
                throw new NotFoundException("Cut is not existed");
            }
            if (origin is null)
            {
                throw new NotFoundException("Origin is not existed");
            }
            if (caratWeight is null)
            {
                throw new NotFoundException("Carat Weight is not existed");
            }
            var diamond = _mapper.Map<Diamond>(createDiamondDto);
            await _unitOfWork.DiamondRepo.AddAsync(diamond);
            await _unitOfWork.SaveChangeAsync();
            return new GetDiamondIdDTO { Id = diamond.Id };
        }

        public async Task UpdateDiamond(int id, UpdateDiamondDTO updateDiamondDto)
        {
            var diamond = await _unitOfWork.DiamondRepo.GetByIdAsync(id);
            var clarity = await _unitOfWork.ClarityRepo.GetByIdAsync(updateDiamondDto.ClarityId);
            var cut = await _unitOfWork.CutRepo.GetByIdAsync(updateDiamondDto.CutId);
            var origin = await _unitOfWork.OriginRepo.GetByIdAsync(updateDiamondDto.OriginId);
            var caratWeight = await _unitOfWork.CaratWeightRepo.GetByIdAsync(updateDiamondDto.CaratWeightId);
            if (diamond is null)
            {
                throw new NotFoundException("Diamond is not existed");
            }
            if (clarity is null)
            {
                throw new NotFoundException("Clarity is not existed");
            }
            if (cut is null)
            {
                throw new NotFoundException("Cut is not existed");
            }
            if (origin is null)
            {
                throw new NotFoundException("Origin is not existed");
            }
            if (caratWeight is null)
            {
                throw new NotFoundException("Carat Weight is not existed");
            }
            _unitOfWork.DiamondRepo.Update(_mapper.Map(updateDiamondDto, diamond));
            await _unitOfWork.SaveChangeAsync();
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
