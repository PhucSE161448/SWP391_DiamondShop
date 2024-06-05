using Application.ViewModels.Categories;
using Application.ViewModels.Images;
using Application.ViewModels.ProductSize;
using Application.ViewModels.WarrantyDocuments;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Products
{
    public class GetProductPaginationDTO
    {
        //public decimal Wage { get; set; }
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool Gender { get; set; }
        public int Quantity { get; set; }
        public CategoryDTO? Category { get; set; }
        //public Diamond Diamond { get; set; };
        public ICollection<ProductSizeDTO> ProductSizes { get; set; } = new List<ProductSizeDTO>();
        public ICollection<ImageDTO> Images { get; set; } = new List<ImageDTO>();
    }
}
