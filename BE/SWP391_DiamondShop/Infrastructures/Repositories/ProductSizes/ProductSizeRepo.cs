using Application.Interfaces;
using Application.IRepositories.ProductSizes;
using Domain.Model;

namespace Infrastructures.Repositories.ProductSizes;

public class ProductSizeRepo : GenericRepository<ProductSize>, IProductSizeRepo
{
    private readonly SWP391_DiamondShopContext _dbContext;
    public ProductSizeRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) : base(context, timeService, claimsService)
    {
        _dbContext = context;
    }
}