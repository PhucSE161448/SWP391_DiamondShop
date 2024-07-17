using Application.ViewModels.Promotions;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Promotions
{
    public interface IPromotionService
    {
        Task<IEnumerable<PromotionDTO>> GetAllPromotionAsync();
        Task<PromotionDTO> GetPromotionByIdAsync(int id);
        Task<bool> DeletePromotionAsync(int id);
        Task<CreatePromotionDTO> CreatePromotionAsync(CreatePromotionDTO createPromotionDTO);
        decimal DiscountFromPoint(decimal price, int point);
        int GetPromotionIdFromPoint(int point);
        Task<float> GetDiscountPercentageForUser(int userId);
    }
}
