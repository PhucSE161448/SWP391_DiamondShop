using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public partial class Account
    {
        public Account()
        {
            Orders = new HashSet<Order>();
            Statuses = new HashSet<Status>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int RoleId { get; set; }
        public bool Gender { get; set; }
        public string ConfirmationToken { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string DeletedBy { get; set; }
        public DateTime DeletedDate { get; set; }
        public bool? IsDeleted { get; set; }
        public decimal Point { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Status> Statuses { get; set; }
    }
}
