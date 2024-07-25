using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.VnPay
{
    public interface IVnPayService
    {
        Task<string> GetPaymentUrl(int orderId, int userId, int paymentId);
        Task<bool> Success(int userId, int orderId, int paymentId, string responseCode);
    }
}
