using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels;

public class AddCategoryDTO
{
    [Required]
    public string Name { get; set; }
}