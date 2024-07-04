using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Exceptions;
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
        private readonly string? _currentUserName;
        public CartRepository(
            SWP391_DiamondShopContext context,
            IClaimsService claimsService
        )
        {
            _dbContext = context;
            _currentUserName = claimsService.GetCurrentUserName;
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
        
        public async Task<Cart> CreateCart(bool check, CreateCartDTO dto)
        {
            var exist = await _dbContext.Carts.AsNoTracking().FirstOrDefaultAsync(x =>
         ((x.ProductId == dto.Id && check) || (x.DiamondId == dto.Id && !check))
         && x.IsDeleted == false && x.CreatedBy == _currentUserName);

            if (exist != null)
            {
                exist.Quantity++;
                exist.TotalPrice += dto.TotalPrice;
                _dbContext.Carts.Update(exist);
                return exist;
            }

            var cart = new Cart
            {
                Size = dto.Size,
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

        public async Task<CartDTO> UpdateQuantity(bool check, int cartId)
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
                .FirstOrDefaultAsync(x =>
                x.CartId == cartId && x.IsDeleted == false && x.CreatedBy == _currentUserName);
            if (cart != null)
            {
                cart.Quantity += check ? 1 : -1;
                cart.TotalPrice = cart.DiamondId != null
                    ? TotalPrice(cart.Quantity, false,cart.DiamondId)
                    : TotalPrice(cart.Quantity, true, cart.ProductId);
                _dbContext.Carts.Update(cart);
                await _dbContext.SaveChangesAsync();
            }
            return cart.Adapt<CartDTO>();
        }

        public async Task Delete(int cartId)
        {
            var cart = await _dbContext.Carts.FirstOrDefaultAsync(x => x.CartId == cartId);
            if (cart == null)
            { 
                throw new NotFoundException("Cart is not existed");
            }
            _dbContext.Carts.Remove(cart);
        }

        public decimal TotalPrice(int? quantity, bool check, int? id)
        {
            decimal total = 0;
            if (!check)
            {
                var diamond = _dbContext.Diamonds.FirstOrDefault(x => x.Id == id);
                if (diamond != null)
                {
                    total += (decimal)(diamond.Price * quantity);
                }
            }
            else
            {
                var productSize = _dbContext.ProductSizes.FirstOrDefault(x => x.ProductId == id);
                if (productSize != null)
                {
                    total += (decimal)(productSize.Price * quantity);
                }
            }
            return total;
        }
    }
}
