using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IRepositories.Promotions
{
    public interface IPromotionRepository
    {
        Task<IEnumerable<Promotion>> GetAllVoucherAsync();
        Task<Promotion> GetVoucherByIdAsync(int id);
        Task<Promotion> CreatePromotionAsync(Promotion promotion);
        Task<bool> DeleteVoucherAsync(int id);
    }
}
