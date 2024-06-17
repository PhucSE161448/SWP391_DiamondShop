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
        
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] CreateProductDTO createProductDto)
        {
            return Created(nameof(CreateProduct), await service.CreateProduct(createProductDto));
        }
        
        [HttpPost("{productId}")]
        public async Task<IActionResult> CreateProductProperties(int productId, [FromBody] CreateProductPropertiesDTO createProductPropertiesDto)
        {
            return Created(nameof(CreateProductProperties), await service.CreateProductProperties(productId, createProductPropertiesDto));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] UpdateProductDTO updateProductDto)
        {
            await service.UpdateProduct(id, updateProductDto);
            return NoContent();
        }
        [HttpPut("{productId}/{isDeleted}")]
        public async Task<IActionResult> DeleteOrEnable(int productId, int isDeleted)
        {
            await service.DeleteOrEnable(productId, isDeleted > 0);
            return NoContent();
        }
        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateProductProperties(int productId, [FromBody] CreateProductPropertiesDTO createProductPropertiesDto)
        {
            await service.UpdateProductProperties(productId, createProductPropertiesDto);
            return NoContent();
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
