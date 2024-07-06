using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Diamonds;
using Application.ViewModels.Products;

namespace Application.ViewModels.Carts
{
    public class CartDTO
    {
        public int CartId { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }
        public decimal? Size { get; set; }
        public bool? IsDeleted { get; set; }
        public GetProductDetailDTO Product { get; set; }
        public GetDiamondDetailDTO Diamond { get; set; }
    }
}
