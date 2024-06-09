using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Account;
using Application.Ultils;
using Application.ViewModels.Accounts;
using AutoMapper;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Accounts
{
    public class AccountService : IAccountService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AccountService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<AccountDTO> CreateAccountAsync(CreatedAccountDTO createdAccountDto)
        {
            var exist = await _unitOfWork.AccountRepo.CheckEmailNameExited(createdAccountDto.Email!);
            var existed = await _unitOfWork.AccountRepo.CheckPhoneNumberExited(createdAccountDto.PhoneNumber!);

            if (exist)
            {
                throw new BadRequestException("Email is existed");
            }
            else if (existed)
            {
                throw new BadRequestException("Phone is existed");
            }
            var account = _mapper.Map<Account>(createdAccountDto);
            account.Password = HashPassword.HashWithSHA256(
                createdAccountDto.Password!
            );
            account.ConfirmationToken = Guid.NewGuid().ToString();
            await _unitOfWork.AccountRepo.AddAsync(account);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<AccountDTO>(account);
        }

        public async Task<AccountDTO> UpdateRoleForAccount(int accountId, int roleId)
        {
            var account = await _unitOfWork.AccountRepo.GetByIdAsync(accountId);
            var role = await _unitOfWork.RoleRepo.GetByIdAsync(roleId);
            if (account is null)
            {
                throw new NotFoundException("Account is not existed");
            }

            if (role is null)
            {
                throw new NotFoundException("Role is not existed");
            }

            account.RoleId = roleId;
            _unitOfWork.AccountRepo.Update(account);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<AccountDTO>(account);
        }

        public async Task DeleteUserAsync(int id)
        {

            var exist = await _unitOfWork.AccountRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Account is not existed");
            }
            if (exist.IsDeleted)
            {
                throw new BadRequestException("Account is already deleted");
            }
            _unitOfWork.AccountRepo.SoftRemove(exist);
            await _unitOfWork.SaveChangeAsync();
        }

        public async Task<IEnumerable<AccountDTO>> GetUserAsync()
        {
            var accounts = await _unitOfWork.AccountRepo.GetAllAsync();
            var accountDtos = new List<AccountDTO>();
            foreach (var user in accounts)
            {
                if (user.IsDeleted == false)
                {
                    accountDtos.Add(_mapper.Map<AccountDTO>(user));
                }
            }
            return accountDtos;
        }

        public async Task<AccountDTO> GetUserByIdAsync(int id)
        {
            var exist = await _unitOfWork.AccountRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Account is not existed");
            }
            return _mapper.Map<AccountDTO>(exist);
        }

        public async Task<IEnumerable<AccountDTO>> SearchUserByNameAsync(string name)
        {
            var users = await _unitOfWork.AccountRepo.SearchAccountByNameAsync(name);
            var userDTOs = new List<AccountDTO>();

            foreach (var acc in users)
            {
                if (acc.IsDeleted == false)
                {
                    userDTOs.Add(_mapper.Map<AccountDTO>(acc));
                }
            }
            return userDTOs;
        }

        public async Task<AccountDTO> UpdateUserAsync(int id, UpdatedAccountDTO accountDTO)
        {
            var existingUser = await _unitOfWork.AccountRepo.GetByIdAsync(id);
            if (existingUser == null)
            {
                throw new NotFoundException("Account is not existed");
            }
            if (existingUser.IsDeleted == true)
            {
                throw new BadRequestException("Account is deleted in system");
            }
            _unitOfWork.AccountRepo.Update(_mapper.Map(accountDTO, existingUser));
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<AccountDTO>(existingUser);
        }
    }
}
