using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Order: BaseEntity
    {
        public Order()
        {
            OrderItems = new HashSet<OrderItem>();
        }

        public int Id { get; set; }
        public int AccountId { get; set; }
        public decimal TotalPrice { get; set; }
        public int StatusId { get; set; }
        public int PaymentId { get; set; }

        public virtual Account Account { get; set; }
        public virtual Payment Payment { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
