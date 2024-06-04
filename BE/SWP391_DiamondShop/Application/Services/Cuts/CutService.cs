using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Cut;
using Application.ViewModels.Cuts;
using AutoMapper;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Cuts
{
    public class CutService : ICutService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CutService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<IEnumerable<CutDTO>> GetAllCutAsync()
        {
            var Cuts = await _unitOfWork.CutRepo.GetAllAsync(x => x.IsDeleted == false);
            var CutDTOs = new List<CutDTO>();
            foreach (var pro in Cuts)
            {
                CutDTOs.Add(_mapper.Map<CutDTO>(pro));
            }
            return CutDTOs;
            
        }

        public async Task<CutDTO> GetCutAsync(int id)
        {
            var Cuts = await _unitOfWork.CutRepo.GetAsync(x => x.Id == id);
            if (Cuts == null)
            {
                throw new NotFoundException("Cut not found");
            }
            return _mapper.Map<CutDTO>(Cuts);
        }
        public async Task<CutDTO> CreateCutAsync(UpsertCutDTO CreatedCutDTO)
        {
            var Cut = _mapper.Map<Cut>(CreatedCutDTO);
            await _unitOfWork.CutRepo.AddAsync(Cut);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<CutDTO>(Cut);
        }

        public async Task DeleteCutAsync(int id)
        {
            var exist = await _unitOfWork.CutRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Category not found");
            }
            if (exist.IsDeleted)
            {
                throw new BadRequestException("Cut is already deleted");
            }
            _unitOfWork.CutRepo.SoftRemove(exist);
            await _unitOfWork.SaveChangeAsync();
            
        }



        public async Task<CutDTO> UpdateCutAsync(int id, UpsertCutDTO CutDTO)
        {
            var exist = await _unitOfWork.CutRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Category not found");
            }
            var Cut = _mapper.Map(CutDTO, exist);
            _unitOfWork.CutRepo.Update(Cut);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<CutDTO>(Cut);
        }
    }
}
