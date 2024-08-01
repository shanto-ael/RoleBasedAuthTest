namespace RoleBasedAUTH.Domain
{
    public class TokenResponse
    {
        public string StatusCode { get; set; }
        public string StatusMessage { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;

    }
}
