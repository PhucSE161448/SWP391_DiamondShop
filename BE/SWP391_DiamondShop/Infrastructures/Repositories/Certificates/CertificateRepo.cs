using Application.Interfaces;
using Application.IRepositories.Certificates;
using Application.ViewModels.Certificates;
using Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Infrastructures.Repositories.Certificates;

public class CertificateRepo : GenericRepository<Certificate>, ICertificateRepo
{
    private readonly SWP391_DiamondShopContext _context;
    public CertificateRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService)
        : base(context, timeService, claimsService)
    {
        _context = context;
    }

    public async Task<ExportCertificate> GetCertificatesByOrderIdAsync(int orderId)
    {
        var exportCertificate = new ExportCertificate();

        var order = await _context.Orders
            .Include(o => o.OrderCarts)
            .ThenInclude(oc => oc.Cart)
            .ThenInclude(c => c.Diamond)
            .Include(o => o.OrderCarts)
            .ThenInclude(oc => oc.Cart)
            .ThenInclude(c => c.Product)
            .ThenInclude(p => p.ProductParts)
            .ThenInclude(pp => pp.Diamond)
            .ThenInclude(d => d.Certificate)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
        {
            return exportCertificate; // Return empty export certificate if order not found
        }

        foreach (var orderCart in order.OrderCarts)
        {
            Diamond? diamond = null;

            if (orderCart.Cart.ProductId.HasValue)
            {
                var productPart = orderCart.Cart.Product?.ProductParts
                    .FirstOrDefault(pp => pp.ProductId == orderCart.Cart.ProductId);

                if (productPart != null)
                {
                    diamond = productPart.Diamond;
                }
            }
            else if (orderCart.Cart.DiamondId.HasValue)
            {
                diamond = orderCart.Cart.Diamond;
            }

            if (diamond != null && diamond.Certificate != null)
            {
                var certificate = diamond.Certificate;
                if (exportCertificate.Certificates.Any(c => c.Id == certificate.Id))
                {
                    continue;
                }
                var certificateDTO = new GetCertificateDTO
                {
                    Id = certificate.Id,
                    ReportNumber = certificate.ReportNumber,
                    Origin = diamond.Origin,
                    Color = diamond.Color,
                    Clarity = diamond.Clarity,
                    Cut = diamond.Cut,
                    CaratWeight = diamond.CaratWeight,
                    DateOfIssue = certificate.DateOfIssue,
                    IsDeleted = certificate.IsDeleted
                };

                exportCertificate.Certificates.Add(certificateDTO);
            }
        }

        return exportCertificate;
    }

}