namespace Application.ViewModels.Certificates;

public class GetListCertificateDTO
{
    public int Id { get; set; }
    public string? ReportNumber { get; set; }
    public string? Origin { get; set; }
    public DateTime DateOfIssue { get; set; }
    public bool IsDeleted { get; set; }
}