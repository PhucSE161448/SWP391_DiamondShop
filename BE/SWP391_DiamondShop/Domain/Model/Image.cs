using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Image : BaseEntity
    {
        public int Id { get; set; }
        public string UrlPath { get; set; }
        public int? DiamondId { get; set; }
        public int? ProductId { get; set; }


        public virtual Diamond Diamond { get; set; }
        public virtual Product Product { get; set; }
    }
}
