using Application.Interfaces.Orders;
using Application.ViewModels.Orders;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Order
{
    public class OrderController : BaseController
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OrderCreateDTO createCartDto)
        {
            var order = await _orderService.CreateOrderAsync(createCartDto.TotalPrice);
            var result = await _orderService.CreateOrderCartAsync(createCartDto.CartId, order.Id);
            return Created(nameof(Create), result);
        }
    }
}
