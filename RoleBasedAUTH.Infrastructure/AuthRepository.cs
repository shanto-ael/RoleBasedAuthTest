using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RoleBasedAUTH.Domain;
using RoleBasedAUTH.Infrastructure.Abstraction;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RoleBasedAUTH.Infrastructure
{
    public class AuthRepository(DapperDbContext context,ServiceConfigure serviceConfigure) : IAuthRepository
    {
        private readonly DapperDbContext _context = context;
        private readonly ServiceConfigure _configuration = serviceConfigure;

        public async Task<int> AddRole(Role role)
        {
            try
            {
                string sql = " INSERT INTO dbo.Roles (Name,Description) VALUES ( @Name, @Description);";
                var parameter = new
                {
                    Name = role.Name,
                    Description = role.Description,
                };
                using (var connection = _context.CreateConnection())
                {
                    var rowsAffected = await connection.ExecuteAsync(sql, parameter);
                    Console.WriteLine($"Rows Affter are {rowsAffected}");
                    return rowsAffected;    
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
                var roles = new List<UserRole>();
                var getUser = $"SELECT * FROM dbo.Users WHERE Id = '{addRole.UserId}'";
                using (var connection = _context.CreateConnection())
                {
                    User data = connection.QueryFirstOrDefault<User>(getUser)!;

                    if (data == null)
                    {
                        throw new Exception("Requested User Is Not Valid");
                    }

                    foreach (var role in addRole.RoleIds)
                    {
                        var userRole = new UserRole
                        {
                            UserId = data.Id,
                            RoleId = role
                        };
                        roles.Add(userRole);
                    }

                    var sql = "INSERT INTO dbo.UserRoles (UserId, RoleId) VALUES (@UserId, @RoleId)";
                    foreach (var role in roles)
                    {
                        connection.Execute(sql, new { UserId = role.UserId, RoleId = role.RoleId });
                    }

                    return true;
                }
            }
            catch
            {
                throw;
            }
        }


        public async Task<string> Login(LoginRequest request)
        {
            try
            {
                if(request.UserName != null && request.Password != null)
                {
                    var user = "SELECT * FROM dbo.users WHERE UserName = @UserName and Password = @Password";
                    using (var connection = _context.CreateConnection())
                    {
                        User result = await connection.QueryFirstOrDefaultAsync<User>(user, new {UserName = request.UserName, Password = request.Password}) ?? null!;
                        if(result == null)
                        {
                            return null!;
                        }
                        else
                        {
                            var claims = new List<Claim>()
                            {
                                new(JwtRegisteredClaimNames.Sub,_configuration.GetSubject()),
                                new("Id",result.Id.ToString()),
                                new("UserName", result.UserName),
                                new("Email", result.Email)
                            };
                            var userRoles = $"SELECT * FROM dbo.UserRoles WHERE UserId = '{result.Id}'";
                            IEnumerable<UserRole> data = await connection.QueryAsync<UserRole>(userRoles);
                            var roleIds = data.Select(x => x.RoleId).ToList();

                            var rolesQuery = "SELECT * FROM dbo.Roles WHERE ID IN @RoleIds";
                            var userRole = await connection.QueryAsync<Role>(rolesQuery, new { RoleIds = roleIds });
                            foreach (var role in userRole)
                            {
                                claims.Add(new Claim(ClaimTypes.Role, role.Name));
                            }
                            string jwtToken = GenerateToken(claims);
                            return jwtToken;

                        }
                    }
                }
                else
                {
                    return "";
                }
            }
            catch
            {
                throw;
            }
        }

        private string GenerateToken(List<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetKey()));
            var keyData = _configuration.GetKey();
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration.GetIssuer(),
                _configuration.GetAudience(),
                claims,
                expires: DateTime.UtcNow.AddMinutes(5),
                signingCredentials: signIn);

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }

        public async Task<bool> RegisterUser(User user)
        {
            try
            {
                string sql = "INSERT INTO dbo.Users (UserName, Email, Password) VALUES (@UserName, @Email, @Password) ";
                using(var connection = _context.CreateConnection())
                {
                    var result = await connection.ExecuteAsync(sql, new { UserName = user.UserName, Email = user.Email, Password = user.Password });
                    if(result == 1)
                    {
                        return true;
                    }
                    return false;
                }
            }
            catch
            {
                throw;
            }
        }

       
    }
}
