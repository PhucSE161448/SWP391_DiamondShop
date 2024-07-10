using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Voucher
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public bool? IsAllProduct { get; set; }
        public decimal DiscountPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
