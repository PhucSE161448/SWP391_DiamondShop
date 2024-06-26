using Application.Interfaces.DiamondCases;
using Application.IRepositories.DiamondCases;
using Application.ViewModels.DiamondCases;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.DiamondCase;

public class DiamondCaseController : BaseController
{
    private readonly IDiamondCaseService service;
    public DiamondCaseController(IDiamondCaseService _service)
    {
        service = _service;
    }
    [HttpPost]
    public async Task<IActionResult> CreateDiamondCase([FromBody] CreateDiamondCaseDTO createDiamondCaseDto)
    {
        var result = await service.AddDiamondCase(createDiamondCaseDto);
        return Created(nameof(CreateDiamondCase), result);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDiamondCase(int id, [FromBody] UpdateDiamondCaseDTO updateDiamondCaseDto)
    {
        await service.UpdateDiamondCase(id, updateDiamondCaseDto);
        return NoContent();
    }
    [HttpPut("{diamondCaseId}/{isDeleted}")]
    public async Task<IActionResult> DeleteOrEnable(int diamondCaseId, int isDeleted)
    {
        await service.DeleteOrEnable(diamondCaseId, isDeleted > 0);
        return NoContent();
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDiamondCase(int id)
    {
        var result = await service.GetDiamondCaseById(id);
        return Ok(result);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllDiamondCases()
    {
        var result = await service.GetAllDiamondCases();
        return Ok(result);
    }
}