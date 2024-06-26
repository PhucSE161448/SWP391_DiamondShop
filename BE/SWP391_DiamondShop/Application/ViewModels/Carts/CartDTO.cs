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
        public int? ProductId { get; set; }
        public int? DiamondId { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }
        public GetProductDetailDTO GetProductDetailDto { get; set; }
        public GetDiamondDetailDTO GetDiamondDetailDto { get; set; }
    }
}
