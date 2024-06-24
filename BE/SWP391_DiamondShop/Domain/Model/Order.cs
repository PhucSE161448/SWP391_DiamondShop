using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Order
    {
        public Order()
        {
            OrderCarts = new HashSet<OrderCart>();
            OrderStatuses = new HashSet<OrderStatus>();
        }

        public int Id { get; set; }
        public int AccountId { get; set; }
        public decimal TotalPrice { get; set; }
        public int PaymentId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Account Account { get; set; } = null!;
        public virtual Payment Payment { get; set; } = null!;
        public virtual ICollection<OrderCart> OrderCarts { get; set; }
        public virtual ICollection<OrderStatus> OrderStatuses { get; set; }
    }
}
