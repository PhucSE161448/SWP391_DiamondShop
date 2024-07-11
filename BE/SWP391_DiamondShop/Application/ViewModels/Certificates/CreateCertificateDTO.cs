using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Application.ViewModels.Certificates;

public class CreateCertificateDTO
{
    [Required]
    public string ReportNumber { get; set; }
    [Required]
    [EnumDataType(typeof(DiamondOrigin))]
    public string Origin { get; set; } 

    [Required]
    [EnumDataType(typeof(DiamondColor))]
    public string Color { get; set; } 
    [Required]
    [EnumDataType(typeof(DiamondClarity))]
    public string Clarity { get; set; } 
    [Required]
    [EnumDataType(typeof(DiamondCut))]
    public string Cut { get; set; } 
    [Required]
    public decimal CaratWeight { get; set; } 

    public DateTime DateOfIssue { get; set; }
}