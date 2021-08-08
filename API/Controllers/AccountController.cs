using System.Net.Sockets;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Data.Identity;
using API.DTOs;
using API.Errors;
using Core.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Entities.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using API.Dtos;
using API.Extensions;
using System.Collections.Generic;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {

        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            if (EmailExists(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email address is in use" } });
            }

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                Gender = user.Gender,
            };
        }

        // Sending values in the body for our request so it's post to login
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
              .Include(p => p.Photos)
              .SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                DisplayName = user.DisplayName,
                Gender = user.Gender
            };
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(User);


            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                DisplayName = user.DisplayName,
                Gender = user.Gender
            };

        }


        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindByEmailWithAddressAsync(User);

            return _mapper.Map<AddressDto>(user.Address);

        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindByEmailWithAddressAsync(User);

            user.Address = _mapper.Map<Address>(address);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<AddressDto>(user.Address));

            return BadRequest("Problem updating the user");
        }



        // Ensure email is unique
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> EmailExists([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }
        // Ensure username is unique
        [HttpGet("userexists")]
        public async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}