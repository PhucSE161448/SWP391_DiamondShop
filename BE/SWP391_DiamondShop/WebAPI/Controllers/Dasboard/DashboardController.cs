using Application.Interfaces.Dashboards;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Dasboard;

public class DashboardController : BaseController
{
    private readonly IDashboardService service;
    public DashboardController(IDashboardService _service)
    {
        service = _service;
    }
    
    [HttpGet("{month}/{year}")]
    public async Task<IActionResult> GetOrderStatistic(int month, int year)
    {
        var response = await service.GetOrderStatistic(month, year);
        return Ok(response);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetDashboardStats()
    {
        var response = await service.GetDashboardStats();
        return Ok(response);
    }
}