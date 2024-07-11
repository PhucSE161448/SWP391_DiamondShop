using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Interfaces.Orders;
using Application.ViewModels.Orders;
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
        public async Task<Order> CreateOrderAsync(string address, decimal totalPrice)
        {
            var order = await _unitOfWork.OrderRepo.CreateOrderAsync(address,totalPrice);
            await _unitOfWork.SaveChangeAsync();
            return order;
        }

        public async Task<bool> CreateOrderCartAsync(List<int> cartId, int orderId)
        {
            var result = await _unitOfWork.OrderRepo.CreateOrderCartAsync(cartId, orderId);
            if (result)
            {
                await _unitOfWork.SaveChangeAsync();
            }
            return result;
        }

        public async Task<List<OrderDTO>> GetOrderAsync() => await _unitOfWork.OrderRepo.GetOrderAsync();
        public async Task<List<OrderDetailDTO>> GetOrderDetailAsync(int orderId) => await _unitOfWork.OrderRepo.GetOrderDetailAsync(orderId);

        public async Task<bool> CreateOrderStatusAsync(int orderId, string status)
        {
            var result = await _unitOfWork.OrderRepo.CreateOrderStatusAsync(orderId, status);
            if (result)
            {
                await _unitOfWork.SaveChangeAsync();
            }
            return result;
        }
    }
}
