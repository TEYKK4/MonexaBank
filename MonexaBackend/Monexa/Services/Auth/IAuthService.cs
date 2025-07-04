using Monexa.DTO.Auth;
using Monexa.Models;

namespace Monexa.Services.Auth;

public interface IAuthService
{
    Task<(bool Succeeded, IEnumerable<string> Errors)> RegisterAsync(RegisterDto dto);
    
    Task<string?> LoginAsync(LoginDto dto);
    
    string GenerateJwtToken(ApplicationUser user);
}