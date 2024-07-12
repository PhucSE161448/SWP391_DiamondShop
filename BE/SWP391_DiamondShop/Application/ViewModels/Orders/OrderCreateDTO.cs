using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Orders
{
    public class OrderCreateDTO
    {
        public string Phone { get; set; }
        public string Address { get; set; }
        public decimal TotalPrice { get; set; }
        public List<int> CartId { get; set; }
    }
}
