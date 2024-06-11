

using Application.ViewModels.ProductParts;
using Domain.Model;

namespace Application.Interfaces.ProductParts;

public interface IProductPartService
{
    Task DeleteProductPart(IEnumerable<ProductPart> productParts);
    Task UpdateOrCreateProductPart(int productId, ICollection<UpdateProductPartDTO> updateProductPartDtos);
}