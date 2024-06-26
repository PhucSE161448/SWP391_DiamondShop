namespace Application.ViewModels.DiamondCases;

public class GetDiamondCaseDetailDTO
{
    public int Id { get; set; }
    public string? Material { get; set; } 
    public string? Color { get; set; }
    public string? Name { get; set; } 
    public bool IsDeleted { get; set; }
}