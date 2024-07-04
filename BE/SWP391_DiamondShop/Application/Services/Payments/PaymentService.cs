using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Payments;
using Application.ViewModels.Categories;
using Application.ViewModels;
using Application.ViewModels.Payments;
using Domain.Model;
using Mapster;

namespace Application.Services.Payments
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork _unitOfWork;

        public PaymentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<PaymentDTO> AddPayment(AddPaymentDTO addPaymentDto)
        {
            var payment = addPaymentDto.Adapt<Payment>();
            payment.PaymentType = "Online";
            await _unitOfWork.PaymentRepo.AddAsync(payment);
            await _unitOfWork.SaveChangeAsync();
            return payment.Adapt<PaymentDTO>();
        }

        public async Task<PaymentDTO?> GetPaymentById(int id)
        {
            var payment = await _unitOfWork.PaymentRepo.GetAsync(x => x.Id == id);
            if (payment is null)
            {
                throw new NotFoundException("Payment is not existed");
            }

            return payment.Adapt<PaymentDTO>();
        }

        public async Task<PaymentDTO> UpdatePayment(int id, UpdatePaymentDTO updatePaymentDto)
        {
            var payment = await _unitOfWork.PaymentRepo.GetByIdAsync(id);
            if (payment is null)
            {
                throw new NotFoundException("Payment is not existed");
            }
            _unitOfWork.PaymentRepo.Update(updatePaymentDto.Adapt(payment));
            await _unitOfWork.SaveChangeAsync();
            return payment.Adapt<PaymentDTO>();
        }


        public async Task<List<PaymentDTO>> GetAllPayment()
        {
            var categories = await _unitOfWork.PaymentRepo.GetAllAsync();
            return categories.Adapt<List<PaymentDTO>>();
        }

        public async Task DeleteOrEnable(int paymentId, bool isDeleted)
        {
            var payment = await _unitOfWork.PaymentRepo.GetAsync(d => d.Id == paymentId);
            if (payment is null)
            {
                throw new NotFoundException("Payment is not existed");
            }
            payment.IsDeleted = isDeleted;
            await _unitOfWork.SaveChangeAsync();
        }
    }
}
