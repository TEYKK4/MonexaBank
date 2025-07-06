using Monexa.Models;

namespace Monexa.DTO.Transaction;

public class TransactionDto
{
    public Guid Id { get; set; }
    
    public string TransactionType { get; set; } = string.Empty;
    
    public decimal Amount { get; set; }
    
    public string Currency { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; }
    
    public string FromNumber { get; set; } = string.Empty;
    
    public string? ToNumber { get; set; }
}