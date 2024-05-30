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
        [HttpPost("register")]
        [ValidateModel]
        public async Task<IActionResult> RegisterAsync(RegisterAccountDTO registerObject)
        {
            var result = await _authenticationService.RegisterAsync(registerObject);

            if (!result.Success)
            {
                return BadRequest(result);
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost("login")]
        [ValidateModel]
        public async Task<IActionResult> LoginAsync(AuthenAccountDTO loginObject)
        {
            var result = await _authenticationService.LoginAsync(loginObject);

            if (!result.Success)
            {
                return BadRequest(result);
            }
            else
            {
                return Ok(
                    new
                    {
                        success = result.Success,
                        message = result.Message,
                        token = result.Data
                    }
                );
            }
        }
    }
}

