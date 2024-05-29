﻿using Application.Interfaces.WarrantyDocument;
using Application.ViewModels.CaratWeights;
using Application.ViewModels.WarrantyDocuments;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.WarrantyDocument
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarrantyDocumentController : ControllerBase
    {
        private readonly IWarrantyDocumentService _warrantyDocumentService;

        public WarrantyDocumentController(IWarrantyDocumentService warrantyDocumentService)
        {
            this._warrantyDocumentService = warrantyDocumentService;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertWarrantyDocumentDTO createdDTO)
        {
            var result = await _warrantyDocumentService.CreateWarrantyDocumentAsync(createdDTO);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            else
            {
                return Ok(result);
            }
        
                }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpsertWarrantyDocumentDTO updatedDTO)
        {
            var result = await _warrantyDocumentService.UpdateWarrantyDocumentAsync(id, updatedDTO);
            if (!result.Success)
            {
                return NotFound(result);
            }
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var result = await _warrantyDocumentService.GetAllWarrantyDocumenttAsync();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _warrantyDocumentService.GetWarrantyDocumentAsync(id);
            return Ok(result);
        }
    }
}
