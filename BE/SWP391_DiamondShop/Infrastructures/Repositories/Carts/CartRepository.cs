using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.IRepositories.Carts;
using Domain.Model;

namespace Infrastructures.Repositories.Carts
{
    public class CartRepository : GenericRepository<Cart>, ICartRepository
    {
        private readonly SWP391_DiamondShopContext _dbContext;

        public CartRepository(
            SWP391_DiamondShopContext context,
            ICurrentTime timeService,
            IClaimsService claimsService
        )
            : base(context, timeService, claimsService)
        {
            _dbContext = context;
        }
    }
}
