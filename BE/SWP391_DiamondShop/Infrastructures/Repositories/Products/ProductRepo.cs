using Application.Commons;
using Application.Interfaces;
using Application.IRepositories.Products;
using Application.Ultils;
using Application.ViewModels.Products;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.Products
{
    public class ProductRepo : GenericRepository<Product>, IProductRepo
    {
        private readonly SWP391_DiamondShopContext _dbContext;

        public ProductRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) : base(context, timeService, claimsService)
        {
            this._dbContext = context;
        }
        public async Task<Pagination<Product>> GetPagedProducts(QueryProductDTO queryProductDTO)
        {
            var (pageNumber, pageSize, sortBy, orderByDesc) = queryProductDTO.queryDTO;
            var query = _dbContext.Products.AsNoTracking()
                                          .Where(p => p.IsDeleted == false)
                                          .Include(p => p.Category)
                                          .Include(p => p.Diamond)
                                          .AsSplitQuery()
                                          .AsQueryable();
            query = query.ApplyProductFilter(queryProductDTO);
            query = orderByDesc == true ? query.OrderByDescending(GetSortProperty(sortBy)) : query.OrderBy(GetSortProperty(sortBy));
            return await query.ToPaginationAsync(pageNumber, pageSize);
        }
        private Expression<Func<Product, object>> GetSortProperty(string sortColumn)
        {
            return sortColumn.ToLower() switch
            {
                "modifiedDate" => p => (p.ModifiedDate == null) ? p.Id : p.ModifiedDate,
                "price" => p => p.Price,
                "name" => p => p.Name,  
                _ => p => p.Id
            };
        }
    }
}
