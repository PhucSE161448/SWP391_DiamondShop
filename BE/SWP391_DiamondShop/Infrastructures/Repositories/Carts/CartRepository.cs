using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.IRepositories.Carts;
using Application.ViewModels.Carts;
using Domain.Model;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace Infrastructures.Repositories.Carts
{
    public class CartRepository : ICartRepository
    {
        private readonly SWP391_DiamondShopContext _dbContext;
        private readonly IClaimsService _claimsService;
        private readonly string _currentUserName;
        public CartRepository(
            SWP391_DiamondShopContext context,
            IClaimsService claimsService
        )
        {
            _dbContext = context;
            _claimsService = claimsService;
            _currentUserName = claimsService.GetCurrentUserId;
        }

        public async Task<Cart> CreateCart(bool check, CreateCartDTO dto)
        {
            var exist = await _dbContext.Carts.AsNoTracking().FirstOrDefaultAsync(x =>
         ((x.ProductId == dto.Id && check) || (x.DiamondId == dto.Id && !check))
         && x.IsDeleted == false && x.CreatedBy == _currentUserName);

            if (exist != null)
            {
                exist.Quantity++;
                _dbContext.Carts.Update(exist);
                return exist;
            }

            var cart = new Cart
            {
                Quantity = dto.Quantity,
                TotalPrice = dto.TotalPrice,
                CreatedDate = DateTime.Now,
                CreatedBy = _currentUserName,
                ProductId = check ? dto.Id : (int?)null,
                DiamondId = !check ? dto.Id : (int?)null
            };

            await _dbContext.Carts.AddAsync(cart);
            return cart;
        }

        public async Task<List<CartDTO>> GetCartWithUserId()
        {
            var cart = await _dbContext.Carts.Include(x => x.Product)
                                                           .ThenInclude(xx => xx.Images)
                                                           .Include(x => x.Product)
                                                           .ThenInclude(xx => xx.Category)    
                                                           .Include(x => x.Product)
                                                           .ThenInclude(xx => xx.DiamondCase)
                                                           .Include(x => x.Product)
                                                           .ThenInclude(xx => xx.ProductParts)
                                                           .Include(x => x.Product)
                                                           .ThenInclude(xx => xx.ProductSizes)
                                                      .Include(x => x.Diamond)
                                                      .Where(x => x.CreatedBy == _currentUserName)
                                                      .ToListAsync();
            return cart.Adapt<List<CartDTO>>();
        }
    }
}
