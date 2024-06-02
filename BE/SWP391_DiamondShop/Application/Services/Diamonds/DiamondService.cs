using Application.Commons;
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

        public async Task<ServiceResponse<GetDiamondDetailDTO>> GetDiamondDetailById(int id)
        {
            var _response = new ServiceResponse<GetDiamondDetailDTO>();
            try
            {
                var product = await _unitOfWork.DiamondRepo.GetDiamondDetailById(id);
                if (product != null)
                {
                    _response.Success = true;
                    _response.Message = "Diamond retrieved successfully";
                    _response.Data = _mapper.Map<GetDiamondDetailDTO>(product);
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "Diamond not found";
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

        public async Task<ServiceResponse<Pagination<GetDiamondPaginationDTO>>> GetPageDiamonds(QueryDiamondDTO queryDiamondDTO)
        {
            var _response = new ServiceResponse<Pagination<GetDiamondPaginationDTO>>();
            try
            {
                var diamond = await _unitOfWork.DiamondRepo.GetPagedDiamonds(queryDiamondDTO);
                if (queryDiamondDTO.StartPrice > queryDiamondDTO.EndPrice)
                {
                    _response.Success = true;
                    _response.Message = "End Price must larger than Start Price";
                }
                else if (diamond == null)
                {
                    _response.Success = true;
                    _response.Message = "List is empty";
                }
                else
                {
                    _response.Success = true;
                    _response.Message = "Diamond retrieved successfully";
                    _response.Data = _mapper.Map<Pagination<GetDiamondPaginationDTO>>(await _unitOfWork.DiamondRepo.GetPagedDiamonds(queryDiamondDTO));
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
    }
}
