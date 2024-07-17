namespace Application.ViewModels.Dashboards;

public class OrderStatisticDTO
{
    public int TotalOrders { get; set; }
    public decimal TotalRevenue { get; set; }
    public decimal AverageOrderValue { get; set; }
}