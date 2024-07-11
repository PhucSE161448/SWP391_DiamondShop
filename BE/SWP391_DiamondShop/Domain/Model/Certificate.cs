using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Certificate : BaseEntity
    {
        public int Id { get; set; }
        public string ReportNumber { get; set; } = null!;
        public string Origin { get; set; } = null!;
        public string Color { get; set; } = null!;
        public decimal CaratWeight { get; set; }
        public string Clarity { get; set; } = null!;
        public string Cut { get; set; } = null!;
        public DateTime DateOfIssue { get; set; }

        public virtual Diamond? Diamond { get; set; }
    }
}
