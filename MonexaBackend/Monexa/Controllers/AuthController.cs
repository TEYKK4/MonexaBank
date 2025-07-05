using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Monexa.Data;
using Monexa.DTO.Account;
using Monexa.DTO.Auth;
using Monexa.Models;
using Monexa.Services.Auth;

namespace Monexa.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IAuthService _authService;
    private readonly MonexaDbContext _dbContext;

    public AuthController(UserManager<ApplicationUser> userManager, IAuthService authService, MonexaDbContext  dbContext)
    {
        _userManager = userManager;
        _authService = authService;
        _dbContext = dbContext;
    }
    
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        
        return result.Succeeded
            ? Ok(new { message = "Registration successful" }) 
            : BadRequest(new { errors = result.Errors });
    }
    
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var token = await _authService.LoginAsync(dto);
        
        return token is null 
            ? Unauthorized(new { message = "Invalid credentials" }) 
            : Ok(new { token });
    }
}