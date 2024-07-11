using Application.Services;
using Application.ViewModels.Accounts;
using Application.ViewModels.Auths;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Authenticates
{
    public interface IAuthenticationService
    {
        public Task<AccountDTO> RegisterAsync(RegisterAccountDTO registerAccountDTO);
        public Task<GetAuthTokenDTO> LoginAsync(AuthenAccountDTO accountDto);

        Task<GetAuthTokenDTO> LoginWithGoogle(string googleToke);
    }
}
