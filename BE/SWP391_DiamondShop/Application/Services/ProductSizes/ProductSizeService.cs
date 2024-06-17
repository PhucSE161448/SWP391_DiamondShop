using Application.Interfaces;
using Application.Interfaces.ProductSizes;
using Application.ViewModels.ProductSizes;
using Domain.Model;
using Mapster;

namespace Application.Services.ProductSizes;

public class ProductSizeService : IProductSizeService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductSizeService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task DeleteProductSize(IEnumerable<ProductSize> productSizes)
    {
        await _unitOfWork.ProductSizeRepo.DeleteRangeAsync(productSizes);
        await _unitOfWork.SaveChangeAsync();
    }

    public async Task CreateProductSizes(int productId, List<CreateProductSizeDTO> createProductSizeDtos)
    {
        var productSizes = createProductSizeDtos.Select(p =>
        {
            var productSize = p.Adapt<ProductSize>();
            productSize.ProductId = productId;
            return productSize;
        }).ToList();
        await _unitOfWork.ProductSizeRepo.AddRangeAsync(productSizes);
        await _unitOfWork.SaveChangeAsync();
    }
}