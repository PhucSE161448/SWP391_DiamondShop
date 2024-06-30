using Application.Interfaces;
using Application.IRepositories.Accounts;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories.Accounts
{
    public class AccountRepo : GenericRepository<Account>, IAccountRepo
    {
        private readonly SWP391_DiamondShopContext _dbContext;

        public AccountRepo(
            SWP391_DiamondShopContext context,
            ICurrentTime timeService,
            IClaimsService claimsService
        )
            : base(context, timeService, claimsService)
        {
            _dbContext = context;
        }

        public Task<bool> CheckEmailNameExited(string email) =>
            _dbContext.Accounts.AnyAsync(u => u.Email == email);
        public Task<bool> CheckPhoneNumberExited(string phonenumber) =>
                                        _dbContext.Accounts.AnyAsync(u => u.PhoneNumber == phonenumber);

        public async Task<Account> GetUserByEmailAndPasswordHash(string email, string passwordHash)
        {
            var user = await _dbContext.Accounts.FirstOrDefaultAsync(
                record => record.Email == email && record.Password == passwordHash
            );
            if (user is null)
            {
                throw new Exception("Email & password is not correct");
            }

            return user;
        }

        public async Task<Account> GetUserByConfirmationToken(string token)
        {
            return await _dbContext.Accounts.SingleOrDefaultAsync(
                u => u.ConfirmationToken == token
            );
        }

        public async Task<IEnumerable<Account>> SearchAccountByNameAsync(string name)
        {
            return await _dbContext.Accounts.Include(x => x.Role).Where(u => u.Name.Contains(name)).ToListAsync();
        }

        public async Task<IEnumerable<Account>> SearchAccountByRoleNameAsync(string roleName)
        {
            return await _dbContext.Accounts.Include(x => x.Role)
                .Where(u => u.Role.Name.Contains(roleName))
                .ToListAsync();
        }

        public async Task<IEnumerable<Account>> GetSortedAccountAsync()
        {
            return await _dbContext.Accounts.Include(x => x.Role).OrderByDescending(a => a.CreatedDate).ToListAsync();
        }
    }
}


