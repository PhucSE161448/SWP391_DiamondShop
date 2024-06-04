using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Account;
using Application.Ultils;
using Application.ViewModels.Accounts;
using Application.ViewModels.CaratWeights;
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
        public async Task<AccountDTO> CreateAccountAsync(CreatedAccountDTO createdAccountDTO)
        {
            var exist = await _unitOfWork.AccountRepo.CheckEmailNameExited(createdAccountDTO.Email!);
            var existed = await _unitOfWork.AccountRepo.CheckPhoneNumberExited(createdAccountDTO.PhoneNumber!);

            if (exist)
            {
                throw new BadRequestException("Email is existed");
            }
            else if (existed)
            {
                throw new BadRequestException("Phone is existed");
            }
            var account = _mapper.Map<Account>(createdAccountDTO);
            account.IsDeleted = false;
            account.ConfirmationToken = Guid.NewGuid().ToString();
            await _unitOfWork.AccountRepo.AddAsync(account);
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
            var accountDTOs = new List<AccountDTO>();
            foreach (var user in accounts)
            {
                if (user.IsDeleted == false)
                {
                    accountDTOs.Add(_mapper.Map<AccountDTO>(user));
                }
            }
            return accountDTOs;
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

        public async Task<AccountDTO> UpdateUserAsync(int id, AccountDTO userDTO)
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
            var updated = _mapper.Map(userDTO, existingUser);
            //updated.PasswordHash = Utils.HashPassword.HashWithSHA256(accountDTO.PasswordHash);
            _unitOfWork.AccountRepo.Update(updated);
            await _unitOfWork.SaveChangeAsync();
            return _mapper.Map<AccountDTO>(updated);
        }
    }
}
