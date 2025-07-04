using Microsoft.AspNetCore.Identity;

namespace Monexa.Models;

public class ApplicationUser : IdentityUser
{
    public ICollection<Account> Accounts { get; set; } = null!;
}