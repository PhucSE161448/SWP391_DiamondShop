using Application.Interfaces;
using Application.Interfaces.WarrantyDocument;
using Application.ViewModels.CaratWeights;
using Application.ViewModels.WarrantyDocuments;
using AutoMapper;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.WarrantyDocuments
{
    public class WarrantyDocumentService : IWarrantyDocumentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public WarrantyDocumentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }
        public async Task<ServiceResponse<WarrantyDocumentDTO>> CreateWarrantyDocumentAsync(UpsertWarrantyDocumentDTO CreatedWarrantyDocumentDTO)
        {
            var response = new ServiceResponse<WarrantyDocumentDTO>();
            try
            {
                var warranty = _mapper.Map<WarrantyDocument>(CreatedWarrantyDocumentDTO);
                await _unitOfWork.WarrantyDocumentRepo.AddAsync(warranty);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    var warrantyDocumentDTO = _mapper.Map<WarrantyDocumentDTO>(warranty);
                    response.Data = warrantyDocumentDTO;
                    response.Success = true;
                    response.Message = "WarrantyDocument created successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "WarrantyDocument CaratWeight failed";
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

        public async Task<ServiceResponse<bool>> DeleteWarrantyDocumentAsync(int id)
        {
            var response = new ServiceResponse<bool>();
            var exist = await _unitOfWork.WarrantyDocumentRepo.GetByIdAsync(id);
            if (exist == null)
            {
                response.Success = false;
                response.Message = "WarrantyDocument not found";
                return response;
            }
            try
            {
                _unitOfWork.WarrantyDocumentRepo.SoftRemove(exist);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    response.Success = true;
                    response.Message = "WarrantyDocument deleted successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "WarrantyDocument CaratWeight failed";
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

        public async Task<ServiceResponse<IEnumerable<WarrantyDocumentDTO>>> GetAllWarrantyDocumenttAsync()
        {
            var _response = new ServiceResponse<IEnumerable<WarrantyDocumentDTO>>();
            try
            {
                var warrantyDocuments = await _unitOfWork.WarrantyDocumentRepo.GetAllAsync();
                var warrantyDocumentDTOS = new List<WarrantyDocumentDTO>();
                foreach (var pro in warrantyDocuments)
                {
                    warrantyDocumentDTOS.Add(_mapper.Map<WarrantyDocumentDTO>(pro));
                }
                if (warrantyDocumentDTOS.Count != 0)
                {
                    _response.Success = true;
                    _response.Message = "WarrantyDocument retrieved successfully";
                    _response.Data = warrantyDocumentDTOS;
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "WarrantyDocument not found";
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

        public async Task<ServiceResponse<WarrantyDocumentDTO>> GetWarrantyDocumentAsync(int id)
        {
            var _response = new ServiceResponse<WarrantyDocumentDTO>();
            try
            {
                var warrantyDocument = await _unitOfWork.WarrantyDocumentRepo.GetAsync(x => x.Id == id);
                if (warrantyDocument != null)
                {
                    _response.Success = true;
                    _response.Message = "WarrantyDocument retrieved successfully";
                    _response.Data = _mapper.Map<WarrantyDocumentDTO>(warrantyDocument);
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "WarrantyDocument not found";
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

        public async Task<ServiceResponse<WarrantyDocumentDTO>> UpdateWarrantyDocumentAsync(int id, UpsertWarrantyDocumentDTO warrantyDocumentDTO)
        {
            var response = new ServiceResponse<WarrantyDocumentDTO>();
            var exist = await _unitOfWork.WarrantyDocumentRepo.GetByIdAsync(id);
            if (exist == null)
            {
                response.Success = false;
                response.Message = "WarrantyDocument not found";
                return response;
            }
            try
            {
                var warrantyDocument = _mapper.Map(warrantyDocumentDTO, exist);
                _unitOfWork.WarrantyDocumentRepo.Update(warrantyDocument);
                var isSuccess = await _unitOfWork.SaveChangeAsync() > 0;
                if (isSuccess)
                {
                    response.Success = true;
                    response.Message = "WarrantyDocument updated successfully";
                    response.Data = _mapper.Map<WarrantyDocumentDTO>(warrantyDocument);
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
