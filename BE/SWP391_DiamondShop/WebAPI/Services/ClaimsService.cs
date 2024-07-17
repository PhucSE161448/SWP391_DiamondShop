using Application.Interfaces;
using System.Security.Claims;

namespace WebAPI.Services
{
    public class ClaimsService : IClaimsService
    {
        public ClaimsService(IHttpContextAccessor httpContextAccessor)
        {
            // todo implementation to get the current userId
            var name = httpContextAccessor.HttpContext?.User?.FindFirstValue("Name");
            GetCurrentUserName = string.IsNullOrEmpty(name) ? "" : name;
            
            var id = httpContextAccessor.HttpContext?.User?.FindFirstValue("Id");
            GetCurrentUserId = string.IsNullOrEmpty(id) ? 0 : Convert.ToInt32(id);

            var role = httpContextAccessor.HttpContext?.User?.FindFirstValue("Role");
            GetCurrentUserRole = string.IsNullOrEmpty(role) ? 0 : Convert.ToInt32(role);
        }
        public int? GetCurrentUserRole { get; }
        public string? GetCurrentUserName { get; }
        public int GetCurrentUserId { get; }
    }
}
