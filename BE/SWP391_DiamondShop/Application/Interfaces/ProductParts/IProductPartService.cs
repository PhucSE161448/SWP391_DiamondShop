

using Application.ViewModels.ProductParts;
using Domain.Model;

namespace Application.Interfaces.ProductParts;

public interface IProductPartService
{
    Task DeleteProductPart(IEnumerable<ProductPart> productParts);
    Task CreateProductPart(int productId, List<CreateProductPartDTO> createProductPartDtos);
}