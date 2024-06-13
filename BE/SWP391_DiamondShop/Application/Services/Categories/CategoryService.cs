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
        var category = await _unitOfWork.CategoryRepo.GetAsync(x => x.Id == id);
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

    public async Task DeleteCategory(int id)
    {
        var category = await _unitOfWork.CategoryRepo.GetByIdAsync(id);
        if (category is null)
        {
            throw new NotFoundException("Category is not existed");
        }

        if (category.IsDeleted)
        {
            throw new BadRequestException("Category is already deleted");
        }
        _unitOfWork.CategoryRepo.SoftRemove(category);
        await _unitOfWork.SaveChangeAsync();
        
    }

    public async Task<List<CategoryDTO>> GetAllCategory()
    {
        var categories = await _unitOfWork.CategoryRepo.GetAllAsync(x => !x.IsDeleted);
        return categories.Adapt<List<CategoryDTO>>();
    }
}