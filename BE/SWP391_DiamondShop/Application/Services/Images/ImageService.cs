using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Images;
using Application.Ultils;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services.Images;

public class ImageService : IImageService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IFirebaseStorageService _firebaseStorageService;

    public ImageService(IUnitOfWork unitOfWork, IFirebaseStorageService firebaseStorageService)
    {
        _unitOfWork = unitOfWork;
        _firebaseStorageService = firebaseStorageService;
    }

    public async Task UploadDiamondImages(List<IFormFile> imageFiles, int diamondId)
    {
        if (imageFiles.IsNullOrEmpty())
        {
            throw new BadRequestException("No Image File found");
        }
        var folderPath = $"diamond/{diamondId}";
        var imageUrls = await _firebaseStorageService.UploadImagesAsync(imageFiles, folderPath);
        var images = imageUrls.Select(url => new Image { DiamondId = diamondId, UrlPath = url }).ToList();
        await _unitOfWork.ImageRepo.AddRangeAsync(images);
        await _unitOfWork.SaveChangeAsync();
    }

    public async Task UploadProductImages(List<IFormFile> imageFiles, int productId)
    {
        if (imageFiles.IsNullOrEmpty())
        {
            throw new BadRequestException("No Image File found");
        }
        var folderPath = $"product/{productId}";
        var imageUrls = await _firebaseStorageService.UploadImagesAsync(imageFiles, folderPath);
        var images = imageUrls.Select(url => new Image { ProductId = productId, UrlPath = url }).ToList();
        await _unitOfWork.ImageRepo.AddRangeAsync(images);
        await _unitOfWork.SaveChangeAsync();
    }

    public async Task<IFormFile> DownloadImageFromUrl(string imageUrl, string fileName, string contentType)
    {
        using var httpClient = new HttpClient();
        var response = await httpClient.GetAsync(imageUrl);
        if (!response.IsSuccessStatusCode) throw new Exception($"Failed to download image from URL: {imageUrl}");
        var fileBytes = await response.Content.ReadAsByteArrayAsync();
        return FormFileHelper.ToFormFile(fileBytes, fileName, contentType);
    }
    public async Task DeleteImages(IEnumerable<Image> images)
    {
        var imageUrls = images.Select(p => p.UrlPath);
        await _firebaseStorageService.DeleteImagesAsync(imageUrls.ToList());
        await _unitOfWork.ImageRepo.DeleteRangeAsync(images);
        await _unitOfWork.SaveChangeAsync();
    }
}