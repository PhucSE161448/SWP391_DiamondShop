using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Collection : BaseEntity
    {
        public Collection()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Product> Products { get; set; }
    }
}
