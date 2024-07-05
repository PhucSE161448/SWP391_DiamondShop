using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.IRepositories;
using Application.IRepositories.Payments;
using Domain.Model;

namespace Infrastructures.Repositories.Payments
{
    public class PaymentRepo : GenericRepository<Payment>, IPaymentRepo
    {
        public PaymentRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService)
            : base(context, timeService, claimsService)
        {
        }
    }
}
