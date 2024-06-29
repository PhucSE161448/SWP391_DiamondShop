using Application.ViewModels.Categories;
using Application.ViewModels.Diamonds;
using Application.ViewModels.Images;
using Application.ViewModels.ProductParts;
using Application.ViewModels.WarrantyDocuments;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Collections;
using Application.ViewModels.DiamondCases;
using Application.ViewModels.ProductSizes;

namespace Application.ViewModels.Products
{
    public class GetProductDetailDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool Gender { get; set; }
        public decimal Wage { get; set; }
        public CategoryDTO? Category { get; set; }
        public GetDiamondCaseDetailDTO? DiamondCase { get; set; }
        public CollectionDTO? Collection { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<ProductPartDTO> ProductParts { get; set; } = new List<ProductPartDTO>();
        public ICollection<ProductSizeDTO> ProductSizes { get; set; } = new List<ProductSizeDTO>();
        public ICollection<ImageDTO> Images { get; set; } = new List<ImageDTO>();
    }
}
