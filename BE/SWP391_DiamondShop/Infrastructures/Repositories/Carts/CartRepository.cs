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
            var cart = new Cart
            {
                Quantity = dto.Quantity,
                TotalPrice = dto.TotalPrice,
                CreatedDate = DateTime.Now,
                CreatedBy = _currentUserName

            };
            if (check)
            {
                cart.ProductId = dto.Id;
            }
            else
            {
                cart.DiamondId = dto.Id;
            }
            await _dbContext.Carts.AddAsync(cart);
            return cart;
        }

        public async Task<List<CartDTO>> GetCartWithUserId()
        {
            var cart = await _dbContext.Carts.Include(x => x.Product)
                .Include(x => x.Diamond).Where(x => x.CreatedBy == _currentUserName).ToListAsync();
            return cart.Adapt<List<CartDTO>>();
        }
    }
}
