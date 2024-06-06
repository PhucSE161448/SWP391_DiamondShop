using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class ProductPart: BaseEntity
    {
        public int Id { get; set; }
        public bool? IsMain { get; set; }
        public int ProductId { get; set; }
        public int DiamondId { get; set; }

        public virtual Diamond Diamond { get; set; }
        public virtual Product Product { get; set; }
    }
}
