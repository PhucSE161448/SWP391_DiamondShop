using Application.ViewModels.CaratWeights;
using Application.ViewModels.Clarities;
using Application.ViewModels.Cuts;
using Application.ViewModels.Images;
using Application.ViewModels.Origins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Diamonds
{
    public class GetDiamondDetailDTO
    {
        public int Id { get; set; }
        public OriginDTO? Origin { get; set; }
        public CaratWeightDTO? CaratWeight { get; set; }
        public ClarityDTO? Clarity { get; set; }
        public CutDTO? Cut { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public ICollection<ImageDTO> Images { get; set; } = new List<ImageDTO>();
    }
}
