using Application.Interfaces.Account;
using Application.ViewModels.Accounts;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Account
{
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAccountList()
        {
            var User = await _accountService.GetUserAsync();
            return Ok(User);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccountById(int id)
        {
            var findAccountUser = await _accountService.GetUserByIdAsync(id);
            return Ok(findAccountUser);
        }
        [HttpGet]
        public async Task<IActionResult> GetPagedAccounts([FromQuery] QueryAccountDTO queryAccountDto)
        {
            return Ok(await _accountService.GetPageAccounts(queryAccountDto));
        }
        //[Authorize(Roles = "Admin")]
        [HttpGet("{name}")]
        public async Task<IActionResult> SearchByName(string name)
        {
            var result = await _accountService.SearchUserByNameAsync(name);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreatedAccountDTO createdAccountDTO)
        {
            var response = await _accountService.CreateAccountAsync(createdAccountDTO);
            return Created(nameof(CreateUser), response);
        }
        //[Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdatedAccountDTO accountDTO)
        {
            var updatedUser = await _accountService.UpdateUserAsync(id, accountDTO);
            return Ok(updatedUser);
        }

        [HttpPut("{accountId}/{roleId}")]
        public async Task<IActionResult> UpdateRole(int accountId, int roleId)
        {
            await _accountService.UpdateRoleForAccount(accountId, roleId);
            return NoContent();
        }
        //[Authorize(Roles = "Admin")]
        [HttpPut("{accountId}/{isDeleted}")]
        public async Task<IActionResult> DeleteOrEnable(int accountId, int isDeleted)
        {
            await _accountService.DeleteOrEnable(accountId, isDeleted > 0);
            return NoContent();
        }
    }
}
