using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public partial class Origin
    {
        public Origin()
        {
            Diamonds = new HashSet<Diamond>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string DeletedBy { get; set; }
        public DateTime DeletedDate { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual ICollection<Diamond> Diamonds { get; set; }
    }
}
