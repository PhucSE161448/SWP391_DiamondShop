namespace Application.ViewModels.ProductParts;

public class UpdateProductPartDTO
{
    public int Id;
    public bool? IsMain { get; set; }

    public int DiamondId { get; set; }
}