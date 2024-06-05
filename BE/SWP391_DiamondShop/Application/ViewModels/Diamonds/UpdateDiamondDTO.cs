namespace Application.ViewModels.Diamonds;

public class UpdateDiamondDTO
{
    public int OriginId { get; set; }
    public int CaratWeightId { get; set; }
    public int ClarityId { get; set; }
    public int CutId { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}