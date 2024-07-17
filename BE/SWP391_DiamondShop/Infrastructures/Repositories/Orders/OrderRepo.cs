using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Commons;
using Application.Interfaces;
using Application.IRepositories.Orders;
using Application.ViewModels.Orders;
using Domain.Enums;
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
        private readonly int? _currentRole;
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

        public async Task<Pagination<OrderDTO>> GetOrderAsync(int pageIndex = 1, int pageSize = 10, string? status = null)
        {
            IQueryable<Order> query = _dbContext.Orders;

            if (_currentRole == (int)Domain.Enums.Roles.SalesStaff)
            {
                query = query.Where(x => x.OrderStatuses.OrderByDescending(s => s.CreatedDate)
                                              .Select(s => s.Status).FirstOrDefault() == StatusOrder.WaitToApprove ||
                                          x.OrderStatuses.OrderByDescending(s => s.CreatedDate)
                                              .Select(s => s.Status).FirstOrDefault() == StatusOrder.Approved);
            }
            else if (_currentRole == (int)Domain.Enums.Roles.DeliveryStaff)
            {
                query = query.Where(x => x.OrderStatuses.OrderByDescending(s => s.CreatedDate)
                                              .Select(s => s.Status).FirstOrDefault() == StatusOrder.Paid ||
                                         x.OrderStatuses.OrderByDescending(s => s.CreatedDate)
                                             .Select(s => s.Status).FirstOrDefault() == StatusOrder.InTransit ||
                                          x.OrderStatuses.OrderByDescending(s => s.CreatedDate)
                                              .Select(s => s.Status).FirstOrDefault() == StatusOrder.Finished);
            }
            else if (_currentRole != (int)Domain.Enums.Roles.Admin)
            {
                query = query.Where(x => x.AccountId == _currentUserId);
            }
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(x => x.OrderStatuses.OrderByDescending(s => s.CreatedDate)
                    .Select(s => s.Status).FirstOrDefault() == status);
            }
            int totalItemsCount = await query.CountAsync();

            var orders = await query
                .Include(op => op.OrderStatuses)
                .Include(x => x.Account)
                .Include(x => x.Payment)
                .OrderBy(o => o.Id) 
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var orderDTOs = orders.Select(order => new OrderDTO
            {
                Id = order.Id,
                AccountName = order.Account.Name,
                CreatedDate = order.CreatedDate,
                TotalPrice = order.TotalPrice,
                PaymentName = order.PaymentId != null ? order.Payment.Name : null,
                Address = order.Address,
                Phone = order.Phone,
                Status = order.OrderStatuses.Select(o => o.Status).LastOrDefault()
            }).OrderByDescending(x => x.CreatedDate).ToList();

            var pagination = new Pagination<OrderDTO>
            {
                TotalItemsCount = totalItemsCount,
                PageSize = pageSize,
                PageIndex = pageIndex,
                Items = orderDTOs
            };

            return pagination;
        }



        public async Task<OrderDTO> GetOrderById(int orderId)
        {
            var order = await _dbContext.Orders
                .Include(op => op.OrderStatuses)
                .Include(x => x.Account)
                .Include(x => x.Payment)
                .FirstOrDefaultAsync(x => x.Id == orderId);

            var orderDTOs =  new OrderDTO
            {
                Id = order.Id,
                AccountName = order.Account.Name,
                CreatedDate = order.CreatedDate,
                TotalPrice = order.TotalPrice,
                PaymentName = order.PaymentId != null ? order.Payment.Name : null,
                Address = order.Address,
                Phone = order.Phone,
                Status = order.OrderStatuses.Select(o => o.Status).LastOrDefault()
            };
            return orderDTOs;
        }
        public async Task<List<OrderDetailDTO>> GetOrderDetailAsync(int orderId)
        {
            var orderCarts = await _dbContext.OrderCarts
                .Where(x => x.OrderId == orderId)
                .Include(x => x.Cart)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.ProductSizes)
                .Include(x => x.Cart)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Images)
                .Include(x => x.Cart)
                .ThenInclude(x => x.Diamond)
                .ThenInclude(x => x.Images)
                .ToListAsync();
            return orderCarts.Adapt<List<OrderDetailDTO>>();
        }
        public async Task<Order> CreateOrderAsync(OrderCreateDTO createCartDto)
        {
            try
            {
                var order = new Order
                {
                    CreatedDate = DateTime.Now,
                    TotalPrice = createCartDto.TotalPrice,
                    AccountId = _currentUserId,
                    Address = createCartDto.Address,
                    Phone = createCartDto.Phone
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
                    var cart = await _dbContext.Carts.Include(x => x.Product).ThenInclude(x => x.ProductSizes)
                        .Include(x => x.Diamond)
                        .FirstOrDefaultAsync(x => x.CartId == id);
                    decimal? price = cart.ProductId.HasValue
                        ? cart.Product?.ProductSizes.FirstOrDefault(ps => ps.Size == cart.Size)?.Price
                        : cart.Diamond?.Price;
                    if (cart != null)
                    {
                        await _dbContext.OrderCarts.AddAsync(new OrderCart
                        {
                            CartId = id,
                            OrderId = orderId,
                            Quantity = cart?.Quantity,
                            Price = price 
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
                    Status = StatusOrder.WaitToApprove
                });
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> CreateOrderStatusAsync(int orderId, string status, int accountId = 0,int paymentId = 0)
        {
            var orders = await _dbContext.Orders
                .Include(o => o.OrderCarts)
                .ThenInclude(x => x.Cart)
                .ThenInclude(x => x.Product).ThenInclude(x => x.ProductSizes)
                .Include(x => x.OrderCarts)
                .ThenInclude(x => x.Cart)
                .ThenInclude(x => x.Diamond)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (orders == null)
            {
                return false;
            }
            var orderStatus = await _dbContext.OrderStatuses.FirstOrDefaultAsync(x => x.OrderId == orderId && x.Status == status);
            if (orderStatus == null)
            {
                await _dbContext.OrderStatuses.AddAsync(new OrderStatus
                {
                    CreatedDate = DateTime.Now,
                    Status = status,
                    AccountId = accountId == 0 ? _currentUserId : accountId,
                    OrderId = orderId,
                });

            }
            if (status.Equals(StatusOrder.Paid) && orderStatus == null)
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
                orders.PaymentId = paymentId;
            }
            if (status.Equals(StatusOrder.Finished))
            {
                var user = await _dbContext.Accounts.FindAsync(orders.AccountId);
                user.Point += (orders.TotalPrice * Percentage);
            }
            return true;
        }
    }
}
