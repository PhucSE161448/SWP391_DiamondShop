using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.WarrantyDocuments;

namespace Application.IRepositories.WarrantyDocuments
{
    public interface IWarrantyDocumentRepo 
    {
        Task<ExportWarrantyDocument> GetExportWarrantyDocumentsAsync(int orderId);
    }
}
