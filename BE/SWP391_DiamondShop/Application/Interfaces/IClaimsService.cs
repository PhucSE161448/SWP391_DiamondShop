namespace Application.Interfaces
{
    public interface IClaimsService
    {
        public string? GetCurrentUserName { get; }
        public int GetCurrentUserId { get; }
    }
}
