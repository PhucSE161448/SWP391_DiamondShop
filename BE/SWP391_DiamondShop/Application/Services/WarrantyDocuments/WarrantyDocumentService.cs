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
            this._unitOfWork = unitOfWork;
        }
        public async Task<WarrantyDocumentDTO> CreateWarrantyDocumentAsync(UpsertWarrantyDocumentDTO CreatedWarrantyDocumentDTO)
        {
            var warranty = CreatedWarrantyDocumentDTO.Adapt<WarrantyDocument>();
            await _unitOfWork.WarrantyDocumentRepo.AddAsync(warranty);
            await _unitOfWork.SaveChangeAsync();
            return warranty.Adapt<WarrantyDocumentDTO>();
        }

        public async Task DeleteWarrantyDocumentAsync(int id)
        {
            var exist = await _unitOfWork.WarrantyDocumentRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("WarrantyDocument not found");
            }
            if (exist.IsDeleted)
            {
                throw new BadRequestException("WarrantyDocument is already deleted");
            }
            _unitOfWork.WarrantyDocumentRepo.SoftRemove(exist);
            await _unitOfWork.SaveChangeAsync();
        }

        public async Task<IEnumerable<WarrantyDocumentDTO>> GetAllWarrantyDocumenttAsync()
        {
            var warrantyDocuments = await _unitOfWork.WarrantyDocumentRepo.GetAllAsync(x => x.IsDeleted == false);
            return warrantyDocuments.Adapt<List<WarrantyDocumentDTO>>();
        }

        public async Task<WarrantyDocumentDTO> GetWarrantyDocumentAsync(int id)
        {
            var warrantyDocument = await _unitOfWork.WarrantyDocumentRepo.GetAsync(x => x.Id == id);
            if (warrantyDocument == null)
            {
                throw new NotFoundException("WarrantyDocument not found");
            }
            return warrantyDocument.Adapt<WarrantyDocumentDTO>();
        }

        public async Task<WarrantyDocumentDTO> UpdateWarrantyDocumentAsync(int id, UpsertWarrantyDocumentDTO warrantyDocumentDTO)
        {
            var exist = await _unitOfWork.WarrantyDocumentRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("WarrantyDocument not found");
            }
            var warrantyDocument = warrantyDocumentDTO.Adapt(exist);
            _unitOfWork.WarrantyDocumentRepo.Update(warrantyDocument);
            await _unitOfWork.SaveChangeAsync();
            return warrantyDocument.Adapt<WarrantyDocumentDTO>();
        }
    }
}
