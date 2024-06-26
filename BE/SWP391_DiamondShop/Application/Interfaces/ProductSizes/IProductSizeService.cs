﻿using Application.ViewModels.ProductSizes;
using Domain.Model;

namespace Application.Interfaces.ProductSizes;

public interface IProductSizeService
{
    Task DeleteProductSize(IEnumerable<ProductSize> productSizes);
    Task CreateProductSizes(int productId, List<CreateProductSizeDTO> createProductSizeDtos);
}