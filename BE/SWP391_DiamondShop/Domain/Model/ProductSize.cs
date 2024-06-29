using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class ProductSize : BaseEntity
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public decimal Size { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }

        public virtual Product Product { get; set; } = null!;
    }
}
