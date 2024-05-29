using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class WarrantyDocument : BaseEntity
    {
        public WarrantyDocument()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public int Period { get; set; }
        public string TermsAndConditions { get; set; }


        public virtual ICollection<Product> Products { get; set; }
    }
}
