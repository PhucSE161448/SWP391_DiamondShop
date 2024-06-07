using Application.ViewModels.Categories;
using Application.ViewModels.Images;
using Application.ViewModels.WarrantyDocuments;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.ProductParts;
using Application.ViewModels.ProductSizes;

namespace Application.ViewModels.Products
{
    public class GetProductPaginationDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool Gender { get; set; }
        public int Quantity { get; set; }
        public CategoryDTO? Category { get; set; }
        public WarrantyDocumentDTO? WarrantyDocuments { get; set; }
        public ICollection<ProductSizeDTO> ProductSizes { get; set; } = new List<ProductSizeDTO>();
        public ICollection<ProductPartDTO> ProductParts { get; set; } = new List<ProductPartDTO>();
        public ICollection<ImageDTO> Images { get; set; } = new List<ImageDTO>();
    }
}
