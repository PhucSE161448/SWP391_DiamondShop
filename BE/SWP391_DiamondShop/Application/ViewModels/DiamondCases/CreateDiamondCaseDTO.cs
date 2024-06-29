using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels.DiamondCases;

public class CreateDiamondCaseDTO
{
    [Required]
    public string? Material { get; set; } 
    [Required]
    public string? Color { get; set; }
    [Required]
    public string? Name { get; set; } 
    [Required]
    public decimal Price { get; set; }
}