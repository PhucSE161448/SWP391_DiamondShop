using Application.Commons;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Authenticates;
using Application.Ultils;
using Application.ViewModels.Accounts;
using Application.ViewModels.Auths;
using AutoMapper;
using Domain.Enums;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Authenticates
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentTime _currentTime;
        private readonly AppConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthenticationService(IUnitOfWork unitOfWork,
            ICurrentTime currentTime,
            AppConfiguration configuration,
            IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._currentTime = currentTime;
            this._configuration = configuration;
            this._mapper = mapper;
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

        public async Task<AccountDTO> RegisterAsync(RegisterAccountDTO registerAccountDTO)
        {
            var exist = await _unitOfWork.AccountRepo.CheckEmailNameExited(registerAccountDTO.Email);
            if (exist)
            {
                throw new NotFoundException("Email is existed");
            }
            var account = _mapper.Map<Account>(registerAccountDTO);
            account.Password = HashPassword.HashWithSHA256(
                registerAccountDTO.Password!
            );
            account.ConfirmationToken = Guid.NewGuid().ToString();
            account.RoleId = (int)Roles.Customer;
            await _unitOfWork.AccountRepo.AddAsync(account);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<AccountDTO>(account);
        }
        
    }
}

