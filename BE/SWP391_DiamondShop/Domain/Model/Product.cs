using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Product: BaseEntity
    {
        public Product()
        {
            Images = new HashSet<Image>();
            OrderItems = new HashSet<OrderItem>();
            ProductParts = new HashSet<ProductPart>();
            ProductSizes = new HashSet<ProductSize>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool Gender { get; set; }
        public int Quantity { get; set; }
        public int CategoryId { get; set; }
        public int? WarrantyDocumentsId { get; set; }

        public virtual Category Category { get; set; }
        public virtual WarrantyDocument WarrantyDocuments { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<ProductPart> ProductParts { get; set; }
        public virtual ICollection<ProductSize> ProductSizes { get; set; }
    }
}
