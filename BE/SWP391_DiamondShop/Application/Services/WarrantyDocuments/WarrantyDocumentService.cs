using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.WarrantyDocument;
using Application.ViewModels.CaratWeights;
using Application.ViewModels.WarrantyDocuments;
using AutoMapper;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.WarrantyDocuments
{
    public class WarrantyDocumentService : IWarrantyDocumentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public WarrantyDocumentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }
        public async Task<WarrantyDocumentDTO> CreateWarrantyDocumentAsync(UpsertWarrantyDocumentDTO CreatedWarrantyDocumentDTO)
        {
            var warranty = _mapper.Map<WarrantyDocument>(CreatedWarrantyDocumentDTO);
            await _unitOfWork.WarrantyDocumentRepo.AddAsync(warranty);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<WarrantyDocumentDTO>(warranty);
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
            var warrantyDocumentDTOS = new List<WarrantyDocumentDTO>();
            foreach (var pro in warrantyDocuments)
            {
                warrantyDocumentDTOS.Add(_mapper.Map<WarrantyDocumentDTO>(pro));
            }
            return warrantyDocumentDTOS;
        }

        public async Task<WarrantyDocumentDTO> GetWarrantyDocumentAsync(int id)
        {
            var warrantyDocument = await _unitOfWork.WarrantyDocumentRepo.GetAsync(x => x.Id == id);
            if (warrantyDocument == null)
            {
                throw new NotFoundException("WarrantyDocument not found");
            }
            return _mapper.Map<WarrantyDocumentDTO>(warrantyDocument);
        }

        public async Task<WarrantyDocumentDTO> UpdateWarrantyDocumentAsync(int id, UpsertWarrantyDocumentDTO warrantyDocumentDTO)
        {
            var exist = await _unitOfWork.WarrantyDocumentRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("WarrantyDocument not found");
            }
            var warrantyDocument = _mapper.Map(warrantyDocumentDTO, exist);
            _unitOfWork.WarrantyDocumentRepo.Update(warrantyDocument);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<WarrantyDocumentDTO>(warrantyDocument);
        }
    }
}
