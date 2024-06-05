using Application.Commons;
using Application.Interfaces;
using Application.IRepositories.Diamonds;
using Application.Ultils;
using Application.ViewModels.Diamonds;
using Application.ViewModels.Products;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.Diamonds
{
    public class DiamondRepo : GenericRepository<Diamond>, IDiamondRepo
    {
        private readonly SWP391_DiamondShopContext _dbContext;

        public DiamondRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) : base(context, timeService, claimsService)
        {
            this._dbContext = context;
        }

        public async Task<Diamond?> GetDiamondDetailById(int id)
        {
            return await _dbContext.Diamonds.Include(p => p.CaratWeight)
                                             .Include(p => p.Clarity)
                                             .Include(p => p.Images)
                                             .Include(p => p.Origin)
                                             .Include(p => p.Cut)
                                             .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Pagination<Diamond>> GetPagedDiamonds(QueryDiamondDTO queryDiamondDTO)
        {
            var (pageNumber, pageSize, sortBy, orderByDesc) = queryDiamondDTO.QueryDTO;
            var query = _dbContext.Diamonds.AsNoTracking()
                                          .Where(p => p.IsDeleted == false)
                                          .Include(p => p.CaratWeight)
                                          .Include(p => p.Origin)
                                          .Include(P => P.Clarity)
                                          .Include(P => P.Cut)
                                          .Include(P => P.Images)
                                          .AsSplitQuery()
                                          .AsQueryable();
            query = query.ApplyDiamondsFilter(queryDiamondDTO);
            query = orderByDesc == true ? query.OrderByDescending(GetSortProperty(sortBy))
                                        : query.OrderBy(GetSortProperty(sortBy));
            return await query.ToPaginationAsync(pageNumber, pageSize);
        }
        private Expression<Func<Diamond, object>> GetSortProperty(string sortColumn)
        {
            return sortColumn.ToLower() switch
            {
                "modifiedDate" => p => (p.ModifiedDate == null) ? p.Id : p.ModifiedDate,
                //"name" => p => p.Name,
                "price" => p => p.Price,
                _ => p => p.Id
            };
        }
    }
}
