using Application.ViewModels.Diamonds;
using Application.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Carts;

namespace Application.ViewModels.Orders
{
    public class OrderDetailDTO
    {
        public CartDTO Cart { get; set; }
    }
}
