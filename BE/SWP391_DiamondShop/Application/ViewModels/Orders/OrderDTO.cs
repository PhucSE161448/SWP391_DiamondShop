using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Orders
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string? AccountName { get; set; }
        public decimal TotalPrice { get; set; }
        public string? PaymentName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? Status { get; set; }
    }
}
