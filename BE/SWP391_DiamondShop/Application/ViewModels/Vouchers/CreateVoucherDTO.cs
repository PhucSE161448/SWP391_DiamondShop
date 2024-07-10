using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Vouchers
{
    public class CreateVoucherDTO
    {
        public int? ProductId { get; set; }
        [Required]
        public bool IsAllProduct { get; set; }
        [Required]
        public decimal DiscountPercentage { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
    }
}
