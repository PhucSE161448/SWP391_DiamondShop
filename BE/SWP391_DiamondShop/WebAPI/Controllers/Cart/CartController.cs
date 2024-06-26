using Application.Interfaces.Carts;
using Application.ViewModels.Carts;
using Application.ViewModels.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Cart
{
    public class CartController : BaseController
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCartDTO createCartDTO, bool check)
        {
            return Created(nameof(Create), await _cartService.CreateCart(check,createCartDTO));
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = _cartService.GetCartWithUserName();
            return Ok(response);
        }
    }
}
