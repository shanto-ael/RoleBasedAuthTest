using RoleBasedAUTH.Application.Abstraction;
using RoleBasedAUTH.Domain;
using RoleBasedAUTH.Infrastructure.Abstraction;

namespace RoleBasedAUTH.Application
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _repository;

        public AuthService(IAuthRepository repository) => _repository = repository;

        public async Task<CommonResponse> AddRole(Role role)
        {
            try
            {
                var addRole = await _repository.AddRole(role);
                if (addRole > 0)
                {
                    return new CommonResponse
                    {
                        StatusCode = "0",
                        StatusMessage = "Role Added Successfully"
                    };
                }
                else
                {
                    return new CommonResponse
                    {
                        StatusCode = "1",
                        StatusMessage = "Adding Role Failed"
                    };
                }
            }
            catch
            {
                throw;
            }
        }

        public bool AssignRole(AddRoleToUser addRole)
        {
            try
            {
                var assignedRole = _repository.AssignRole(addRole);
                return assignedRole;
            }
            catch
            {
                throw;
            }


        }

        public async Task<TokenResponse> Login(LoginRequest request)
        {
            try
            {
                var getToken = await _repository.Login(request);
                if (getToken != null) {
                    return new TokenResponse
                    {
                        StatusCode = "0",
                        StatusMessage = "Token Generated Successfully",
                        Token = getToken
                    };
                }
                else
                {
                    return new TokenResponse
                    {
                        StatusCode = "1",
                        StatusMessage = "Failed to Retrieve Token",
                        Token = null!
                    };
                }
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> RegisterUser(User user)
        {
            try
            {
                var registerUser = await _repository.RegisterUser(user);
                return registerUser;
            }
            catch
            {
                throw;
            }
        }
    }
}
