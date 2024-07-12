using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Orders
{
    public class GetOrderProduct
    {
        public string? Name { get; set; }
        public decimal? Price { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public DateTime? BuyDate { get; set; }
    }
}
