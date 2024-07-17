using Application.Interfaces;
using Application.Interfaces.Dashboards;
using Application.ViewModels.Dashboards;

namespace Application.Services.DashBoards;

public class DashboardService : IDashboardService
{
    private readonly IUnitOfWork _unitOfWork;

    public DashboardService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<DashboardStatsDTO> GetDashboardStats()
    {
        var diamond = await _unitOfWork.DiamondRepo.GetAllAsync();
        var product = await _unitOfWork.ProductRepo.GetAllAsync();
        var getListOrder = await _unitOfWork.OrderRepo.GetOrderAsync();
        var profit = getListOrder.Where(order => order.Status == "Finished").Sum(order => order.TotalPrice);
        return new DashboardStatsDTO
        {
            NumberOfDiamonds = diamond.Count,
            NumberOfProducts = product.Count,
            TotalRevenue = profit,
            Profit =  profit / 1.2m
        };
    }

    public async Task<OrderStatisticDTO> GetOrderStatistic(int month, int year)
    {
        var orders = await _unitOfWork.OrderRepo.GetOrderAsync();
        orders = orders.Where(o => o.Status == "Finished" && o.CreatedDate!.Value.Year == year).ToList();
        if (month != 0 && month is >= 1 and <= 12)
        {
            orders = orders.Where(o => o.CreatedDate!.Value.Month == month).ToList();
        }

        var totalOrders = orders.Count;
        var totalRevenue = orders.Sum(o => o.TotalPrice);
        return new OrderStatisticDTO
        {
            TotalRevenue = totalRevenue,
            TotalOrders = totalOrders,
            AverageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
        };
    }
}