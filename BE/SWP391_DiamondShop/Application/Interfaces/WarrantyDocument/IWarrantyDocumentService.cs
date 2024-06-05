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
        Task<IEnumerable<WarrantyDocumentDTO>> GetAllWarrantyDocumenttAsync();
        Task<WarrantyDocumentDTO> GetWarrantyDocumentAsync(int id);
        Task<WarrantyDocumentDTO> CreateWarrantyDocumentAsync(UpsertWarrantyDocumentDTO CreatedWarrantyDocumentDTO);
        Task<WarrantyDocumentDTO> UpdateWarrantyDocumentAsync(int id, UpsertWarrantyDocumentDTO warrantyDocumentDTO);
        Task DeleteWarrantyDocumentAsync(int id);
    }
}
