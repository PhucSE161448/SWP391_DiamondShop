using Application.IRepositories.Vouchers;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.Vouchers
{
    public class VoucherRepository :IVoucherRepository
    {
        private readonly SWP391_DiamondShopContext _dbContext;

        public VoucherRepository(SWP391_DiamondShopContext dbContext)
        {

            _dbContext = dbContext;

        }
        public async Task<IEnumerable<Voucher>> GetAllVoucherAsync()
        {
            return await _dbContext.Vouchers.ToListAsync();
        }        
        public async Task<Voucher> GetVoucherByIdAsync(int id)
        {
            return await _dbContext.Vouchers.FindAsync(id);
        }
        public async Task<Voucher> CreateVoucherAsync(Voucher voucher)
        {
            _dbContext.Vouchers.Add(voucher);
            await _dbContext.SaveChangesAsync();
            return voucher;
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
