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
        Task<ServiceResponse<IEnumerable<WarrantyDocumentDTO>>> GetAllWarrantyDocumenttAsync();
        Task<ServiceResponse<WarrantyDocumentDTO>> GetWarrantyDocumentAsync(int id);
        Task<ServiceResponse<WarrantyDocumentDTO>> CreateWarrantyDocumentAsync(UpsertWarrantyDocumentDTO CreatedWarrantyDocumentDTO);
        Task<ServiceResponse<WarrantyDocumentDTO>> UpdateWarrantyDocumentAsync(int id, UpsertWarrantyDocumentDTO warrantyDocumentDTO);
        Task<ServiceResponse<bool>> DeleteWarrantyDocumentAsync(int id);
    }
}
