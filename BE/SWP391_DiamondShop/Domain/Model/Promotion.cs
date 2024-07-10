using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Promotion
    {
        public int Id { get; set; }
        public int Point { get; set; }
        public decimal DiscountPercentage { get; set; }
    }
}
