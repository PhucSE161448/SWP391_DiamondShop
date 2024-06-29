using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.ProductSizes
{
    public class ProductSizeDTO
    {
        public int Id { get; set; }
        public decimal Size { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
