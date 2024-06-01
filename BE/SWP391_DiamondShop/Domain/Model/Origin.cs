using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Origin : BaseEntity
    {
        public Origin()
        {
            Diamonds = new HashSet<Diamond>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }


        public virtual ICollection<Diamond> Diamonds { get; set; }
    }
}
