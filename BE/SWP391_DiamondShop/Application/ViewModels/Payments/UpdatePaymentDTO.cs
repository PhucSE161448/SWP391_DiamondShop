using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Payments
{
    public class UpdatePaymentDTO
    {
        public string? Name { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
