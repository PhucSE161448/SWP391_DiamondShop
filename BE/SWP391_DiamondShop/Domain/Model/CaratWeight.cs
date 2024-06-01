using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class CaratWeight : BaseEntity
    {
        public CaratWeight()
        {
            Diamonds = new HashSet<Diamond>();
        }

        public int Id { get; set; }
        public double Weight { get; set; }
        public decimal Price { get; set; }

        public virtual ICollection<Diamond> Diamonds { get; set; }
    }
}
