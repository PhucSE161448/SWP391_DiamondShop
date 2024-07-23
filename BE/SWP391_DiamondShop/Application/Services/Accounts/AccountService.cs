using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Account;
using Application.Ultils;
using Application.ViewModels.Accounts;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Commons;
using Mapster;

namespace Application.Services.Accounts
{
    public class AccountService : IAccountService
    {
        private readonly IUnitOfWork _unitOfWork;
        public AccountService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<AccountDTO> CreateAccountAsync(CreatedAccountDTO createdAccountDto)
        {
            var exist = await _unitOfWork.AccountRepo.CheckEmailNameExited(createdAccountDto.Email!);
            var existed = await _unitOfWork.AccountRepo.CheckPhoneNumberExited(createdAccountDto.PhoneNumber!);

            if (exist)
            {
                throw new BadRequestException("Email is existed");
            } 
            if (existed)
            {
                throw new BadRequestException("Phone is existed");
            }

            var account = createdAccountDto.Adapt<Account>();
            account.Password = HashPassword.HashWithSHA256(
                createdAccountDto.Password!
            );
            account.ConfirmationToken = Guid.NewGuid().ToString();
            await _unitOfWork.AccountRepo.AddAsync(account);
            await _unitOfWork.SaveChangeAsync();
            return account.Adapt<AccountDTO>();
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
            return account.Adapt<AccountDTO>();
        }

        public async Task<Pagination<AccountDTO>> GetPageAccounts(QueryAccountDTO queryAccountDto)
        {
            return (await _unitOfWork.AccountRepo.GetPagedAccount(queryAccountDto)).Adapt<Pagination<AccountDTO>>();
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
            var accounts = await _unitOfWork.AccountRepo.GetAllAsync(null,"Role"); 
            return accounts.Adapt<IEnumerable<AccountDTO>>();
        }

        public async Task<AccountDTO> GetUserByIdAsync(int id)
        {
            var exist = await _unitOfWork.AccountRepo.GetByIdAsync(id);
            if (exist == null)
            {
                throw new NotFoundException("Account is not existed");
            }
            return exist.Adapt<AccountDTO>();
        }

        public async Task<IEnumerable<AccountDTO>> SearchUserByNameAsync(string name)
        {
            var accounts = await _unitOfWork.AccountRepo.SearchAccountByNameAsync(name);
            return accounts.Adapt<List<AccountDTO>>();
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
            _unitOfWork.AccountRepo.Update(accountDTO.Adapt(existingUser));
            await _unitOfWork.SaveChangeAsync();
            return existingUser.Adapt<AccountDTO>();
        }
    }
}
