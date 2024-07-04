using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.IRepositories.Orders;
using Application.ViewModels.Orders;
using Domain.Model;
using Google.Apis.Storage.v1.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructures.Repositories.Orders
{
    public class OrderRepo : IOrderRepo
    {
        private readonly SWP391_DiamondShopContext _dbContext;
        private readonly int _currentUserId;
        public OrderRepo(
            SWP391_DiamondShopContext context,
            IClaimsService claimsService
        )
        {
            _dbContext = context;
            _currentUserId = claimsService.GetCurrentUserId;
        }

        public async Task<Order> CreateOrderAsync(decimal totalPrice)
        {
            try
            {
                var order = new Order
                {
                    CreatedDate = DateTime.Now,
                    TotalPrice = totalPrice,
                    AccountId = _currentUserId,
                };
                await _dbContext.Orders.AddAsync(order);
                return order;
            }
            catch (Exception ex)
            {
                return null!;
            }
        }

        public async Task<bool> CreateOrderCartAsync(List<int> cartId, int orderId)
        {
            try
            {
                foreach (int id in cartId)
                {
                    var cart = await _dbContext.Carts.FirstOrDefaultAsync(x => x.CartId == id);
                    if (cart != null)
                    {
                        await _dbContext.OrderCarts.AddAsync(new OrderCart
                        {
                            CartId = id,
                            OrderId = orderId,
                            Quantity = cart?.Quantity,
                            Price = cart?.TotalPrice
                        });

                        if (cart.DiamondId != null)
                        {
                            var diamond = await _dbContext.Diamonds.FirstOrDefaultAsync(x => x.Id == cart.DiamondId);
                            diamond.Quantity -= (int)cart.Quantity;
                        }
                        else
                        {
                            var product = await _dbContext.ProductSizes.FirstOrDefaultAsync(x =>
                                x.ProductId == cart.ProductId && x.Size == cart.Size);
                            product.Quantity -= (int)cart.Quantity;
                        }
                        cart.IsDeleted = true;
                    }
                }
                await _dbContext.AddAsync(new OrderStatus
                {
                    AccountId = _currentUserId,
                    OrderId = orderId,
                    CreatedDate = DateTime.Now,
                    Status = "Wait To Approve"
                });
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
