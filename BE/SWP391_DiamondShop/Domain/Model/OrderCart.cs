using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class OrderCart
    {
        public int CartId { get; set; }
        public int OrderId { get; set; }
        public int? Quantity { get; set; }
        public int? WarrantyDocumentId { get; set; }
        public decimal? Price { get; set; }

        public virtual Cart Cart { get; set; }
        public virtual Order Order { get; set; }
        public virtual WarrantyDocument WarrantyDocument { get; set; }
    }
}
