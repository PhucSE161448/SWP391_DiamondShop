using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.CaratWeights;
using Application.ViewModels.CaratWeights;
using Application.ViewModels.Cuts;
using AutoMapper;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.CaratWeights
{
    public class CaratWeightService : ICaratWeightService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CaratWeightService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<IEnumerable<CaratWeightDTO>> GetAllCaratWeightAsync()
        {
            var CaratWeights = await _unitOfWork.CaratWeightRepo.GetAllAsync(x => x.IsDeleted == false);
            var CaratWeightDTOs = new List<CaratWeightDTO>();
            foreach (var pro in CaratWeights)
            {
                CaratWeightDTOs.Add(_mapper.Map<CaratWeightDTO>(pro));
            }
            return CaratWeightDTOs;
        }  

        public async Task<CaratWeightDTO> GetCaratWeightAsync(int id)
        {
            var CaratWeights = await _unitOfWork.CaratWeightRepo.GetAsync(x => x.Id == id);
            if (CaratWeights == null)
            {
                throw new NotFoundException("Carat Weight not found");
            }
            return _mapper.Map<CaratWeightDTO>(CaratWeights);
        }
        public async Task<CaratWeightDTO> CreateCaratWeightAsync(UpsertCaratWeightDTO CreatedCaratWeightDTO)
        {
            var response = new ServiceResponse<CaratWeightDTO>();
            var CaratWeight = _mapper.Map<CaratWeight>(CreatedCaratWeightDTO);
            await _unitOfWork.CaratWeightRepo.AddAsync(CaratWeight);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<CaratWeightDTO>(CaratWeight);
        }

        public async Task DeleteCaratWeightAsync(int id)
        {
            var exist = await _unitOfWork.CaratWeightRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Carat Weight not found");
            }
            if (exist.IsDeleted)
            {
                throw new BadRequestException("Carat Weight is already deleted");
            }
            _unitOfWork.CaratWeightRepo.SoftRemove(exist);
            await _unitOfWork.SaveChangeAsync();
        }



        public async Task<CaratWeightDTO> UpdateCaratWeightAsync(int id, UpsertCaratWeightDTO CaratWeightDTO)
        {
            var exist = await _unitOfWork.CaratWeightRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Carat Weight not found");
            }
            var CaratWeight = _mapper.Map(CaratWeightDTO, exist);
            _unitOfWork.CaratWeightRepo.Update(CaratWeight);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<CaratWeightDTO>(CaratWeight);
        }
    }
}
