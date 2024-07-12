using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels.Accounts;

public class UpdatePasswordDTO
{
    [Required]
    public string NewPassword { get; set; }
    [Required]
    public string RetypePassword { get; set; }
}