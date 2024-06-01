using Application.ViewModels.Diamonds;
using Application.ViewModels.WarrantyDocuments;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Products
{
    public class GetProductDetailDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Size { get; set; }
        public string ImageUrl { get; set; }
        public int Quantity { get; set; }
        public int CategoryId { get; set; }
        public DiamondDTO? Diamond  { get; set; }
        public decimal Price { get; set; }
        public decimal Wage { get; set; }
        public WarrantyDocumentDTO? WarrantyDocuments { get; set; }
    }
}
