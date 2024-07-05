namespace Application.Interfaces
{
    public interface IClaimsService
    {
        public string? GetCurrentUserRole { get; }
        public string? GetCurrentUserName { get; }
        public int GetCurrentUserId { get; }
    }
}
