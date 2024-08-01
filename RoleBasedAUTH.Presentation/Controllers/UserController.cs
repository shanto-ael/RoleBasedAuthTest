using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoleBasedAUTH.Application.Abstraction;
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

        [HttpGet("getuserbyid")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserById(string Id)
        {
            var user = HttpContext.User;
            if (user == null)
            {
                return Unauthorized("User not authorized.");
            }

            var roles = user.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);
            var userId = user.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(c => c.Value).FirstOrDefault();
            if (!roles.Contains("User"))
            {
                return Forbid("User does not have the User role.");
            }

            var data = await _userService.GetUserById(Id);
            return Ok(data);
        }

    }
}
