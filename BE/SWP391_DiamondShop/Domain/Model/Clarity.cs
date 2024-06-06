using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Clarity : BaseEntity
    {
        public Clarity()
        {
            Diamonds = new HashSet<Diamond>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public decimal Price { get; set; }

        public virtual ICollection<Diamond> Diamonds { get; set; }
    }
}
