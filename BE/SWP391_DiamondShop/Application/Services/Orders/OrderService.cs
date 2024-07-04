using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Interfaces.Orders;
using Domain.Model;

namespace Application.Services.Orders
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Order> CreateOrderAsync(decimal totalPrice)
        {
            var order = await _unitOfWork.OrderRepo.CreateOrderAsync(totalPrice);
            await _unitOfWork.SaveChangeAsync();
            return order;
        }

        public async Task<bool> CreateOrderCartAsync(List<int> cartId, int orderId)
        {
            var result = await _unitOfWork.OrderRepo.CreateOrderCartAsync(cartId, orderId);
            await _unitOfWork.SaveChangeAsync();
            return result;
        }
    }
}
