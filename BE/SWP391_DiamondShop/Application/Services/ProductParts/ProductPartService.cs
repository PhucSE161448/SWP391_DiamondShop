using Application.Interfaces;
using Application.Interfaces.ProductPart;
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
    

    public async Task UpdateOrCreateProductPart(int productId, ICollection<UpdateProductPartDTO> updateProductPartDtos)
    {
        var existingProductParts = await _unitOfWork.ProductPartRepo.GetAllAsync(p => p.ProductId == productId);
    
        var newProductParts = updateProductPartDtos
            .Where(p => !existingProductParts.Any(e => e.Id == p.Id))
            .Select(p => _mapper.Map<ProductPart>(p))
            .ToList();

        foreach (var existingPart in existingProductParts)
        {
            var updatePart = updateProductPartDtos.FirstOrDefault(p => p.Id == existingPart.Id);
            if (updatePart == null) continue;
            _mapper.Map(updatePart, existingPart);
            _unitOfWork.ProductPartRepo.Update(existingPart);
        }
        if (newProductParts.Any())
        {
            foreach (var newPart in newProductParts)
            {
                newPart.ProductId = productId;
            }
            await _unitOfWork.ProductPartRepo.AddRangeAsync(newProductParts);
        }

        await _unitOfWork.SaveChangeAsync();
    }
}