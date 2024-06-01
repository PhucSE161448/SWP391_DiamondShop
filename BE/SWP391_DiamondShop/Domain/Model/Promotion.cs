using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Promotion : BaseEntity
    {
        public int Id { get; set; }
        public decimal DiscountPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
