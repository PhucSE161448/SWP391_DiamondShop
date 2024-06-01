using Application.Interfaces;
using System.Security.Claims;

namespace WebAPI.Services
{
    public class ClaimsService : IClaimsService
    {
        public ClaimsService(IHttpContextAccessor httpContextAccessor)
        {
            // todo implementation to get the current userId
            var emailClaim = httpContextAccessor.HttpContext?.User?.FindFirstValue("Name");
            GetCurrentUserId = string.IsNullOrEmpty(emailClaim) ? "" : emailClaim;

        }

        public string GetCurrentUserId { get; }
    }
}
