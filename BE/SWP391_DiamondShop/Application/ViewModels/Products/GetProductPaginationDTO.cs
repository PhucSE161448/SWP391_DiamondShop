using Application.ViewModels.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Products
{
    public class GetProductPaginationDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal Size { get; set; }
        public string? ImageUrl { get; set; }
        public int Quantity { get; set; }
        public CategoryDTO? Category { get; set; }
        public decimal Price { get; set; }
        public decimal Wage { get; set; }
    }
}
