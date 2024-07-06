using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels.Categories;

public class UpdateCategoryDTO
{
    public string? Name { get; set; }
    public bool? IsDeleted { get; set; }
    public int GroupId { get; set; }
}