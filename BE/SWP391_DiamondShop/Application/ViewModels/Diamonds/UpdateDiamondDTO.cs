using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Application.ViewModels.Diamonds;

public class UpdateDiamondDTO
{
    [EnumDataType(typeof(DiamondColor))]
    public string? Color { get; set; }
        
    public string? Origin { get; set; }

    public decimal CaratWeight { get; set; }

    [EnumDataType(typeof(DiamondClarity))]  
    public string? Clarity { get; set; }

    [EnumDataType(typeof(DiamondCut))]
    public string? Cut { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }
}