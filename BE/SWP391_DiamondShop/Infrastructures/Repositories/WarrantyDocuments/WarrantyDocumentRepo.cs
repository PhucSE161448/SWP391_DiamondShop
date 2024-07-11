using Application.Interfaces;
using Application.IRepositories.WarrantyDocuments;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Accounts;
using Application.ViewModels.Orders;
using Application.ViewModels.Products;
using Application.ViewModels.WarrantyDocuments;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using Mapster;

namespace Infrastructures.Repositories.WarrantyDocuments
{
    public class WarrantyDocumentRepo : IWarrantyDocumentRepo
    {
        private readonly SWP391_DiamondShopContext _context;
        public WarrantyDocumentRepo(SWP391_DiamondShopContext context)
        {
            _context = context;
        }

        public async Task<ExportWarrantyDocument> GetExportWarrantyDocumentsAsync(int orderId)
        {
            var order = _context.Orders
                .Include(o => o.Account)
                .Include(o => o.OrderCarts)
                .ThenInclude(oc => oc.WarrantyDocument)
                .Include(o => o.OrderCarts)
                .ThenInclude(oc => oc.Cart)
                .ThenInclude(c => c.Product)
                .Include(o => o.OrderCarts)
                .ThenInclude(oc => oc.Cart)
                .ThenInclude(c => c.Diamond)
                .FirstOrDefault(o => o.Id == orderId);

            var warrantyDocuments = order.OrderCarts
                .Select(oc => new WarrantyDocumentDTO
                {
                    Id = oc.WarrantyDocument!.Id,
                    Period = oc.WarrantyDocument.Period,
                    TermsAndConditions = oc.WarrantyDocument.TermsAndConditions,
                    IsDeleted = oc.WarrantyDocument.IsDeleted
                })
                .ToList();
            var product = order.OrderCarts.Select(oc => new GetOrderProduct
            {
                Name = oc.Cart.ProductId.HasValue ? oc.Cart.Product.Name : oc.Cart.Diamond.Name,
                Price = oc.Price
            }).ToList();
            return new ExportWarrantyDocument
            {
                WarrantyDocuments = warrantyDocuments,
                OrderProducts = product,
                Account = order.Account.Adapt<AccountDTO>()
            };
        }
    }
}
