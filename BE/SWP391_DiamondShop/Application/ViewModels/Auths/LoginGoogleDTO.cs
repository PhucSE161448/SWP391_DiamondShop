using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels.Auths;

public class LoginGoogleDTO
{
    [Required]
    public string GoogleToken { get; set; }
}