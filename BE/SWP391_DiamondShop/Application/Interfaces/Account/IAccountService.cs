using Application.Services;
using Application.ViewModels.Accounts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Account
{
    public interface IAccountService
    {
        Task<IEnumerable<AccountDTO>> GetUserAsync();
        Task<AccountDTO> GetUserByIdAsync(int id);
        Task<AccountDTO> UpdateUserAsync(int id, AccountDTO userDTO);
        Task DeleteUserAsync(int id);
        Task<IEnumerable<AccountDTO>> SearchUserByNameAsync(string name);
        Task<AccountDTO> CreateAccountAsync(CreatedAccountDTO createdAccountDTO);
    }
}
