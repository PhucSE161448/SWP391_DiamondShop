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
        //[Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _accountService.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
