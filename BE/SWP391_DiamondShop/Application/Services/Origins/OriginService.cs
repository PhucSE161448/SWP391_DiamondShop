using Application.Interfaces;
using Application.Interfaces.Origin;
using Application.ViewModels.Origins;
using AutoMapper;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Origins
{
    public class OriginService : IOriginService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OriginService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<IEnumerable<OriginDTO>>> GetAllOriginAsync()
        {
            var _response = new ServiceResponse<IEnumerable<OriginDTO>>();
            try
            {
                var Origins = await _unitOfWork.OriginRepo.GetAllAsync(x => x.IsDeleted == false);
                var OriginDTOs = new List<OriginDTO>();
                foreach (var pro in Origins)
                {
                    OriginDTOs.Add(_mapper.Map<OriginDTO>(pro));
                }
                if (OriginDTOs.Count != 0)
                {
                    _response.Success = true;
                    _response.Message = "Origin retrieved successfully";
                    _response.Data = OriginDTOs;
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "Origin not found";
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

        public async Task<ServiceResponse<OriginDTO>> GetOriginAsync(int id)
        {
            var _response = new ServiceResponse<OriginDTO>();
            try
            {
                var Origins = await _unitOfWork.OriginRepo.GetAsync(x => x.Id == id);
                if (Origins != null)
                {
                    _response.Success = true;
                    _response.Message = "Origin retrieved successfully";
                    _response.Data = _mapper.Map<OriginDTO>(Origins);
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "Origin not found";
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
        public async Task<ServiceResponse<OriginDTO>> CreateOriginAsync(UpsertOriginDTO CreatedOriginDTO)
        {
            var response = new ServiceResponse<OriginDTO>();
            try
            {
                var Origin = _mapper.Map<Origin>(CreatedOriginDTO);
                await _unitOfWork.OriginRepo.AddAsync(Origin);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    var OriginDTO = _mapper.Map<OriginDTO>(Origin);
                    response.Data = OriginDTO;
                    response.Success = true;
                    response.Message = "Origin created successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Create Origin failed";
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

        public async Task<ServiceResponse<bool>> DeleteOriginAsync(int id)
        {
            var response = new ServiceResponse<bool>();
            var exist = await _unitOfWork.OriginRepo.GetByIdAsync(id);
            if (exist == null)
            {
                response.Success = false;
                response.Message = "Origin not found";
                return response;
            }
            try
            {
                _unitOfWork.OriginRepo.SoftRemove(exist);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    response.Success = true;
                    response.Message = "Origin deleted successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Delete Origin failed";
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



        public async Task<ServiceResponse<OriginDTO>> UpdateOriginAsync(int id, UpsertOriginDTO OriginDTO)
        {
            var response = new ServiceResponse<OriginDTO>();
            var exist = await _unitOfWork.OriginRepo.GetByIdAsync(id);
            if (exist == null)
            {
                response.Success = false;
                response.Message = "Origin not found";
                return response;
            }
            try
            {
                var Origin = _mapper.Map(OriginDTO, exist);
                _unitOfWork.OriginRepo.Update(Origin);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    response.Success = true;
                    response.Message = "Origin updated successfully";
                    response.Data = _mapper.Map<OriginDTO>(Origin);
                }
                else
                {
                    response.Success = false;
                    response.Message = "Update Origin failed";
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
