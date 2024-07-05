using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class WarrantyDocument 
    {
        public WarrantyDocument()
        {
            OrderCarts = new HashSet<OrderCart>();
        }

        public int Id { get; set; }
        public DateTime Period { get; set; }
        public string TermsAndConditions { get; set; } = null!;

        public DateTime? CreatedDate { get; set; }

        public string? CreatedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public string? ModifiedBy { get; set; }

        public DateTime? DeletedDate { get; set; }

        public string? DeletedBy { get; set; }

        public bool IsDeleted { get; set; }

        public virtual ICollection<OrderCart> OrderCarts { get; set; }
    }
}
