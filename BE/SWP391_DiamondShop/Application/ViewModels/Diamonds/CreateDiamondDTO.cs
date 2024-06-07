using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Application.ViewModels.Diamonds;

public class CreateDiamondDTO
{
    [Required]
    public string Origin { get; set; }
    [Required]
    [EnumDataType(typeof(DiamondColor))]
    public string Color { get; set; }
    [Required]
    public string CaratWeight { get; set; }
    [Required]
    [EnumDataType(typeof(DiamondClarity))]
    public string Clarity { get; set; }
    [Required]
    [EnumDataType(typeof(DiamondCut))]
    public string Cut { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Required]
    public int Quantity { get; set; }
}