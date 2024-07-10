using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Certificate : BaseEntity
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Color { get; set; }
        public decimal CaratWeight { get; set; }
        public string Clarity { get; set; }
        public string Cut { get; set; }
        public DateTime DateOfIssue { get; set; }

        public virtual Diamond Diamond { get; set; }
    }
}
