﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Products
{
    public class QueryProductDTO
    {
        
        public QueryDTO queryDTO { get; set; } = new QueryDTO();
        public decimal StartPrice {  get; set; }
        public decimal EndPrice { get; set; }
        public List<int> CategoryIds { get; set; }
        public List<int> DiamondIds { get; set; }
        public string? Name {  get; set; }
        public QueryProductDTO()
        {
            CategoryIds = new List<int>();
            DiamondIds = new List<int>();
        }
    }
}
