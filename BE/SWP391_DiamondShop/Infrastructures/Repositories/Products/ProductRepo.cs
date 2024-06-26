﻿using Application.Commons;
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
                                          .Include(p => p.Category)
                                          .Include(p => p.Collection)
                                          .Include(p => p.DiamondCase)
                                          .Include(p => p.ProductParts)
                                          .ThenInclude(pp => pp.Diamond)
                                          .Include(p => p.ProductSizes)
                                          .Include(p => p.Images)
                                          .AsQueryable();
            query = query.ApplyProductFilter(queryProductDTO);
            query = orderByDesc == true ? query.OrderByDescending(GetSortProperty(sortBy)) : query.OrderBy(GetSortProperty(sortBy));
            return await query.ToPaginationAsync(pageNumber, pageSize);
        }

        public async Task<Product?> GetProductDetailById(int id)
        {
           var product = await _dbContext.Products
                                        .Include(p => p.Category)
                                        .Include(p => p.Collection)
                                        .Include(p => p.DiamondCase)
                                        .Include(p => p.ProductSizes)
                                        .Include(p => p.Images)
                                        .Include(p => p.ProductParts)
                                        .ThenInclude(pp => pp.Diamond)
                                        .SingleOrDefaultAsync(x => x.Id == id);
            return product;
        }

        private Expression<Func<Product, object>> GetSortProperty(string sortColumn)
        {
            return sortColumn.ToLower() switch
            {
                "modifiedDate" => p => (p.ModifiedDate == null) ? p.Id : p.ModifiedDate,
                "name" => p => p.Name,
                "price" => p => p.ProductSizes.OrderBy(pp => pp.Size).Select(pp => pp.Price).FirstOrDefault(),
                _ => p => p.Id
            };
        }
    }
}
