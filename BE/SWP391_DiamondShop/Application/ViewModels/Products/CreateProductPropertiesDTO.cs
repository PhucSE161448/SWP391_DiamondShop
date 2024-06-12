using Application.ViewModels.ProductParts;
using Application.ViewModels.ProductSizes;

namespace Application.ViewModels.Products;

public class CreateProductPropertiesDTO
{
    public List<CreateProductPartDTO> CreateProductPartDtos { get; set; } = new List<CreateProductPartDTO>();
    public List<CreateProductSizeDTO> CreateProductSizeDtos { get; set; } = new List<CreateProductSizeDTO>();
}