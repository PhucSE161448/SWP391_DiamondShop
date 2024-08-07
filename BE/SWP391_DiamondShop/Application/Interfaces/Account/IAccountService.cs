﻿using Application.Services;
using Application.ViewModels.Accounts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Commons;

namespace Application.Interfaces.Account
{
    public interface IAccountService
    {
        Task<IEnumerable<AccountDTO>> GetUserAsync();
        Task<AccountDTO> GetUserByIdAsync(int id);
        Task<AccountDTO> UpdateUserAsync(int id, UpdatedAccountDTO accountDto);
        Task<IEnumerable<AccountDTO>> SearchUserByNameAsync(string name);
        Task<AccountDTO> CreateAccountAsync(CreatedAccountDTO createdAccountDTO);
        Task<AccountDTO> UpdateRoleForAccount(int accountId, int roleId);
        Task<Pagination<AccountDTO>> GetPageAccounts(QueryAccountDTO queryAccountDto);
        Task DeleteOrEnable(int accountId, bool isDeleted);
    }
}
