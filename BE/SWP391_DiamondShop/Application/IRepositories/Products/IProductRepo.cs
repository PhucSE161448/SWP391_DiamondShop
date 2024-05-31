using Application.Commons;
using Application.ViewModels.Products;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IRepositories.Products
{
    public interface IProductRepo : IGenericRepository<Product>
    {
        Task<Pagination<Product>> GetPagedProducts(QueryProductDTO queryProductDTO);
    }
}
