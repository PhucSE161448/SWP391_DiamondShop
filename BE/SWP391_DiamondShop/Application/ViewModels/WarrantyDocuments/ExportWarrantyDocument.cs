using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Accounts;
using Application.ViewModels.Orders;
using Application.ViewModels.Products;

namespace Application.ViewModels.WarrantyDocuments
{
    public class ExportWarrantyDocument
    {
        public List<WarrantyDocumentDTO> WarrantyDocuments { get; set; }
        public List<GetOrderProduct> OrderProducts { get; set; }
        public AccountDTO Account { get; set; }
    }
}
