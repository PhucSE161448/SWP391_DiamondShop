using Application.Commons;
using Application.ViewModels.Diamonds;
using Application.ViewModels.Products;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Ultils
{
    public static class IQueryableExtension
    {
        public static async Task<Pagination<T>> ToPaginationAsync<T>(this IQueryable<T> query, int pageNumber, int pageSize) 
        where T : class
        {
            return new Pagination<T> 
            {
                Items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(),
                PageIndex = pageNumber,
                PageSize = pageSize,
                TotalItemsCount = await query.CountAsync()
            };
        }
        public static IQueryable<Product> ApplyProductFilter(this IQueryable<Product> query, QueryProductDTO queryProductDTO)
        {
            var startPrice = queryProductDTO.StartPrice;
            var endPrice = queryProductDTO.EndPrice;
            var categoryIds = queryProductDTO.CategoryIds;
            var name = queryProductDTO.Name;
            var diamondIds = queryProductDTO.DiamondIds;
            if (startPrice < endPrice)
            {
                query = query.Where(p => p.ProductSizes.Any(pp => pp.Price >= startPrice && pp.Price <= endPrice));
            }
            if (!categoryIds.IsNullOrEmpty())
                query = query.Where(p =>  categoryIds.Contains(p.CategoryId));
            if (!string.IsNullOrEmpty(name))
                query = query.Where(p => !string.IsNullOrEmpty(p.Name) && p.Name.ToLower().Contains(name.ToLower()));
            if (!diamondIds.IsNullOrEmpty())
                query = query.Where(p => p.ProductParts.Any(pp => diamondIds.Contains(pp.DiamondId)));
            return query;
        }
        public static IQueryable<Diamond> ApplyDiamondsFilter(this IQueryable<Diamond> query, QueryDiamondDTO queryDiamondDTO)
        {
            var startPrice = queryDiamondDTO.StartPrice;
            var endPrice = queryDiamondDTO.EndPrice;
            var startCaratWeight = queryDiamondDTO.StartCaratWeight;
            var endCaratWeight = queryDiamondDTO.EndCaratWeight;
            var name = queryDiamondDTO.Name;
            var colors = queryDiamondDTO.Colors.Select(c => c.ToLower()).ToList();
            var clarities = queryDiamondDTO.Clarities.Select(c => c.ToLower()).ToList();
            var cuts = queryDiamondDTO.Cuts;
            if (startPrice < endPrice)
            {
                query = query.Where(p => p.Price >= startPrice && p.Price <= endPrice);
            }

            if (startCaratWeight < endCaratWeight)
            {
                query = query.Where(p => p.CaratWeight >= startCaratWeight && p.CaratWeight <= endCaratWeight);
            }
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(p => !string.IsNullOrEmpty(p.Name) && p.Name.ToLower().Contains(name.ToLower()));
            }
            if (!colors.IsNullOrEmpty())
            {
                query = query.Where(p => colors.Contains(p.Color.ToLower()));
            }
            if (!clarities.IsNullOrEmpty())
            {
                query = query.Where(p => clarities.Contains(p.Clarity.ToLower()));
            }
            if (!cuts.IsNullOrEmpty())
            {
                query = query.Where(p => cuts.Contains(p.Cut.ToLower()));
            }
            return query;
        }
    }
}
