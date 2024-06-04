using Application.Interfaces.Authenticates;
using Application.ViewModels.Accounts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WebAPI.CustomActionFilter;

namespace WebAPI.Controllers
{
    public class AuthenticationController : BaseController
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> RegisterAsync(RegisterAccountDTO registerObject)
        {
            var result = await _authenticationService.RegisterAsync(registerObject);

            return Ok(result);
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> LoginAsync(AuthenAccountDTO loginObject)
        {
            var result = await _authenticationService.LoginAsync(loginObject);

            return Ok(result);
        }
    }
}

