using System.ComponentModel.DataAnnotations;

namespace Monexa.DTO.Auth;

public class LoginDto
{
    [Required]
    public string EmailOrUsername { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
}