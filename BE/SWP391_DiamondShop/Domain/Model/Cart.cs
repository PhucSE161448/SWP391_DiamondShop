using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Cart : BaseEntity
    {
        public Cart()
        {
            OrderCarts = new HashSet<OrderCart>();
        }

        public int CartId { get; set; }
        public int? ProductId { get; set; }
        public int? DiamondId { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }


        public virtual Diamond? Diamond { get; set; }
        public virtual Product? Product { get; set; }
        public virtual ICollection<OrderCart> OrderCarts { get; set; }
    }
}
