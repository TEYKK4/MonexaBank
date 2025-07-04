namespace Monexa.Models;

public class Account
{
    public Guid Id { get; set; }
    
    public decimal Balance { get; set; }
    
    public string Currency { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public string ApplicationUserId { get; set; } = string.Empty;

    public ApplicationUser ApplicationUser { get; set; } = null!;
    public ICollection<Transaction> Transactions { get; set; } = null!;
}