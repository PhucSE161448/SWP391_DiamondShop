using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.DiamondCases;
using Application.ViewModels.DiamondCases;
using Domain.Model;
using Mapster;

namespace Application.Services.DiamondCases;

public class DiamondCaseService : IDiamondCaseService
{
    private readonly IUnitOfWork _unitOfWork;

    public DiamondCaseService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<GetDiamondCaseDetailDTO> AddDiamondCase(CreateDiamondCaseDTO createDiamondCaseDto)
    {
        var diamondCase = createDiamondCaseDto.Adapt<DiamondCase>();
        await _unitOfWork.DiamondCaseRepo.AddAsync(diamondCase);
        await _unitOfWork.SaveChangeAsync();
        return diamondCase.Adapt<GetDiamondCaseDetailDTO>();
    }

    public async Task<GetDiamondCaseDetailDTO?> GetDiamondCaseById(int id)
    {
        var diamondCase = await _unitOfWork.DiamondCaseRepo.GetAsync(x => x.Id == id);
        if (diamondCase is null)
        {
            throw new NotFoundException("Diamond Case is not existed");
        }

        return diamondCase.Adapt<GetDiamondCaseDetailDTO>();
    }

    public async Task UpdateDiamondCase(int id, UpdateDiamondCaseDTO updateDiamondCaseDto)
    {
        var diamondCase = await _unitOfWork.DiamondCaseRepo.GetByIdAsync(id);
        if (diamondCase is null)
        {
            throw new NotFoundException("Diamond Case is not existed");
        }
        _unitOfWork.DiamondCaseRepo.Update(updateDiamondCaseDto.Adapt(diamondCase));
        await _unitOfWork.SaveChangeAsync();
    }

    public async Task<List<GetDiamondCaseDetailDTO>> GetAllDiamondCases()
    {
        var diamondCases = await _unitOfWork.DiamondCaseRepo.GetAllAsync();
        return diamondCases.Adapt<List<GetDiamondCaseDetailDTO>>();
    }

    public async Task DeleteOrEnable(int diamondCaseId, bool isDeleted)
    {
        var diamondCase = await _unitOfWork.DiamondCaseRepo.GetAsync(d => d.Id == diamondCaseId);
        if (diamondCase is null)
        {
            throw new NotFoundException("Diamond Case is not existed");
        }
        diamondCase.IsDeleted = isDeleted;
        await _unitOfWork.SaveChangeAsync();
    }
}