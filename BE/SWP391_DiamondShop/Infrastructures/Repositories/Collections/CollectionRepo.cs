using Application.Interfaces;
using Application.IRepositories.Collections;
using Domain.Model;

namespace Infrastructures.Repositories.Collections;

public class CollectionRepo : GenericRepository<Collection>, ICollectionRepo
{
    public CollectionRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) 
        : base(context, timeService, claimsService)
    {
    }
}