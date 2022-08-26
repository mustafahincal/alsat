using Business.Abstract;
using Entities.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userToLogin = await _authService.Login(userForLoginDto);
            if (!userToLogin.Success)
            {
                return BadRequest(userToLogin);
            }

            var result = await _authService.CreateAccessTokenForLogin(userToLogin.Data);
            if (result.Success)
            {

                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var userExists = await _authService.UserExists(userForRegisterDto.Email);
            if (!userExists.Success)
            {
                return BadRequest(userExists);
            }

            var registerResult = await _authService.Register(userForRegisterDto, userForRegisterDto.Password);

            var result = await _authService.CreateAccessTokenForRegister(registerResult.Data);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangeUserPassword(ChangePasswordDto changePasswordDto)
        {
            var changePasswordResult = await _authService.ChangePassword(changePasswordDto);

            if (changePasswordResult.Success)
            {
                return Ok(changePasswordResult);
            }

            return BadRequest(changePasswordResult);
        }

        [HttpGet("block")]
        public async Task<IActionResult> BlockUser(string email)
        {
            var result = await _authService.BlockUser(email);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("unblock")]
        public async Task<IActionResult> UnBlockUser(int id)
        {
            var result = await _authService.UnBlockUser(id);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
