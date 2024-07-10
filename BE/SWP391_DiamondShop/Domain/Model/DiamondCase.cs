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
        public string Material { get; set; }
        public string Color { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
