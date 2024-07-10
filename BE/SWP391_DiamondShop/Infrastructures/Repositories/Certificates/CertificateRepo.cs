using Application.Interfaces;
using Application.IRepositories.Certificates;
using Domain.Model;

namespace Infrastructures.Repositories.Certificates;

public class CertificateRepo : GenericRepository<Certificate>, ICertificateRepo
{
    public CertificateRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) 
        : base(context, timeService, claimsService)
    {
    }
}