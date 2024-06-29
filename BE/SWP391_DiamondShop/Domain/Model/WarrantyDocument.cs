using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class WarrantyDocument : BaseEntity
    {
        public int Id { get; set; }
        public DateTime Period { get; set; }
        public string TermsAndConditions { get; set; } = null!;


        public virtual OrderCart? OrderCart { get; set; }
    }
}
