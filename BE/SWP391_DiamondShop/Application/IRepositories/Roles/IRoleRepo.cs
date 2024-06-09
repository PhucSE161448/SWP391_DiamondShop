using Domain.Model;

namespace Application.IRepositories.Roles;

public interface IRoleRepo
{
    Task<List<Role>> GetAllAsync();
    Task<Role?> GetByIdAsync(int id);
}