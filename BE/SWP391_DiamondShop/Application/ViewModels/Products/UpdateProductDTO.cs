using Application.ViewModels.ProductParts;
using Application.ViewModels.ProductSizes;

namespace Application.ViewModels.Products;

public class UpdateProductDTO
{
    public string Name { get; set; }
    public bool Gender { get; set; }
    public int Quantity { get; set; }
    public int CategoryId { get; set; }
    public int WarrantyDocumentsId { get; set; }
    //public ICollection<Image> Images { get; set; }
    public ICollection<UpdateProductPartDTO> UpdateProductPartDtos { get; set; } = new List<UpdateProductPartDTO>();
    public ICollection<UpdateProductSizeDTO> UpdateProductSizeDtos { get; set; } = new List<UpdateProductSizeDTO>();
}