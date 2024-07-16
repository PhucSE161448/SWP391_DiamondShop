using System.ComponentModel.DataAnnotations;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.ViewModels.Diamonds;

public class UpdateDiamondDTO
{
    [EnumDataType(typeof(DiamondColor))]
    public string? Color { get; set; }
    [EnumDataType(typeof(DiamondOrigin))]    
    public string? Origin { get; set; }

    public decimal CaratWeight { get; set; }

    [EnumDataType(typeof(DiamondClarity))]  
    public string? Clarity { get; set; }

    [EnumDataType(typeof(DiamondCut))]
    public string? Cut { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }
    
    public List<string> OldImageUrls { get; set; } = new List<string>();
    public List<IFormFile> DiamondImages { get; set; } = new List<IFormFile>();
    
}