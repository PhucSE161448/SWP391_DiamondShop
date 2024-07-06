using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.IRepositories.Groups;
using Domain.Model;


namespace Infrastructures.Repositories.Groups
{
    public class GroupRepo : GenericRepository<Group>, IGroupRepo
    {
        public GroupRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService)
            : base(context, timeService, claimsService)
        {
        }
    }
}
