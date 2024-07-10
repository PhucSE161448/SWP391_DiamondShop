using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Cart
    {
        public Cart()
        {
            OrderCarts = new HashSet<OrderCart>();
        }

        public int CartId { get; set; }
        public int? ProductId { get; set; }
        public int? DiamondId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Size { get; set; }
        public decimal? TotalPrice { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public string DeletedBy { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual Diamond Diamond { get; set; }
        public virtual Product Product { get; set; }
        public virtual ICollection<OrderCart> OrderCarts { get; set; }
    }
}
