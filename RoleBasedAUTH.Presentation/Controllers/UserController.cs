using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoleBasedAUTH.Application.Abstraction;
using RoleBasedAUTH.Domain;
using RoleBasedAUTH.Presentation.Controllers.Base;
using System.Security.Claims;

namespace RoleBasedAUTH.Presentation.Controllers
{
    public class UserController(IUserService userService) : BaseApiController
    {
        private readonly IUserService _userService = userService;

        
        [HttpGet("getalluser")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetAllUser()
        {
            var user = HttpContext.User;
            if (user == null)
            {
                return Unauthorized("User not authorized.");
            }

            var roles = user.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);
            if (!roles.Contains("Admin"))
            {
                return Forbid("User does not have the Admin role.");
            }

            var data = await _userService.GetUsers();
            return Ok(data);
        }

        [HttpGet("detail")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetUserInfo()
        {
            var user = HttpContext.User;
            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);
            var userId = user.Claims.Where(c => c.Type == "Id").Select(c => c.Value).FirstOrDefault();
            if(userId == null){
                return Unauthorized(new CommonResponse{
                    StatusCode = "401",
                    StatusMessage = "Unauthorized Access"
                });
            }
            var data = await _userService.GetUserDetail(userId!);
            return Ok(data);
        }

    }
}
