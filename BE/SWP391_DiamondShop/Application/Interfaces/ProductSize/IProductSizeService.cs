using Application.ViewModels.ProductSizes;

namespace Application.Interfaces.ProductSize;

public interface IProductSizeService
{
    Task UpdateOrCreateProductSizes(int productId, ICollection<UpdateProductSizeDTO> updateProductSizeDtos);
}