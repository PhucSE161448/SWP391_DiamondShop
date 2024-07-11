using Application.Services;
using Application.ViewModels.WarrantyDocuments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.WarrantyDocument
{
    public interface IWarrantyDocumentService
    {
        Task<ExportWarrantyDocument> GetExportWarrantyDocumentsAsync(int orderId);
    }
}
