﻿using System;
using System.Collections.Generic;

namespace Domain.Model
{
    public partial class Cut : BaseEntity
    {
        public Cut()
        {
            Diamonds = new HashSet<Diamond>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }


        public virtual ICollection<Diamond> Diamonds { get; set; }
    }
}
