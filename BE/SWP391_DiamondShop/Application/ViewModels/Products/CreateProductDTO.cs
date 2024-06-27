using System.ComponentModel.DataAnnotations;
using Application.ViewModels.ProductParts;
using Application.ViewModels.ProductSizes;
using Microsoft.AspNetCore.Http;

namespace Application.ViewModels.Products;

public class CreateProductDTO
{
    [MaxLength(255)]
    [Required]
    public string Name { get; set; }
    [Required]
    public bool Gender { get; set; }
    [Required]
    public int Quantity { get; set; }
    [Required]
    public int CategoryId { get; set; }
    [Required]
    public int DiamondCaseId { get; set; }
    public decimal Wage { get; set; }
    [Required]
    public List<IFormFile> ProductImages { get; set; } = new List<IFormFile>();
}