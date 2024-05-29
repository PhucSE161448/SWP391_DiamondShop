using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Accounts
{
    public class RegisterAccountDTO
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public bool? Gender { get; set; }
        public string? Password { get; set; }
        public string? Address { get; set; }
        public decimal? Point = 0;
        public string? PhoneNumber { get; set; }
    }
}
