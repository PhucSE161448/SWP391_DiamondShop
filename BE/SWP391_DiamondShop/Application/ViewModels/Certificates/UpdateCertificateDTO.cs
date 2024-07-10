using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Application.ViewModels.Certificates;

public class UpdateCertificateDTO
{
    [Required]
    public string ReportNumber { get; set; }
    [Required]
    [EnumDataType(typeof(DiamondOrigin))]
    public string Origin { get; set; } 
    
    [EnumDataType(typeof(DiamondColor))]
    public string? Color { get; set; }
    
    [EnumDataType(typeof(DiamondClarity))]
    public string? Clarity { get; set; }
    
    [EnumDataType(typeof(DiamondCut))]
    public string? Cut { get; set; } 
    
    public decimal CaratWeight { get; set; } 

    public DateTime DateOfIssue { get; set; }
}