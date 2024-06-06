using Application.ViewModels;
using Application.ViewModels.Categories;
using Domain.Model;

namespace Application.Interfaces.Categories;

public interface ICategoryService
{
    Task<CategoryDTO> AddCategory(AddCategoryDTO addCategoryDto);
    Task<CategoryDTO?> GetCategoryById(int id);
    Task<CategoryDTO> UpdateCategory(int id, UpdateCategoryDTO updateCategoryDto);
    Task DeleteCategory(int id);
    Task<List<CategoryDTO>> GetAllCategory();
}