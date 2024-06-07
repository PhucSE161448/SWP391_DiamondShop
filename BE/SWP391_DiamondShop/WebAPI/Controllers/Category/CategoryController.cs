using Application.Interfaces.Categories;
using Application.ViewModels;
using Application.ViewModels.Categories;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Category;

public class CategoryController : BaseController
{
    private readonly ICategoryService service;
    public CategoryController(ICategoryService _service)
    {
        service = _service;
    }
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] AddCategoryDTO addCategoryDto)
    {
        var result = await service.AddCategory(addCategoryDto);
        return Created(nameof(CreateCategory), result);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDTO updateCategoryDto)
    {
        var result = await service.UpdateCategory(id, updateCategoryDto);
        return Ok(result);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(int id)
    {
        var result = await service.GetCategoryById(id);
        return Ok(result);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var result = await service.GetAllCategory();
        return Ok(result);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteCategory(id);
        return NoContent();
    }
}