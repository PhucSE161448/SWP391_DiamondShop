using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IRepositories.Vouchers
{
    public interface IVoucherRepository
    {
        Task<IEnumerable<Voucher>> GetAllVoucherAsync();
        Task<Voucher> GetVoucherByIdAsync(int id);
        Task<Voucher> CreateVoucherAsync(Voucher voucher);
        Task<bool> DeleteVoucherAsync(int id);
    }
}
