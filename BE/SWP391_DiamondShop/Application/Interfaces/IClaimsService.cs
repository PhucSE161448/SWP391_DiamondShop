namespace Application.Interfaces
{
    public interface IClaimsService
    {
        public int? GetCurrentUserRole { get; }
        public string? GetCurrentUserName { get; }
        public int GetCurrentUserId { get; }
    }
}
