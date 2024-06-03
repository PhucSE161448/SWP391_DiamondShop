using Application.ViewModels.Diamonds;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.ProductParts
{
    public class ProductPartDTO
    {
        public int Id { get; set; }
        public bool? IsMain { get; set; }
        public DiamondDTO? Diamond { get; set; }
    }
}
