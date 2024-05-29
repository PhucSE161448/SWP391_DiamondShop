using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Payment
    {
        public Payment()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public long PaymentType { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
