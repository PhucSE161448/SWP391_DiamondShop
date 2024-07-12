﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Promotions
{
    public class PromotionDTO
    {
        public int Id { get; set; }
        public int Point { get; set; }
        public decimal DiscountPercentage { get; set; }
    }
}
