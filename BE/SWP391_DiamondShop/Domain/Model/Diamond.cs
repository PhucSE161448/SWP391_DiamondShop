using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Diamond : BaseEntity
    {
        public Diamond()
        {
            Carts = new HashSet<Cart>();
            Images = new HashSet<Image>();
            ProductParts = new HashSet<ProductPart>();
        }

        public int Id { get; set; }
        public string Origin { get; set; } = null!;
        public string Color { get; set; } = null!;
        public decimal CaratWeight { get; set; }
        public string Clarity { get; set; } = null!;
        public string Cut { get; set; } = null!;
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quantity { get; set; }


        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<ProductPart> ProductParts { get; set; }
    }
}
