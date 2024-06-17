using Application.Commons;
using Application.Services;
using Application.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.ProductParts;

namespace Application.Interfaces.Products
{
    public interface IProductService
    {
        Task<GetProductIdDTO> CreateProduct(CreateProductDTO createProductDto);
        Task UpdateProduct(int id, UpdateProductDTO updateProductDto);
        Task<GetProductDetailDTO> GetProductDetailById(int id);
        Task<Pagination<GetProductPaginationDTO>> GetPagedProducts(QueryProductDTO queryProductDTO);
        Task<GetProductIdDTO> CreateProductProperties(int productId, CreateProductPropertiesDTO createProductPropertiesDto);
        Task UpdateProductProperties(int productId, CreateProductPropertiesDTO createProductPropertiesDto);
        Task DeleteOrEnable(int productId, bool isDeleted);
    }
}
