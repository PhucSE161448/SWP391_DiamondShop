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
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace Infrastructures.Repositories.Orders
{
    public class OrderRepo : IOrderRepo
    {
        private readonly SWP391_DiamondShopContext _dbContext;
        private readonly int _currentUserId;
        private readonly string? _currentRole;
        private const decimal Percentage = 0.01m;
        public OrderRepo(
            SWP391_DiamondShopContext context,
            IClaimsService claimsService
        )
        {
            _dbContext = context;
            _currentUserId = claimsService.GetCurrentUserId;
            _currentRole = claimsService.GetCurrentUserRole;
        }

        public async Task<List<OrderDTO>> GetOrderAsync()
        {
            IQueryable<Order> query;

            if (_currentRole == "1" || _currentRole == "3" || _currentRole == "4")
            {
                query = _dbContext.Orders;
            }
            else
            {
                query = _dbContext.Orders.Where(x => x.AccountId == _currentUserId);
            }

            var orders = await query
                .Include(op => op.OrderStatuses)
                .Include(x => x.Account)
                .Include(x => x.Payment)
                .ToListAsync();

            var orderDTOs = orders.Select(order => new OrderDTO
            {
                Id = order.Id,
                AccountName = order.Account.Name,
                CreatedDate = order.CreatedDate,
                TotalPrice = order.TotalPrice,
                PaymentName = order.PaymentId != null ? order.Payment.Name : null,
                Status = order.OrderStatuses.Select(o => o.Status).LastOrDefault()
            }).ToList();

            return orderDTOs;
        }

        public async Task<List<OrderDetailDTO>> GetOrderDetailAsync(int orderId)
        {
            var orderCarts = await _dbContext.OrderCarts
                .Where(x => x.OrderId == orderId)
                .Include(x => x.Cart)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Images)
                .Include(x => x.Cart)
                .ThenInclude(x => x.Diamond)
                .ToListAsync();
            return orderCarts.Adapt<List<OrderDetailDTO>>();
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

        public async Task<bool> CreateOrderStatusAsync(int orderId, string status)
        {
            var orders = await _dbContext.Orders
                .Include(o => o.OrderCarts)
                .ThenInclude(x => x.Cart)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (orders == null)
            {
                return false;
            }

            await _dbContext.OrderStatuses.AddAsync(new OrderStatus
            {
                CreatedDate = DateTime.Now,
                Status = status,
                AccountId = _currentUserId,
                OrderId = orderId,
            });
            if (status.Equals("Paid"))
            {
                foreach (var orderCart in orders.OrderCarts)
                {
                    var warrantyDocument = new WarrantyDocument
                    {
                        Period = DateTime.UtcNow.AddYears(1),
                        TermsAndConditions = "Standard Warranty Terms",
                        CreatedDate = DateTime.Now,
                    };
                    await _dbContext.WarrantyDocuments.AddAsync(warrantyDocument);
                    orderCart.WarrantyDocument = warrantyDocument;
                }
            }
            if (status.Equals("Finished"))
            {
                var user = await _dbContext.Accounts.FindAsync(orders.AccountId);
                user.Point += (orders.TotalPrice * Percentage);
            }
            return true;
        }
    }
}
