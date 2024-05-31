using Application.Commons;
using Application.Interfaces;
using Application.Interfaces.Products;
using Application.ViewModels.Products;
using Application.ViewModels.WarrantyDocuments;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<Pagination<GetProductPaginationDTO>>> GetPagedProducts(QueryProductDTO queryProductDTO)
        {
            var _response = new ServiceResponse<Pagination<GetProductPaginationDTO>>();
            try
            {
                if (queryProductDTO.StartPrice > queryProductDTO.EndPrice)
                {
                    _response.Success = true;
                    _response.Message = "Products not found";
                }
                else
                {
                    var product = await _unitOfWork.ProductRepo.GetPagedProducts(queryProductDTO);
                    _response.Success = true;
                    _response.Message = "Products retrieved successfully";
                    _response.Data = _mapper.Map<Pagination<GetProductPaginationDTO>>(await _unitOfWork.ProductRepo.GetPagedProducts(queryProductDTO));
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
