using Application.Interfaces.Authenticates;
using Application.ViewModels.Accounts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Application.ViewModels.Auths;
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
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> LoginGoogleAsync(LoginGoogleDTO loginGoogleDto)
        {
            var result = await _authenticationService.LoginWithGoogle(loginGoogleDto.GoogleToken);
            return Ok(result);
        }

        [HttpGet("{password}")]
        public async Task<IActionResult> CheckPasswordWithCurrentAccount(string password)
        {
            return Ok(await _authenticationService.CheckPassword(password));
        }

        [HttpPut]
        public async Task<IActionResult> ChangePasswordWithCurrentAccount([FromBody]UpdatePasswordDTO updatePasswordDto)
        {
            await _authenticationService.UpdatePassword(updatePasswordDto);
            return NoContent();
        }
    }
}

