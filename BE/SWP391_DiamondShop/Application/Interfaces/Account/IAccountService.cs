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
        Task<ServiceResponse<IEnumerable<AccountDTO>>> GetUserAsync();
        Task<ServiceResponse<AccountDTO>> GetUserByIdAsync(int id);
        Task<ServiceResponse<AccountDTO>> UpdateUserAsync(int id, AccountDTO userDTO);
        Task<ServiceResponse<bool>> DeleteUserAsync(int id);
        Task<ServiceResponse<IEnumerable<AccountDTO>>> SearchUserByNameAsync(string name);
        Task<ServiceResponse<AccountDTO>> CreateAccountAsync(CreatedAccountDTO createdAccountDTO);
    }
}
