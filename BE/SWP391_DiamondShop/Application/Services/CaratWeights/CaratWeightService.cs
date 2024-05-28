using Application.Interfaces;
using Application.Interfaces.CaratWeights;
using Application.ViewModels.CaratWeights;
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
        public async Task<ServiceResponse<IEnumerable<CaratWeightDTO>>> GetAllCaratWeightAsync()
        {
            var _response = new ServiceResponse<IEnumerable<CaratWeightDTO>>();
            try
            {
                var CaratWeights = await _unitOfWork.CaratWeightRepo.GetAllAsync();
                var CaratWeightDTOs = new List<CaratWeightDTO>();
                foreach (var pro in CaratWeights)
                {
                    CaratWeightDTOs.Add(_mapper.Map<CaratWeightDTO>(pro));
                }
                if (CaratWeightDTOs.Count != 0)
                {
                    _response.Success = true;
                    _response.Message = "CaratWeight retrieved successfully";
                    _response.Data = CaratWeightDTOs;
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "CaratWeight not found";
                }
            }
            catch (DbException ex)
            {
                _response.Success = false;
                _response.Message = "Database error occurred.";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Data = null;
                _response.Message = "Error";
                _response.ErrorMessages = new List<string> { Convert.ToString(ex.Message) };
            }
            return _response;
        }

        public async Task<ServiceResponse<CaratWeightDTO>> GetCaratWeightAsync(int id)
        {
            var _response = new ServiceResponse<CaratWeightDTO>();
            try
            {
                var CaratWeights = await _unitOfWork.CaratWeightRepo.GetAsync(x => x.Id == id);
                if (CaratWeights != null)
                {
                    _response.Success = true;
                    _response.Message = "CaratWeight retrieved successfully";
                    _response.Data = _mapper.Map<CaratWeightDTO>(CaratWeights);
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "CaratWeight not found";
                }
            }
            catch (DbException ex)
            {
                _response.Success = false;
                _response.Message = "Database error occurred.";
                _response.ErrorMessages = new List<string> { ex.Message };
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Data = null;
                _response.Message = "Error";
                _response.ErrorMessages = new List<string> { Convert.ToString(ex.Message) };
            }
            return _response;
        }
        public async Task<ServiceResponse<CaratWeightDTO>> CreateCaratWeightAsync(UpsertCaratWeightDTO CreatedCaratWeightDTO)
        {
            var response = new ServiceResponse<CaratWeightDTO>();
            try
            {
                var CaratWeight = _mapper.Map<CaratWeight>(CreatedCaratWeightDTO);
                await _unitOfWork.CaratWeightRepo.AddAsync(CaratWeight);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    var CaratWeightDTO = _mapper.Map<CaratWeightDTO>(CaratWeight);
                    response.Data = CaratWeightDTO;
                    response.Success = true;
                    response.Message = "CaratWeight created successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Create CaratWeight failed";
                }

            }
            catch (DbException ex)
            {
                response.Success = false;
                response.Message = "Database error occurred.";
                response.ErrorMessages = new List<string> { ex.Message };
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }
            return response;
        }

        public async Task<ServiceResponse<bool>> DeleteCaratWeightAsync(int id)
        {
            var response = new ServiceResponse<bool>();
            var exist = await _unitOfWork.CaratWeightRepo.GetByIdAsync(id);
            if (exist == null)
            {
                response.Success = false;
                response.Message = "CaratWeight not found";
                return response;
            }
            try
            {
                _unitOfWork.CaratWeightRepo.SoftRemove(exist);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    response.Success = true;
                    response.Message = "CaratWeight deleted successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Delete CaratWeight failed";
                }
            }
            catch (DbException ex)
            {
                response.Success = false;
                response.Message = "Database error occurred.";
                response.ErrorMessages = new List<string> { ex.Message };
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }
            return response;
        }



        public async Task<ServiceResponse<CaratWeightDTO>> UpdateCaratWeightAsync(int id, UpsertCaratWeightDTO CaratWeightDTO)
        {
            var response = new ServiceResponse<CaratWeightDTO>();
            var exist = await _unitOfWork.CaratWeightRepo.GetByIdAsync(id);
            if (exist == null)
            {
                response.Success = false;
                response.Message = "CaratWeight not found";
                return response;
            }
            try
            {
                var CaratWeight = _mapper.Map(CaratWeightDTO, exist);
                _unitOfWork.CaratWeightRepo.Update(CaratWeight);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    response.Success = true;
                    response.Message = "CaratWeight updated successfully";
                    response.Data = _mapper.Map<CaratWeightDTO>(CaratWeight);
                }
                else
                {
                    response.Success = false;
                    response.Message = "Update CaratWeight failed";
                }
            }
            catch (DbException ex)
            {
                response.Success = false;
                response.Message = "Database error occurred.";
                response.ErrorMessages = new List<string> { ex.Message };
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }
            return response;
        }
    }
}
