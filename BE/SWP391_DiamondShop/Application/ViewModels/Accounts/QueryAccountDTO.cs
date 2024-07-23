namespace Application.ViewModels.Accounts;

public class QueryAccountDTO
{
    public QueryDTO QueryDTO { get; set; } = new QueryDTO();
    public string? Name { get; set; }
    public int? RoleId { get; set; }
    public string? Email { get; set; }
    
}