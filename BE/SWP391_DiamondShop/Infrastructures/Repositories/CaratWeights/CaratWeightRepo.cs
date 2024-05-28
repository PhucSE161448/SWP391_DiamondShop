using Application.Interfaces;
using Application.IRepositories.CaratWeights;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.CaratWeights
{
    public class CaratWeightRepo : GenericRepository<CaratWeight>, ICaratWeightRepo
    {
        public CaratWeightRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) 
            : base(context, timeService, claimsService)
        {
        }
    }
}
