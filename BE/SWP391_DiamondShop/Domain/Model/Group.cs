using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Group : BaseEntity
    {
        public Group()
        {
            Categories = new HashSet<Category>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Category> Categories { get; set; }
    }
}
