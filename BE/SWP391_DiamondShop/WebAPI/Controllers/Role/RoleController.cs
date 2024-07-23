using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Role;

public class RoleController : BaseController
{
    private readonly IRoleService service;
    public RoleController(IRoleService _service)
    {
        service = _service;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllRoles()
    {
        return Ok(await service.GetAllRoles());
    }
}