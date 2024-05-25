using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public partial class WarrantyDocument
    {
        public WarrantyDocument()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public int Period { get; set; }
        public string TermsAndConditions { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string DeletedBy { get; set; }
        public DateTime DeletedDate { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
