using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Diamond : BaseEntity
    {
        public Diamond()
        {
            Images = new HashSet<Image>();
            OrderItems = new HashSet<OrderItem>();
            ProductParts = new HashSet<ProductPart>();
        }

        public int Id { get; set; }
        public int OriginId { get; set; }
        public int CaratWeightId { get; set; }
        public int ClarityId { get; set; }
        public int CutId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public virtual CaratWeight CaratWeight { get; set; } = null!;
        public virtual Clarity Clarity { get; set; } = null!;
        public virtual Cut Cut { get; set; } = null!;
        public virtual Origin Origin { get; set; } = null!;
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<ProductPart> ProductParts { get; set; }
    }
}
