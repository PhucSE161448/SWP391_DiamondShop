using Application.Interfaces;
using Application.IRepositories.Origins;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.Origins
{
    public class OriginRepo : GenericRepository<Origin>, IOriginRepo
    {
        public OriginRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) 
            : base(context, timeService, claimsService)
        {
        }
    }
}
