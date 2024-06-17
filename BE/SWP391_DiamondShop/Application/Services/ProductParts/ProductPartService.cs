using Application.Interfaces;
using Application.Interfaces.ProductParts;
using Application.ViewModels.ProductParts;
using Domain.Model;
using Mapster;

namespace Application.Services.ProductParts;

public class ProductPartService : IProductPartService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductPartService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }


    public async Task DeleteProductPart(IEnumerable<ProductPart> productParts)
    {
        await _unitOfWork.ProductPartRepo.DeleteRangeAsync(productParts);
        await _unitOfWork.SaveChangeAsync();
    }

    public async Task CreateProductPart(int productId, List<CreateProductPartDTO> createProductPartDtos)
    {
        var productPart = createProductPartDtos.Select(p =>
        {
            var productPart = p.Adapt<ProductPart>();
            productPart.ProductId = productId;
            return productPart;
        }).ToList();
        await _unitOfWork.ProductPartRepo.AddRangeAsync(productPart);
        await _unitOfWork.SaveChangeAsync();
    }
}