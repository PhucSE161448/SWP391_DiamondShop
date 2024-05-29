using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.CaratWeights
{
    public class CaratWeightDTO
    {
        public int Id { get; set; }
        public double Weight { get; set; }
        public decimal Price { get; set; }
        public bool IsDelete { get; set; }
    }
}
