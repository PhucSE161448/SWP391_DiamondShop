using Application.Interfaces;
using Application.IRepositories.ProductParts;
using Domain.Model;

namespace Infrastructures.Repositories.ProductParts;

public class ProductPartRepo : GenericRepository<ProductPart>, IProductPartRepo
{
    private readonly SWP391_DiamondShopContext _dbContext;

    public ProductPartRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) : base(context, timeService, claimsService)
    {
        this._dbContext = context;
    }
}