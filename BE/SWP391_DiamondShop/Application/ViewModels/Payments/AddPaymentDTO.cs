using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Payments
{
    public class AddPaymentDTO
    {
        [Required]
        public string Name { get; set; } = null!;
    }
}
