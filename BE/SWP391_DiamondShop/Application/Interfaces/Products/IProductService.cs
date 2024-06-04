using Application.Commons;
using Application.Services;
using Application.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Products
{
    public interface IProductService
    {
        Task<GetProductDetailDTO> GetProductDetailById(int id);
        Task<Pagination<GetProductPaginationDTO>> GetPagedProducts(QueryProductDTO queryProductDTO);
    }
}
