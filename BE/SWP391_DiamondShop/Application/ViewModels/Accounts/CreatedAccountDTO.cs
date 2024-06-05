using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Accounts
{
    public class CreatedAccountDTO
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Address {  get; set; }
        public bool? Gender { get; set; }

        public string? PhoneNumber { get; set; }

        public int RoleId { get; set; }
    }
}
