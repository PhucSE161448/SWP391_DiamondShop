using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Promotion : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal DiscountPercentage { get; set; }
        public int? CategoryId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual Category? Category { get; set; }
    }
}
