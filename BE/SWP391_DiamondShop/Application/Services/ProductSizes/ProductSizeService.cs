using Application.Interfaces;
using Application.Interfaces.ProductSizes;
using Application.ViewModels.ProductSizes;
using AutoMapper;
using Domain.Model;

namespace Application.Services.ProductSizes;

public class ProductSizeService : IProductSizeService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ProductSizeService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
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
            var productSize = _mapper.Map<ProductSize>(p);
            productSize.ProductId = productId;
            return productSize;
        }).ToList();
        await _unitOfWork.ProductSizeRepo.AddRangeAsync(productSizes);
        await _unitOfWork.SaveChangeAsync();
    }
}