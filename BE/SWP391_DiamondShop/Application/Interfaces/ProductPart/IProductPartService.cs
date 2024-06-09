using Application.ViewModels.ProductParts;

namespace Application.Interfaces.ProductPart;

public interface IProductPartService
{
    Task UpdateOrCreateProductPart(int productId, ICollection<UpdateProductPartDTO> updateProductPartDtos);
}