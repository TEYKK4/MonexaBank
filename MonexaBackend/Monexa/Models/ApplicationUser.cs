using Microsoft.AspNetCore.Identity;

namespace Monexa.Models;

public class ApplicationUser : IdentityUser
{
    public ICollection<Account> Accounts { get; set; } = null!;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
}