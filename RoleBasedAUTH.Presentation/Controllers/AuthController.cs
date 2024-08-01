using Microsoft.AspNetCore.Mvc;
using RoleBasedAUTH.Application.Abstraction;
using RoleBasedAUTH.Domain;
using RoleBasedAUTH.Presentation.Controllers.Base;

namespace RoleBasedAUTH.Presentation.Controllers
{
    public class AuthController(IAuthService authService) : BaseApiController
    {
        private readonly IAuthService _authService = authService;

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var registerData = await _authService.RegisterUser(user);
            return Ok(registerData);
        }
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var loginData = await _authService.Login(loginRequest);
            return Ok(loginData);
        }
        [HttpPost("addrole")]
        public async Task<IActionResult> AddRoleToUser([FromBody] Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var addRole = await _authService.AddRole(role);
            return Ok(addRole);
        }
        [HttpPost("assignrole")]
        public async Task<IActionResult> AssignRoleToUser([FromBody] AddRoleToUser role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var assignedRole = _authService.AssignRole(role);
            var data = await Task.FromResult(assignedRole);
            return Ok(data);    
        }
    }
}
