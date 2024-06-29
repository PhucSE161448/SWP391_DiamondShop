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
            var response = await _cartService.GetCartWithUserName();
            return Ok(response);
        }

        [HttpPut("{cartId}")]
        public async Task<IActionResult> Update(bool check, int cartId)
        {
            var response = await _cartService.UpdateQuantity(check, cartId);
            return Ok(response);
        }

        [HttpDelete("{cartId}")]
        public async Task<IActionResult> Delete(int cartId)
        {
            await _cartService.Delete(cartId);
            return Ok();
        }
    }
}
