﻿using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderProducts = new HashSet<OrderProduct>();
        }

        public int Id { get; set; }
        public int AccountId { get; set; }
        public decimal TotalPrice { get; set; }
        public int StatusId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool? IsDeleted { get; set; }
        public int PaymentId { get; set; }

        public virtual Account Account { get; set; }
        public virtual Payment Payment { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<OrderProduct> OrderProducts { get; set; }
    }
}
