using Application.Interfaces.WarrantyDocument;
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
            _warrantyDocumentService = warrantyDocumentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetList(int orderId)
        {
            var result = await _warrantyDocumentService.GetExportWarrantyDocumentsAsync(orderId);
            return Ok(result);
        }
       
    }
}
