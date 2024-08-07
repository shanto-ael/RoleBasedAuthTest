using System.Security.Claims;
using Dapper;
using RoleBasedAUTH.Application.Abstraction;
using RoleBasedAUTH.Domain;
using RoleBasedAUTH.Infrastructure;

namespace RoleBasedAUTH.Application
{
    public class UserService(DapperDbContext context) : IUserService
    {
        private readonly DapperDbContext _context = context;

        public async Task<List<UserDto>> GetUsers()
        {
            string sql = @" SELECT p.ID, p.UserName,p.Email,r.Name as RoleName from dbo.users p
                            LEFT JOIN dbo.UserRoles e on e.UserId = p.ID
                            LEFT JOIN dbo.Roles r on r.ID = e.ID ";
            using (var connection = _context.CreateConnection())
            {
                var users = await connection.QueryAsync<UserDto>(sql);
                return users.ToList();
            }
        }

        public async Task<UserDto> GetUserDetail(string Id)
        {
            string sql = @"SELECT p.ID, p.UserName,p.Email,r.Name as RoleName from dbo.users p
                            LEFT JOIN dbo.UserRoles e on e.UserId = p.ID
                            LEFT JOIN dbo.Roles r on r.ID = e.ID WHERE p.ID = @ID";
            using (var connections = _context.CreateConnection())
            {
                var users = await connections.QueryFirstOrDefaultAsync<UserDto>(sql, new { ID = Id });
                return users!;

            }
        }
    }
}
