using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public partial class Product
    {
        public Product()
        {
            OrderProducts = new HashSet<OrderProduct>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Size { get; set; }
        public string ImageUrl { get; set; }
        public int Quantity { get; set; }
        public int CategoryId { get; set; }
        public int DiamondId { get; set; }
        public decimal Price { get; set; }
        public decimal Wage { get; set; }
        public int WarrantyDocumentsId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string DeletedBy { get; set; }
        public DateTime DeletedDate { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual Category Category { get; set; }
        public virtual Diamond Diamond { get; set; }
        public virtual WarrantyDocument WarrantyDocuments { get; set; }
        public virtual ICollection<OrderProduct> OrderProducts { get; set; }
    }
}
