using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Payments;

namespace Application.Interfaces.Payments
{
    public interface IPaymentService
    {
        Task<PaymentDTO> AddPayment(AddPaymentDTO addPaymentDto);
        Task<PaymentDTO?> GetPaymentById(int id);
        Task<PaymentDTO> UpdatePayment(int id, UpdatePaymentDTO updatePaymentDto);
        Task<List<PaymentDTO>> GetAllPayment();

        Task DeleteOrEnable(int paymentId, bool isDeleted);
    }
}
