using Application.Interfaces.Certificates;
using Application.ViewModels.Certificates;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Certificate;

public class CertificateController : BaseController
{
    private readonly ICertificateService service;
    public CertificateController(ICertificateService _service)
    {
        service = _service;
    }
    [HttpPost]
    public async Task<IActionResult> CreateCertificate([FromBody] CreateCertificateDTO createCertificateDto)
    {
        var result = await service.CreateCertificate(createCertificateDto);
        return Created(nameof(CreateCertificate), result);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCertificate(int id, [FromBody] UpdateCertificateDTO updateCertificateDto)
    {
        await service.UpdateCertificate(id, updateCertificateDto);
        return NoContent();
    }
    [HttpGet("{origin}/{reportNumber}")]
    public async Task<IActionResult> GetCertificateByOriginAndReportNumberForCreateDiamond(string origin, string reportNumber)
    {
        return Ok(await service.GetCertificateByOriginAndReportNumberForCreateDiamond(origin, reportNumber));
    }
    [HttpGet]
    public async Task<IActionResult> GetAllCertificates()
    {
        var result = await service.GetAllCertificates();
        return Ok(result);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCertificate(int id)
    {
        var result = await service.GetCertificateById(id);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetExportCertificate(int orderId)
    {
        var result = await service.GetCertificatesByOrderIdAsync(orderId);
        return Ok(result);
    }
}