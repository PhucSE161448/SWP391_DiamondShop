using Application.Interfaces;
using Application.Interfaces.Clarity;
using Application.ViewModels.Clarities;
using AutoMapper;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Clarities
{
    public class ClarityService : IClarityService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ClarityService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<IEnumerable<ClarityDTO>>> GetAllClarityAsync()
        {
            var _response = new ServiceResponse<IEnumerable<ClarityDTO>>();
            try
            {
                var Claritys = await _unitOfWork.ClarityRepo.GetAllAsync();
                var ClarityDTOs = new List<ClarityDTO>();
                foreach (var pro in Claritys)
                {
                    ClarityDTOs.Add(_mapper.Map<ClarityDTO>(pro));
                }
                if (ClarityDTOs.Count != 0)
                {
                    _response.Success = true;
                    _response.Message = "Clarity retrieved successfully";
                    _response.Data = ClarityDTOs;
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "Clarity not found";
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

        public async Task<ServiceResponse<ClarityDTO>> GetClarityAsync(int id)
        {
            var _response = new ServiceResponse<ClarityDTO>();
            try
            {
                var Claritys = await _unitOfWork.ClarityRepo.GetAsync(x => x.Id == id);
                if (Claritys != null)
                {
                    _response.Success = true;
                    _response.Message = "Clarity retrieved successfully";
                    _response.Data = _mapper.Map<ClarityDTO>(Claritys);
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "Clarity not found";
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
        public async Task<ServiceResponse<ClarityDTO>> CreateClarityAsync(UpsertClarityDTO CreatedClarityDTO)
        {
            var response = new ServiceResponse<ClarityDTO>();
            try
            {
                var Clarity = _mapper.Map<Clarity>(CreatedClarityDTO);
                await _unitOfWork.ClarityRepo.AddAsync(Clarity);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    var ClarityDTO = _mapper.Map<ClarityDTO>(Clarity);
                    response.Data = ClarityDTO;
                    response.Success = true;
                    response.Message = "Clarity created successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Create Clarity failed";
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

        public async Task<ServiceResponse<bool>> DeleteClarityAsync(int id)
        {
            var response = new ServiceResponse<bool>();
            var exist = await _unitOfWork.ClarityRepo.GetByIdAsync(id);
            if (exist == null)
            {
                response.Success = false;
                response.Message = "Clarity not found";
                return response;
            }
            try
            {
                _unitOfWork.ClarityRepo.SoftRemove(exist);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    response.Success = true;
                    response.Message = "Clarity deleted successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Delete Clarity failed";
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



        public async Task<ServiceResponse<ClarityDTO>> UpdateClarityAsync(int id, UpsertClarityDTO ClarityDTO)
        {
            var response = new ServiceResponse<ClarityDTO>();
            var exist = await _unitOfWork.ClarityRepo.GetByIdAsync(id);
            if (exist == null)
            {
                response.Success = false;
                response.Message = "Clarity not found";
                return response;
            }
            try
            {
                var Clarity = _mapper.Map(ClarityDTO, exist);
                _unitOfWork.ClarityRepo.Update(Clarity);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    response.Success = true;
                    response.Message = "Clarity updated successfully";
                    response.Data = _mapper.Map<ClarityDTO>(Clarity);
                }
                else
                {
                    response.Success = false;
                    response.Message = "Update Clarity failed";
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
