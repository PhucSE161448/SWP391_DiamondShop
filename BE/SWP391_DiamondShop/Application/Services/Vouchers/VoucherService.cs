using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Vouchers;
using Application.ViewModels.Vouchers;
using Domain.Model;
using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Vouchers
{
    public class VoucherService : IVoucherService
    {
        private readonly IUnitOfWork _unitOfWork;

        public VoucherService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;        
        }
        public async Task<IEnumerable<Voucher>> GetAllVoucherAsync()
        {
            return await _unitOfWork.VoucherRepository.GetAllVoucherAsync();
        }
        public async Task<Voucher> GetVoucherByIdAsync(int id)
        {
            var voucher = await _unitOfWork.VoucherRepository.GetVoucherByIdAsync(id);
            if(voucher == null)
            {
                throw new NotFoundException("Id không tồn tại trong hệ thống");
            }
            return voucher;
        }
        public async Task<bool> DeleteVoucherAsync(int id)
        {
            var getVoucherToDelete = await _unitOfWork.VoucherRepository.DeleteVoucherAsync(id);
            if (getVoucherToDelete)
            {
                return true;
            }
            else
            {
                throw new NotFoundException("Voucher không tồn tại");
            }
        }
        public async Task<GetVoucherIdDTO> CreateVoucherAsync(CreateVoucherDTO createVoucherDTO)
        {
            var newVoucher = createVoucherDTO.Adapt<Voucher>();
            await _unitOfWork.VoucherRepository.CreateVoucherAsync(newVoucher);
            return new GetVoucherIdDTO { Id = newVoucher.Id};
        }
    }
}
