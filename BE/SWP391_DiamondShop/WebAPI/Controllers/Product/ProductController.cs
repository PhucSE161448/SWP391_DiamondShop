using Application.Commons;
using Application.Interfaces.Products;
using Application.ViewModels.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Product
{
    public class ProductController : BaseController
    {
        private readonly IProductService service;
        public ProductController(IProductService _service)
        {
            service = _service;
        }
        [HttpGet]
        public async Task<IActionResult> GetPagedProducts([FromQuery] QueryProductDTO queryProductDTO)
        {
            return Ok(await service.GetPagedProducts(queryProductDTO));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductDetailById(int id)
        {
            var response = await service.GetProductDetailById(id);
           return Ok(response);
           
        }
    }
}
