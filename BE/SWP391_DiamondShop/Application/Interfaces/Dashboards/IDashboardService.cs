using Application.ViewModels.Dashboards;

namespace Application.Interfaces.Dashboards;

public interface IDashboardService
{
    Task<DashboardStatsDTO> GetDashboardStats();
    Task<OrderStatisticDTO> GetOrderStatistic(int month, int year);
}