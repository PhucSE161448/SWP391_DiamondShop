using Application.Interfaces;
using Application.IRepositories.DiamondCases;
using Domain.Model;

namespace Infrastructures.Repositories.DiamondCases;

public class DiamondCaseRepo : GenericRepository<DiamondCase>, IDiamondCaseRepo
{
    public DiamondCaseRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) : base(context, timeService, claimsService)
    {
    }
}