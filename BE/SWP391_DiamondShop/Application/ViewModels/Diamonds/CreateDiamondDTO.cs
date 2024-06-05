using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels.Diamonds;

public class CreateDiamondDTO
{
    [Required]
    public int OriginId { get; set; }
    [Required]
    public int CaratWeightId { get; set; }
    [Required]
    public int ClarityId { get; set; }
    [Required]
    public int CutId { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Required]
    public int Quantity { get; set; }
}