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
        Task<IEnumerable<Promotion>> GetAllPromotionAsync();
        Task<Promotion> GetPromotionByIdAsync(int id);
        Task<bool> DeletePromotionAsync(int id);
        Task<Promotion> CreatePromotionAsync(CreatePromotionDTO createPromotionDTO);
    }
}
