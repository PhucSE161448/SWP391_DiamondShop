using Application.Interfaces;
using Application.IRepositories.Categories;
using Domain.Model;

namespace Infrastructures.Repositories.Categories;

public class CategoryRepo : GenericRepository<Category>, ICategoryRepo
{
    public CategoryRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) 
        : base(context, timeService, claimsService)
    {
    }
}