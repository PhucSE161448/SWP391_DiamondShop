using Application.Interfaces;
using Application.Interfaces.ProductSize;
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

    public async Task UpdateOrCreateProductSizes(int productId, ICollection<UpdateProductSizeDTO> updateProductSizeDtos)
    {
        var existingProductSizes = await _unitOfWork.ProductSizeRepo.GetAllAsync(x => x.ProductId == productId);
        var newProductSizes = updateProductSizeDtos
            // ReSharper disable once SimplifyLinqExpressionUseAll
            .Where(p => !existingProductSizes.Any(e => e.Id == p.Id))
            .Select(p => _mapper.Map<ProductSize>(p))
            .ToList();

        foreach (var existingSize in existingProductSizes)
        {
            var updateSize = updateProductSizeDtos.FirstOrDefault(p => p.Id == existingSize.Id);
            if (updateSize == null) continue;
            _mapper.Map(updateSize, existingSize);
            _unitOfWork.ProductSizeRepo.Update(existingSize);
        }
        if (newProductSizes.Any())
        {
            foreach (var newSize in newProductSizes)
            {
                newSize.ProductId = productId;
            }
            await _unitOfWork.ProductSizeRepo.AddRangeAsync(newProductSizes);
        }
        await _unitOfWork.SaveChangeAsync();
    }
}