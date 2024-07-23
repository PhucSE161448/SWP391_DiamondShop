using Application.Interfaces;
using Application.ViewModels.Roles;
using Domain.Model;
using Mapster;

namespace Application.Services;

public class RoleService : IRoleService
{
    private readonly IUnitOfWork _unitOfWork;
    public RoleService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<List<RoleDTO>> GetAllRoles()
    {
        return (await _unitOfWork.RoleRepo.GetAllAsync()).Adapt<List<RoleDTO>>();
    }
}