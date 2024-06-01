﻿using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Status
    {
        public Status()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public int AccountId { get; set; }
        public int Name { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Account Account { get; set; } = null!;
        public virtual ICollection<Order> Orders { get; set; }
    }
}
