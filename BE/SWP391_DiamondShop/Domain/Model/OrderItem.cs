using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class OrderItem
    {
        public int OrderItemId { get; set; }
        public int? OrderId { get; set; }
        public string? ItemType { get; set; }
        public int? ItemId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }

        public virtual Diamond? Item { get; set; }
        public virtual Product? ItemNavigation { get; set; }
        public virtual Order? Order { get; set; }
    }
}
