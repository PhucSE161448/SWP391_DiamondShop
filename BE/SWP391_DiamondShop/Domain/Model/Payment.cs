using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Payment : BaseEntity
    {
        public Payment()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string PaymentType { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
