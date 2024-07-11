using Application.Commons;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Authenticates;
using Application.Ultils;
using Application.ViewModels.Accounts;
using Application.ViewModels.Auths;
using Domain.Enums;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Oauth2.v2.Data;
using Mapster;
using Newtonsoft.Json.Linq;

namespace Application.Services.Authenticates
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentTime _currentTime;
        private readonly AppConfiguration _configuration;

        public AuthenticationService(IUnitOfWork unitOfWork,
            ICurrentTime currentTime,
            AppConfiguration configuration)
        {
            this._unitOfWork = unitOfWork;
            this._currentTime = currentTime;
            this._configuration = configuration;
        }
        public async Task<GetAuthTokenDTO> LoginAsync(AuthenAccountDTO accountDto)
        {
            var hashedPassword = HashPassword.HashWithSHA256(accountDto.Password!);
            var user = await _unitOfWork.AccountRepo.GetUserByEmailAndPasswordHash(
                accountDto.Email!,
                hashedPassword
            );
            if (user == null)
            {
                throw new BadRequestException("Invalid username or password");
            }
            if (user.IsDeleted == true)
            {
                throw new BadRequestException("Account is deleted");
            }
            var token = user.GenerateJsonWebToken(
                    _configuration,
                    _configuration.JWTSection.SecretKey,
                    _currentTime.GetCurrentTime()
                );
            return new GetAuthTokenDTO { AccessToken = token };
        }

        public async Task<GetAuthTokenDTO> LoginWithGoogle(string googleToken)
        {
            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync("https://oauth2.googleapis.com/tokeninfo?id_token=" + googleToken);
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                var userInfoJson = JObject.Parse(json);
                var userInfo = new Userinfo
                {
                    Id = userInfoJson["sub"]?.ToString(),
                    Email = userInfoJson["email"]?.ToString(),
                    Name = userInfoJson["name"]?.ToString(),
                };
                var existAccount = await _unitOfWork.AccountRepo.GetAsync(x => x.Email == userInfo.Email);
                if (existAccount is not null)
                    return new GetAuthTokenDTO()
                    {
                        AccessToken = existAccount.GenerateJsonWebToken(
                            _configuration,
                            _configuration.JWTSection.SecretKey,
                            _currentTime.GetCurrentTime())
                    };
                var newAccount = new Account
                {
                    Email = userInfo.Email!,
                    Name = userInfo.Name!,
                    RoleId = (int)Roles.Customer,
                    Point = 0
                };
                await _unitOfWork.AccountRepo.AddAsync(newAccount);
                await _unitOfWork.SaveChangeAsync();
                return new GetAuthTokenDTO()
                {
                    AccessToken = newAccount.GenerateJsonWebToken(
                        _configuration,
                        _configuration.JWTSection.SecretKey,
                        _currentTime.GetCurrentTime())
                };
            }

            return new GetAuthTokenDTO()
            {
                AccessToken = null
            };
        }

        public async Task<AccountDTO> RegisterAsync(RegisterAccountDTO registerAccountDTO)
        {
            var exist = await _unitOfWork.AccountRepo.CheckEmailNameExited(registerAccountDTO.Email);
            if (exist)
            {
                throw new NotFoundException("Email is existed");
            }
            var account = registerAccountDTO.Adapt<Account>();
            account.Password = HashPassword.HashWithSHA256(
                registerAccountDTO.Password!
            );
            account.ConfirmationToken = Guid.NewGuid().ToString();
            account.RoleId = (int)Roles.Customer;
            await _unitOfWork.AccountRepo.AddAsync(account);
            await _unitOfWork.SaveChangeAsync();
            return account.Adapt<AccountDTO>();
        }
        
    }
}

