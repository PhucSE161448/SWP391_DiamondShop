using Application.Interfaces;
using Application.Interfaces.Cut;
using Application.ViewModels.Cuts;
using AutoMapper;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Cuts
{
    public class CutService : ICutService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CutService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<IEnumerable<CutDTO>>> GetAllCutAsync()
        {
            var _response = new ServiceResponse<IEnumerable<CutDTO>>();
            try
            {
                var Cuts = await _unitOfWork.CutRepo.GetAllAsync();
                var CutDTOs = new List<CutDTO>();
                foreach (var pro in Cuts)
                {
                    CutDTOs.Add(_mapper.Map<CutDTO>(pro));
                }
                if (CutDTOs.Count != 0)
                {
                    _response.Success = true;
                    _response.Message = "Cut retrieved successfully";
                    _response.Data = CutDTOs;
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "Cut not found";
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

        public async Task<ServiceResponse<CutDTO>> GetCutAsync(int id)
        {
            var _response = new ServiceResponse<CutDTO>();
            try
            {
                var Cuts = await _unitOfWork.CutRepo.GetAsync(x => x.Id == id);
                if (Cuts != null)
                {
                    _response.Success = true;
                    _response.Message = "Cut retrieved successfully";
                    _response.Data = _mapper.Map<CutDTO>(Cuts);
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "Cut not found";
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
        public async Task<ServiceResponse<CutDTO>> CreateCutAsync(UpsertCutDTO CreatedCutDTO)
        {
            var response = new ServiceResponse<CutDTO>();
            try
            {
                var Cut = _mapper.Map<Cut>(CreatedCutDTO);
                await _unitOfWork.CutRepo.AddAsync(Cut);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    var CutDTO = _mapper.Map<CutDTO>(Cut);
                    response.Data = CutDTO;
                    response.Success = true;
                    response.Message = "Cut created successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Create Cut failed";
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

        public async Task<ServiceResponse<bool>> DeleteCutAsync(int id)
        {
            var response = new ServiceResponse<bool>();
            var exist = await _unitOfWork.CutRepo.GetByIdAsync(id);
            if (exist == null)
            {
                response.Success = false;
                response.Message = "Cut not found";
                return response;
            }
            try
            {
                _unitOfWork.CutRepo.SoftRemove(exist);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    response.Success = true;
                    response.Message = "Cut deleted successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Delete Cut failed";
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



        public async Task<ServiceResponse<CutDTO>> UpdateCutAsync(int id, UpsertCutDTO CutDTO)
        {
            var response = new ServiceResponse<CutDTO>();
            var exist = await _unitOfWork.CutRepo.GetByIdAsync(id);
            if (exist == null)
            {
                response.Success = false;
                response.Message = "Cut not found";
                return response;
            }
            try
            {
                var Cut = _mapper.Map(CutDTO, exist);
                _unitOfWork.CutRepo.Update(Cut);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    response.Success = true;
                    response.Message = "Cut updated successfully";
                    response.Data = _mapper.Map<CutDTO>(Cut);
                }
                else
                {
                    response.Success = false;
                    response.Message = "Update Cut failed";
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
