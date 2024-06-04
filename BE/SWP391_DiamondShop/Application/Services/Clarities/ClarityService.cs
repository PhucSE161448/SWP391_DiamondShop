using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Clarity;
using Application.ViewModels.Clarities;
using Application.ViewModels.Cuts;
using AutoMapper;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Clarities
{
    public class ClarityService : IClarityService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ClarityService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ClarityDTO>> GetAllClarityAsync()
        {
            var Claritys = await _unitOfWork.ClarityRepo.GetAllAsync(x => x.IsDeleted == false);
            var ClarityDTOs = new List<ClarityDTO>();
            foreach (var pro in Claritys)
            {
                ClarityDTOs.Add(_mapper.Map<ClarityDTO>(pro));
            }
            return ClarityDTOs;
        }

        public async Task<ClarityDTO> GetClarityAsync(int id)
        {
            var Claritys = await _unitOfWork.ClarityRepo.GetAsync(x => x.Id == id);
            if (Claritys == null)
            {
                throw new NotFoundException("Clarity not found");
            }
            return _mapper.Map<ClarityDTO>(Claritys);
        }

        public async Task<ClarityDTO> CreateClarityAsync(UpsertClarityDTO CreatedClarityDTO)
        {
            var Clarity = _mapper.Map<Clarity>(CreatedClarityDTO);
            await _unitOfWork.ClarityRepo.AddAsync(Clarity);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<ClarityDTO>(Clarity);
        }

        public async Task DeleteClarityAsync(int id)
        {
            var exist = await _unitOfWork.ClarityRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Clarity not found");
            }
            if (exist.IsDeleted)
            {
                throw new BadRequestException("Clarity is already deleted");
            }
            _unitOfWork.ClarityRepo.SoftRemove(exist);
            await _unitOfWork.SaveChangeAsync();
        }

        public async Task<ClarityDTO> UpdateClarityAsync(int id, UpsertClarityDTO ClarityDTO)
        {
            var exist = await _unitOfWork.ClarityRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Clarity not found");
            }
            var Clarity = _mapper.Map(ClarityDTO, exist);
            _unitOfWork.ClarityRepo.Update(Clarity);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<ClarityDTO>(Clarity);
        }
    }
}
