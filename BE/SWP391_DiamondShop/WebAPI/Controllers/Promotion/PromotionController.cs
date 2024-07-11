using Application.Interfaces.Promotions;
using Application.ViewModels.Promotions;
using Application.ViewModels.Vouchers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Promotion
{

    public class PromotionController : BaseController
    {
        private readonly IPromotionService _promotionService;
        public PromotionController(IPromotionService promotionService)
        {
            _promotionService = promotionService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePromotion([FromForm] CreatePromotionDTO createPromotionDTO)
        {
            return Created(nameof(CreatePromotion), await _promotionService.CreatePromotionAsync(createPromotionDTO));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPromotionById(int id)
        {
            var response = await _promotionService.GetPromotionByIdAsync(id);
            return Ok(response);

        }
        [HttpGet]
        public async Task<IActionResult> GetAllPromotion()
        {
            var response = await _promotionService.GetAllPromotionAsync();
            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            var isSuccess = await _promotionService.DeletePromotionAsync(id);

            return Ok(isSuccess);
        }
    }
}
