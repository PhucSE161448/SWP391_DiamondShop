using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Accounts
{
    public class CreatedAccountDTO
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? Address {  get; set; }
        [Required]
        public bool? Gender { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }

        public int RoleId { get; set; }
    }
}
