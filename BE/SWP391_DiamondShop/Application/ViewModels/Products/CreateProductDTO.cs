using System.ComponentModel.DataAnnotations;
using Application.ViewModels.ProductParts;
using Application.ViewModels.ProductSizes;

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
    public int WarrantyDocumentsId { get; set; }
    //public ICollection<Image> Images { get; set; }
    public ICollection<CreateProductPartDTO> CreateProductPartDtos { get; set; } = new List<CreateProductPartDTO>();
    public ICollection<CreateProductSizeDTO> CreateProductSizeDtos { get; set; } = new List<CreateProductSizeDTO>();
}