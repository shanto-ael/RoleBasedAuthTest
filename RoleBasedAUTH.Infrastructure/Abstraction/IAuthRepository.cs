using RoleBasedAUTH.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoleBasedAUTH.Infrastructure.Abstraction
{
    public interface IAuthRepository
    {
        Task<bool> RegisterUser(User user);
        Task<string> Login(LoginRequest request);
        Task<int> AddRole(Role role);
        bool AssignRole(AddRoleToUser addRole);
    }
}
