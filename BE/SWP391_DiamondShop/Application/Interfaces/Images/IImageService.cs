using Domain.Model;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces.Images;

public interface IImageService
{
    Task UploadDiamondImages(List<IFormFile> imageFiles, int diamondId);
    Task UploadProductImages(List<IFormFile> imageFiles, int productId);
    Task<IFormFile> DownloadImageFromUrl(string imageUrl, string fileName, string contentType);
    Task DeleteImages(IEnumerable<Image> images);
}