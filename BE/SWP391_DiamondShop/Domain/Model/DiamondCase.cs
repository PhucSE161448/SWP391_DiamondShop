using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class DiamondCase : BaseEntity
    {
        public DiamondCase()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Material { get; set; } = null!;
        public string Color { get; set; } = null!;
        public string Name { get; set; } = null!;

        public virtual ICollection<Product> Products { get; set; }
    }
}
