using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Carts
{
    public class CreateCartDTO
    {

        public int? Id { get; set; } = null;
        [Required]
        [Range(1,100)]
        public int? Quantity { get; set; }
        [Required]
        public decimal? TotalPrice { get; set; }
    }

}
