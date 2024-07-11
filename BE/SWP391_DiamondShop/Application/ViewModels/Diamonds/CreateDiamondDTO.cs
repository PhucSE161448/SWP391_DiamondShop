using System.ComponentModel.DataAnnotations;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.ViewModels.Diamonds;

public class CreateDiamondDTO
{
    [Required]
    [EnumDataType(typeof(DiamondOrigin))]
    public string Origin { get; set; }
    [Required]
    [EnumDataType(typeof(DiamondColor))]
    public string Color { get; set; }
    [Required]
    public decimal CaratWeight { get; set; }
    [Required]
    [EnumDataType(typeof(DiamondClarity))]
    public string Clarity { get; set; }
    [Required]
    [EnumDataType(typeof(DiamondCut))]
    public string Cut { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Required]
    public int CertificateId { get; set; }
    public List<IFormFile> DiamondImages { get; set; } = new List<IFormFile>();
    
    [Required]
    public int Quantity { get; set; }

    
}