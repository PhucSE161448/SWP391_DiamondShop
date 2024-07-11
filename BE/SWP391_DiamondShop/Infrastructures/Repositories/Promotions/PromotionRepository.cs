using Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.Promotions
{
    public class PromotionRepository
    {
        private readonly SWP391_DiamondShopContext _dbContext;

        public PromotionRepository(SWP391_DiamondShopContext dbContext)
        {

            _dbContext = dbContext;

        }
        public async Task<IEnumerable<Promotion>> GetAllVoucherAsync()
        {
            return await _dbContext.Promotions.ToListAsync();
        }
        public async Task<Promotion> GetVoucherByIdAsync(int id)
        {
            return await _dbContext.Promotions.FindAsync(id);
        }
        public async Task<Promotion> CreatePromotionAsync(Promotion promotion)
        {
            _dbContext.Promotions.Add(promotion);
            await _dbContext.SaveChangesAsync();
            return promotion;
        }

        public async Task<bool> DeleteVoucherAsync(int id)
        {
            var voucher = await _dbContext.Vouchers.FindAsync(id);
            if (voucher == null)
            {
                return false;
            }
            _dbContext.Vouchers.Remove(voucher);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
