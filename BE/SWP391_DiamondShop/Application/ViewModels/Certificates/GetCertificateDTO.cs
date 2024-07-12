namespace Application.ViewModels.Certificates;

public class GetCertificateDTO
{
    public int Id { get; set; }

    public string? ReportNumber { get; set; }

    public string? Origin { get; set; } 

    public string? Color { get; set; } 

    public string? Clarity { get; set; } 

    public string? Cut { get; set; } 

    public decimal CaratWeight { get; set; } 

    public DateTime DateOfIssue { get; set; }

    public bool IsDeleted { get; set; }
}