using RoleBasedAUTH.Domain;

namespace RoleBasedAUTH.Application.Abstraction
{
    public interface IAuthService
    {
        Task<bool> RegisterUser(User user);
        Task<TokenResponse> Login(LoginRequest request);
        Task<CommonResponse> AddRole(Role role);
        bool AssignRole(AddRoleToUser addRole);
    }
}
