﻿using Application.Commons;
using Application.ViewModels.Orders;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Orders
{
    public interface IOrderService
    {
        Task<OrderDTO> GetOrderById(int orderId);
        Task<Pagination<OrderDTO>> GetOrderAsync(int pageIndex = 1, int pageSize = 10, string? status = null);
        Task<List<OrderDetailDTO>> GetOrderDetailAsync(int orderId);
        Task<Order> CreateOrderAsync(OrderCreateDTO orderCreateDto);
        Task<bool> CreateOrderCartAsync(List<int> cartId, int orderId);
        Task<bool> CreateOrderStatusAsync(int orderId, string status, int accountId = 0, int paymentId = 0);

    }
}
