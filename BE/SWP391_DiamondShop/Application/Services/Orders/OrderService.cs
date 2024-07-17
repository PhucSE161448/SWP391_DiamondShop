using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Commons;
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
        public async Task<Order> CreateOrderAsync(OrderCreateDTO orderCreateDto)
        {
            var order = await _unitOfWork.OrderRepo.CreateOrderAsync(orderCreateDto);
            var promotionList = await _unitOfWork.PromotionRepository.GetAllPromotionAsync();
            var getAccountPoint = await _unitOfWork.AccountRepo.GetByIdAsync(order.AccountId);

            //create new promotion list
            List<Promotion> listToSort = new List<Promotion>();
            listToSort = promotionList.OrderBy(c => c.Point).ToList();
            decimal discount = 0;
            foreach (var promotion in listToSort)
            {
                if (getAccountPoint.Point >= promotion.Point)
                {
                    discount = promotion.DiscountPercentage;
                }
            }
            order.TotalPrice = order.TotalPrice - (order.TotalPrice * discount/100);
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

        public async Task<OrderDTO> GetOrderById(int orderId) => await _unitOfWork.OrderRepo.GetOrderById(orderId);

        public async Task<Pagination<OrderDTO>> GetOrderAsync(int pageIndex = 1, int pageSize = 10, string? status = null) => await _unitOfWork.OrderRepo.GetOrderAsync(pageIndex , pageSize, status);
        public async Task<List<OrderDetailDTO>> GetOrderDetailAsync(int orderId) => await _unitOfWork.OrderRepo.GetOrderDetailAsync(orderId);

        public async Task<bool> CreateOrderStatusAsync(int orderId, string status, int accountId = 0, int paymentId = 0)
        {
            var result = await _unitOfWork.OrderRepo.CreateOrderStatusAsync(orderId, status, accountId, paymentId);
            if (result)
            {
                await _unitOfWork.SaveChangeAsync();
            }
            return result;
        }
        public async Task<decimal> GetRevenuer()
        {
            decimal result = 0;
            var getListOrder = await _unitOfWork.OrderRepo.GetOrderAsync();
            foreach(var order in getListOrder.Items)
            {
                if(order.Status == "Finished")
                {
                    result = order.TotalPrice + result;
                }
            }
            return result;
        }
    }
}
