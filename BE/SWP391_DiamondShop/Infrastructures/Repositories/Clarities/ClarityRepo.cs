using Application.Interfaces;
using Application.IRepositories.Clarity;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.Clarities
{
    public class ClarityRepo : GenericRepository<Clarity>, IClarityRepo
    {
        public ClarityRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) 
            : base(context, timeService, claimsService)
        {
        }
    }
}
