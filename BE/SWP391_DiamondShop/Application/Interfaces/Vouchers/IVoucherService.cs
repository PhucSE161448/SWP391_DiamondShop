using Application.ViewModels.Vouchers;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Vouchers
{
    public interface IVoucherService
    {
        Task<GetVoucherIdDTO> CreateVoucherAsync(CreateVoucherDTO createVoucherDTO);
        Task<bool> DeleteVoucherAsync(int id);
        Task<Voucher> GetVoucherByIdAsync(int id);
        Task<IEnumerable<Voucher>> GetAllVoucherAsync();
    }
}
