using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Diamonds
{
    public class QueryDiamondDTO
    {
        public QueryDTO QueryDTO { get; set; } = new QueryDTO();
        public decimal StartPrice { get; set; }
        public decimal EndPrice { get; set; }
        public decimal StartCaratWeight { get; set; }
        public decimal EndCaratWeight { get; set; }
        public string? Name { get; set; }
        public List<string> Colors { get; set; } = new List<string>();
        public List<string> Clarities { get; set; } = new List<string>();
        public List<string> Cuts { get; set; } = new List<string>();
    }
}

