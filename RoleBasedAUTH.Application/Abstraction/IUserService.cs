using RoleBasedAUTH.Domain;

namespace RoleBasedAUTH.Application.Abstraction
{
    public interface IUserService
    {
        Task<List<UserDto>> GetUsers();
        Task<UserDto> GetUserDetail(string Id);
    }
}
