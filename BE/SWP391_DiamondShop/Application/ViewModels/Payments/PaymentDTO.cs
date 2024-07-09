using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Payments
{
    public class PaymentDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string PaymentType { get; set; } = null!;
        public bool? IsDeleted { get; set; }
    }
}
