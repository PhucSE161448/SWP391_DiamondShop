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

        [HttpGet("")]
        public async Task<IActionResult> Get([FromQuery]int pageIndex = 1, int pageSize = 10, string? status = null)
        {
            return Ok(await _orderService.GetOrderAsync(pageIndex, pageSize,status));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductDetailById(int id)
        {
            var response = await _orderService.GetOrderDetailAsync(id);
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> CreateStatus(int orderId, string status)
        {
            return Created(nameof(CreateStatus), await _orderService.CreateOrderStatusAsync(orderId, status));
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDTO createCartDto)
        {
            var order = await _orderService.CreateOrderAsync(createCartDto);
            if (order != null)
            {
                var result = await _orderService.CreateOrderCartAsync(createCartDto.CartId, order.Id);
            }
            return Created(nameof(CreateOrder), order);
        }
        
    }
}
