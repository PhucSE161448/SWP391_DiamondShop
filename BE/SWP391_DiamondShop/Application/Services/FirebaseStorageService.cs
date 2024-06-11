using Application.Exceptions;
using Application.Interfaces;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Application.Services;

public class FirebaseStorageService : IFirebaseStorageService
{
    private readonly StorageClient _storageClient;
    private readonly IConfiguration _configuration;
    private readonly string _bucketName;

    public FirebaseStorageService(StorageClient storageClient, IConfiguration configuration)
    {
        _storageClient = storageClient;
        _configuration = configuration;
        _bucketName = _configuration["Firebase:Bucket"]!;
    }

    public string GetImageUrl(string folderName, string imageName)
    {
        
        var encodedFolderName = Uri.EscapeDataString(folderName);
        var encodedImageName = Uri.EscapeDataString(imageName);
        
        var imageUrl = $"https://firebasestorage.googleapis.com/v0/b/{_bucketName}/o/{encodedFolderName}%2F{encodedImageName}?alt=media";
        return imageUrl;
    }

    private string ExtractImageNameFromUrl(string imageUrl)
    {
        var uri = new Uri(imageUrl);
        var segments = uri.Segments;
        var escapedImageName = segments[segments.Length - 1];
        var imageName = Uri.UnescapeDataString(escapedImageName);
        return imageName;
    }

    public async Task DeleteImageAsync(string imageUrl)
    {
        await _storageClient.DeleteObjectAsync(_bucketName, ExtractImageNameFromUrl(imageUrl), cancellationToken: CancellationToken.None);
    }

    public async Task DeleteImagesAsync(List<string> imageUrls)
    {
        var deleteImageTasks = new List<Task>();

        foreach (var imageUrl in imageUrls)
        {
            deleteImageTasks.Add(DeleteImageAsync(imageUrl));
        }

        await Task.WhenAll(deleteImageTasks);
    }

    public async Task<string[]> UploadImagesAsync(List<IFormFile> imageFiles, string folderPath)
    {
        var uploadTasks = new List<Task<string>>();

        foreach (var imageFile in imageFiles)
        {
            var filePath = $"{folderPath}/{Path.GetFileName(imageFile.FileName)}";
            uploadTasks.Add(UploadImageAsync(imageFile, filePath));
        }

        var imageUrls = await Task.WhenAll(uploadTasks);
        return imageUrls;
    }

    public async Task<string> UploadImageAsync(IFormFile imageFile, string imagePath)
    {
        using var stream = new MemoryStream();
        await imageFile.CopyToAsync(stream);
        stream.Position = 0;

        var blob = await _storageClient.UploadObjectAsync(_bucketName, imagePath, imageFile.ContentType, stream, cancellationToken: CancellationToken.None);

        if (blob is null)
        {
            throw new Exception("Upload failed");
        }

        var folderName = Path.GetDirectoryName(imagePath)?.Replace("\\", "/") ?? string.Empty;
        var imageName = Path.GetFileName(imagePath);

        return GetImageUrl(folderName, imageName);
    }

    public async Task<string> UpdateImageAsync(IFormFile imageFile, string imagePath)
    {
        using var stream = new MemoryStream();
        await imageFile.CopyToAsync(stream);
        stream.Position = 0;

        var blob = await _storageClient.UploadObjectAsync(_bucketName, imagePath, imageFile.ContentType, stream, cancellationToken: CancellationToken.None);

        if (blob is null)
        {
            throw new Exception("Upload failed");
        }

        var folderName = Path.GetDirectoryName(imagePath)?.Replace("\\", "/") ?? string.Empty;
        var imageName = Path.GetFileName(imagePath);

        return GetImageUrl(folderName, imageName);
    }
}

