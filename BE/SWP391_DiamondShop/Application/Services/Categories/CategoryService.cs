using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Categories;
using Application.ViewModels;
using Application.ViewModels.Categories;
using Domain.Model;
using Mapster;

namespace Application.Services.Categories;

public class CategoryService : ICategoryService
{
    private readonly IUnitOfWork _unitOfWork;

    public CategoryService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<CategoryDTO> AddCategory(AddCategoryDTO addCategoryDto)
    {
        var category = addCategoryDto.Adapt<Category>();
        await _unitOfWork.CategoryRepo.AddAsync(category);
        await _unitOfWork.SaveChangeAsync();
        return category.Adapt<CategoryDTO>();
    }

    public async Task<CategoryDTO?> GetCategoryById(int id)
    {
        var category = await _unitOfWork.CategoryRepo.GetAsync(x => x.Id == id, includeProperties: "Group");
        if (category is null)
        {
            throw new NotFoundException("Category is not existed");
        }

        return category.Adapt<CategoryDTO>();
    }

    public async Task<CategoryDTO> UpdateCategory(int id, UpdateCategoryDTO updateCategoryDto)
    {
        var category = await _unitOfWork.CategoryRepo.GetByIdAsync(id);
        if (category is null)
        {
            throw new NotFoundException("Category is not existed");
        }
        _unitOfWork.CategoryRepo.Update(updateCategoryDto.Adapt(category));
        await _unitOfWork.SaveChangeAsync();
        return category.Adapt<CategoryDTO>();
    }
    

    public async Task<List<CategoryDTO>> GetAllCategory()
    {
        var categories = await _unitOfWork.CategoryRepo.GetAllAsync(includeProperties: "Group");
        return categories.Adapt<List<CategoryDTO>>();
    }

    public async Task DeleteOrEnable(int categoryId, bool isDeleted)
    {
        var category = await _unitOfWork.CategoryRepo.GetAsync(d => d.Id == categoryId);
        if (category is null)
        {
            throw new NotFoundException("Category is not existed");
        }
        category.IsDeleted = isDeleted;
        await _unitOfWork.SaveChangeAsync();
    }
}