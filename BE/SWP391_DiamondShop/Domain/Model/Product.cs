using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Product : BaseEntity
    {
        public Product()
        {
            Carts = new HashSet<Cart>();
            Images = new HashSet<Image>();
            ProductParts = new HashSet<ProductPart>();
            ProductSizes = new HashSet<ProductSize>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public bool Gender { get; set; }
        public decimal? Wage { get; set; }
        public int CategoryId { get; set; }
        public int DiamondCaseId { get; set; }
        public int? CollectionId { get; set; }

        public virtual Category Category { get; set; } = null!;
        public virtual Collection? Collection { get; set; }
        public virtual DiamondCase DiamondCase { get; set; } = null!;
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<ProductPart> ProductParts { get; set; }
        public virtual ICollection<ProductSize> ProductSizes { get; set; }
    }
}
