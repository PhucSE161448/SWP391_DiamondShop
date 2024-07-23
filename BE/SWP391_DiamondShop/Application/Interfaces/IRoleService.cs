using Application.ViewModels.Roles;

namespace Application.Interfaces;

public interface IRoleService
{
    Task<List<RoleDTO>> GetAllRoles();
}