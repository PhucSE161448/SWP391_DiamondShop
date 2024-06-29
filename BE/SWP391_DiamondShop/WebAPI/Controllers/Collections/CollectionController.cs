using Application.Interfaces.Collections;
using Application.ViewModels.Collections;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Collections;

public class CollectionController : BaseController
{
    private readonly ICollectionService service;
    public CollectionController(ICollectionService _service)
    {
        service = _service;
    }
    [HttpPost]
    public async Task<IActionResult> CreateCollection([FromBody] CreateAndUpdateCollectionDTO createCollectionDto)
    {
        var result = await service.AddCollection(createCollectionDto);
        return Created(nameof(CreateCollection), result);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCollection(int id, [FromBody] CreateAndUpdateCollectionDTO updateCollectionDto)
    {
        await service.UpdateCollection(id, updateCollectionDto);
        return NoContent();
    }
    [HttpPut("{collectionId}/{isDeleted}")]
    public async Task<IActionResult> DeleteOrEnable(int collectionId, int isDeleted)
    {
        await service.DeleteOrEnable(collectionId, isDeleted > 0);
        return NoContent();
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCollection(int id)
    {
        var result = await service.GetCollectionById(id);
        return Ok(result);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllCollections()
    {
        var result = await service.GetAllCollection();
        return Ok(result);
    }
}