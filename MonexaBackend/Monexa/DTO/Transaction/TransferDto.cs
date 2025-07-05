using System.ComponentModel.DataAnnotations;
using Monexa.Models;

namespace Monexa.DTO.Transaction;

public class TransferDto
{
    [Required]
    public decimal Amount { get; set; }
    
    [Required]
    public string Currency { get; set; } = string.Empty;
    
    [Required]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    public string FromNumber { get; set; } = string.Empty;
    
    [Required]
    public string ToNumber { get; set; } = string.Empty;
}