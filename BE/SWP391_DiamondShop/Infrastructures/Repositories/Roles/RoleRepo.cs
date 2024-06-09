using Application.Interfaces;
using Application.IRepositories.Roles;
using Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Infrastructures.Repositories.Roles;

public class RoleRepo : IRoleRepo
{
    private readonly SWP391_DiamondShopContext _dbContext;

    public RoleRepo(SWP391_DiamondShopContext context)
    {
        this._dbContext = context;
    }

    public async Task<List<Role>> GetAllAsync()
    {
        return await _dbContext.Roles.ToListAsync();
    }

    public async Task<Role?> GetByIdAsync(int id)
    {
        return await _dbContext.Roles.SingleOrDefaultAsync(x => x.Id == id);
    }
}