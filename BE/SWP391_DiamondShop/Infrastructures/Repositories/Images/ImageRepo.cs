using Application.Interfaces;
using Application.IRepositories.Images;
using Domain.Model;

namespace Infrastructures.Repositories.Images;

public class ImageRepo : GenericRepository<Image>, IImageRepo
{
    private readonly SWP391_DiamondShopContext _dbContext;

    public ImageRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) : base(context, timeService, claimsService)
    {
        this._dbContext = context;
    }
}