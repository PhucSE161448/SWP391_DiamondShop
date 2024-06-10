using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IFirebaseStorageService
{
    Task<string> UploadImageAsync(IFormFile imageFile, string? imageName = default);

    string GetImageUrl(string imageName);

    Task<string> UpdateImageAsync(IFormFile imageFile, string imageName);

    Task DeleteImageAsync(string imageName);
    
    Task DeleteImagesAsync(List<string> imageUrls);
    
    Task<string[]> UploadImagesAsync(List<IFormFile> imageFiles);
}