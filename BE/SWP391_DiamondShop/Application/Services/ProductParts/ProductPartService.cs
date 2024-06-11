using Application.Interfaces;
using Application.Interfaces.ProductParts;
using Application.ViewModels.ProductParts;
using AutoMapper;
using Domain.Model;

namespace Application.Services.ProductParts;

public class ProductPartService : IProductPartService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ProductPartService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }


    public async Task DeleteProductPart(IEnumerable<ProductPart> productParts)
    {
        await _unitOfWork.ProductPartRepo.DeleteRangeAsync(productParts);
        await _unitOfWork.SaveChangeAsync();
    }

    public async Task UpdateOrCreateProductPart(int productId, ICollection<UpdateProductPartDTO> updateProductPartDtos)
    {
        var productPart = updateProductPartDtos.Select(p =>
        {
            var productPart = _mapper.Map<ProductPart>(p);
            productPart.ProductId = productId;
            return productPart;
        }).ToList();
        await _unitOfWork.ProductPartRepo.AddRangeAsync(productPart);
        await _unitOfWork.SaveChangeAsync();
    }
}