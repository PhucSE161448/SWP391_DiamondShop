﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Orders;
using Domain.Model;

namespace Application.IRepositories.Orders
{
    public interface IOrderRepo 
    {
        Task<Order> CreateOrderAsync(decimal totalPrice);
        Task<bool> CreateOrderCartAsync(List<int> cartId, int orderId);
    }
}
