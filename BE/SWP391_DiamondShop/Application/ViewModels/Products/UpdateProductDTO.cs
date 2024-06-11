﻿using Application.ViewModels.ProductParts;
using Application.ViewModels.ProductSizes;
using Microsoft.AspNetCore.Http;

namespace Application.ViewModels.Products;

public class UpdateProductDTO
{
    public string Name { get; set; }
    public bool Gender { get; set; }
    public int Quantity { get; set; }
    public int CategoryId { get; set; }
    public int WarrantyDocumentsId { get; set; }
    public List<IFormFile> ProductImages { get; set; } = new List<IFormFile>();
    
}