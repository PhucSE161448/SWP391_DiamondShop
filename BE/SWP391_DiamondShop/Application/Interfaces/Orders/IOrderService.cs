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
        Task<Order> CreateOrderAsync(decimal totalPrice);
        Task<bool> CreateOrderCartAsync(List<int> cartId, int orderId);
    }
}
