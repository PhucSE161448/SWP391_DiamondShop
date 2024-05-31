using Application.Commons;
using Application.Interfaces.Origin;
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
        public async Task<ActionResult<Pagination<GetProductPaginationDTO>>> GetPagedProducts([FromQuery] QueryProductDTO queryProductDTO)
        {
            return Ok(await service.GetPagedProducts(queryProductDTO));
        }
    }
}
