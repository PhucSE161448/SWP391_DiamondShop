using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Vouchers
{
    public class VoucherDTO
    {
        public int Id {  get; set; }
        public int ProductId {get; set; }
        public bool IsAllProduct { get; set; }
        public decimal Discount_Percentage {  get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set;}
        
    }
}
