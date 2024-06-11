using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

public class ImageController : BaseController
{
    private readonly IFirebaseStorageService _service;
    public ImageController(IFirebaseStorageService service)
    {
        _service = service;
    }
    // [HttpPost("test-upload")]
    // public async Task<ActionResult> TestUpload(IFormFile file)
    // {
    //
    //     return Created(nameof(TestUpload), await _service.UploadImageAsync(file));
    // }
    
}