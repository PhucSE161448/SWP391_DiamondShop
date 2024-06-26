using Application.ViewModels.DiamondCases;

namespace Application.Interfaces.DiamondCases;

public interface IDiamondCaseService
{
    Task<GetDiamondCaseDetailDTO> AddDiamondCase(CreateDiamondCaseDTO createDiamondCaseDto);
    Task<GetDiamondCaseDetailDTO?> GetDiamondCaseById(int id);
    Task UpdateDiamondCase(int id, UpdateDiamondCaseDTO updateDiamondCaseDto);
    Task<List<GetDiamondCaseDetailDTO>> GetAllDiamondCases();
    
    Task DeleteOrEnable(int diamondCaseId, bool isDeleted);
}