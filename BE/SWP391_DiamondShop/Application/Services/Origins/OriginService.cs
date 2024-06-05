using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Origin;
using Application.ViewModels.Cuts;
using Application.ViewModels.Origins;
using AutoMapper;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Origins
{
    public class OriginService : IOriginService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OriginService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<IEnumerable<OriginDTO>> GetAllOriginAsync()
        {
            var Origins = await _unitOfWork.OriginRepo.GetAllAsync(x => x.IsDeleted == false);
            var OriginDTOs = new List<OriginDTO>();
            foreach (var pro in Origins)
            {
                OriginDTOs.Add(_mapper.Map<OriginDTO>(pro));
            }
            return OriginDTOs;
        }

        public async Task<OriginDTO> GetOriginAsync(int id)
        {
            var Origins = await _unitOfWork.OriginRepo.GetAsync(x => x.Id == id);
            if (Origins == null)
            {
                throw new NotFoundException("Origin not found");
            }
            return _mapper.Map<OriginDTO>(Origins);
        }
        public async Task<OriginDTO> CreateOriginAsync(UpsertOriginDTO CreatedOriginDTO)
        {
            var Origin = _mapper.Map<Origin>(CreatedOriginDTO);
            await _unitOfWork.OriginRepo.AddAsync(Origin);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<OriginDTO>(Origin);
            
        }

        public async Task DeleteOriginAsync(int id)
        {
            var exist = await _unitOfWork.OriginRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Origin not found");
            }
            if (exist.IsDeleted)
            {
                throw new BadRequestException("Origin is already deleted");
            }
            _unitOfWork.OriginRepo.SoftRemove(exist);
            await _unitOfWork.SaveChangeAsync();
        }



        public async Task<OriginDTO> UpdateOriginAsync(int id, UpsertOriginDTO OriginDTO)
        {
            var exist = await _unitOfWork.OriginRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Origin not found");
            }
            var Origin = _mapper.Map(OriginDTO, exist);
            _unitOfWork.OriginRepo.Update(Origin);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<OriginDTO>(Origin);
        }
    }
}
