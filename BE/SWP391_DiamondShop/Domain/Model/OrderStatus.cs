using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class OrderStatus
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public int OrderId { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Account Account { get; set; }
        public virtual Order Order { get; set; }
    }
}
