namespace Monexa.Models;

public class Transaction
{
    public Guid Id { get; set; }
    
    public TransactionType TransactionType { get; set; }
    
    public decimal Amount { get; set; }
    
    public string Currency { get; set; }
    
    public string Description { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public Guid AccountId { get; set; }
    
    public Guid? ToAccountId { get; set; }
    
    public Account Account { get; set; }
    public Account? ToAccount { get; set; } = null!;
}

public enum TransactionType
{
    Withdrawal,
    Deposit,
    Transfer
}