using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.WarrantyDocument;
using Application.ViewModels.WarrantyDocuments;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mapster;

namespace Application.Services.WarrantyDocuments
{
    public class WarrantyDocumentService : IWarrantyDocumentService
    {
        private readonly IUnitOfWork _unitOfWork;

        public WarrantyDocumentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ExportWarrantyDocument> GetExportWarrantyDocumentsAsync(int orderId)
        {
            return await _unitOfWork.WarrantyDocumentRepo.GetExportWarrantyDocumentsAsync(orderId);
        }
    }
}
