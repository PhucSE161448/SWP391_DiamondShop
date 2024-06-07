﻿using Application.Commons;
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
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDTO createProductDto)
        {
            return Created(nameof(CreateProduct), await service.CreateProduct(createProductDto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductDTO updateProductDto)
        {
            await service.UpdateProduct(id, updateProductDto);
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
