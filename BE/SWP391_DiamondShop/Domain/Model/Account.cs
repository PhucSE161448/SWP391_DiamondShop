using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Account : BaseEntity
    {
        public Account()
        {
            OrderStatuses = new HashSet<OrderStatus>();
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public decimal Point { get; set; }
        public int RoleId { get; set; }
        public bool Gender { get; set; }
        public string ConfirmationToken { get; set; } = null!;

        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<OrderStatus> OrderStatuses { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
