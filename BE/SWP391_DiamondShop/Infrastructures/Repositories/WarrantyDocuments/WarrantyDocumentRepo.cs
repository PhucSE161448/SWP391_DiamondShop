using Application.Interfaces;
using Application.IRepositories.WarrantyDocuments;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.WarrantyDocuments
{
    public class WarrantyDocumentRepo : GenericRepository<WarrantyDocument>, IWarrantyDocumentRepo
    {
        public WarrantyDocumentRepo(SWP391_DiamondShopContext context, ICurrentTime timeService, IClaimsService claimsService) : base(context, timeService, claimsService)
        {
        }
    }
}
