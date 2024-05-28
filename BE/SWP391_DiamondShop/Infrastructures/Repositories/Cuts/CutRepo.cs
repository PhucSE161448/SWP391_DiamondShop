using Application.Interfaces;
using Application.IRepositories.Cut;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.Cuts
{
    public class CutRepo : GenericRepository<Cut>, ICutRepo
    {
        public CutRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService)
            : base(context, timeService, claimsService)
        {
        }
    }
}
