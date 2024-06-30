using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Roles;

namespace Application.ViewModels.Accounts
{
    public class AccountDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public bool? Gender { get; set; }
        public string? Password { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public RoleDTO? Role { get; set; }
        public bool? IsDeleted { get; set; }

    }
}
