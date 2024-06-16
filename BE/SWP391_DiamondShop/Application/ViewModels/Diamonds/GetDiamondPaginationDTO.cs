
using Application.ViewModels.Images;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Diamonds
{
    public class GetDiamondPaginationDTO
    {
        public int Id { get; set; }
        public string? Origin { get; set; }
        public decimal CaratWeight { get; set; }
        public string? Clarity { get; set; }
        public string? Cut { get; set; }
        public string? Color { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<ImageDTO> Images { get; set; } = new List<ImageDTO>();
    }
}
