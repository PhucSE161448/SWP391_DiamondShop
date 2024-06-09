using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Diamond: BaseEntity
    {
        public Diamond()
        {
            Images = new HashSet<Image>();
            OrderItems = new HashSet<OrderItem>();
            ProductParts = new HashSet<ProductPart>();
        }

        public int Id { get; set; }
        public string Origin { get; set; }
        public string Color { get; set; }
        public decimal CaratWeight { get; set; }
        public string Clarity { get; set; }
        public string Cut { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<ProductPart> ProductParts { get; set; }
    }
}
