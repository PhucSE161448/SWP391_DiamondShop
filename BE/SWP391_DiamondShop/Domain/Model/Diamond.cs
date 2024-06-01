using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Diamond : BaseEntity
    {
        public Diamond()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public int OriginId { get; set; }
        public int CaratWeightId { get; set; }
        public int ColorId { get; set; }
        public int ClarityId { get; set; }
        public int CutId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }


        public virtual CaratWeight CaratWeight { get; set; }
        public virtual Clarity Clarity { get; set; }
        public virtual Cut Cut { get; set; }
        public virtual Origin Origin { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
