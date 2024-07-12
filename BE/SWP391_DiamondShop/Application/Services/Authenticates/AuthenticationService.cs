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
        private readonly IClaimsService _claimsService;

        public AuthenticationService(IUnitOfWork unitOfWork,
            ICurrentTime currentTime,
            AppConfiguration configuration, IClaimsService claimsService)
        {
            this._unitOfWork = unitOfWork;
            this._currentTime = currentTime;
            this._configuration = configuration;
            _claimsService = claimsService;
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
            if (user.IsConfirmed == false)
            {
                throw new BadRequestException("Please confirm via link in your email box. If you don't see please check the folder Spam in Mail");
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
                    Point = 0,
                    IsConfirmed = true
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
            var confirmationLink = $"https://diamond-shopp.azurewebsites.net/swagger/confirm?token={account.ConfirmationToken}";
            var emailSent = await SendEmail.SendConfirmationEmail(account.Email, confirmationLink);

            if (!emailSent)
            {
                throw new BadRequestException("Error sending confirmation email.");
            }

            await _unitOfWork.SaveChangeAsync();
            return account.Adapt<AccountDTO>();
        }
        
        public async Task<bool> CheckPassword(string password)
        {
            var account = await _unitOfWork.AccountRepo.GetAsync(x => x.Id == _claimsService.GetCurrentUserId && x.Password == HashPassword.HashWithSHA256(password));
            return account is not null;
        }

        public async Task UpdatePassword(UpdatePasswordDTO updatePasswordDto)
        {
            var account = await _unitOfWork.AccountRepo.GetAsync(x => x.Id == _claimsService.GetCurrentUserId);
            if (account is null)
            {
                throw new UnauthorizedException("Account is not existed");
            }
            if (updatePasswordDto.NewPassword != updatePasswordDto.RetypePassword)
            {
                throw new BadRequestException("Retype password is not match new password");
            }

            account.Password = HashPassword.HashWithSHA256(updatePasswordDto.NewPassword);
            _unitOfWork.AccountRepo.Update(account);
            await _unitOfWork.SaveChangeAsync();
        }
    }
}

