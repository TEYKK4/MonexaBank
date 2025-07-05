using System.ComponentModel.DataAnnotations;

namespace Monexa.DTO.Account;

public class CreateAccountDto
{
    [Required]
    public string Name { get; set; } =  null!;
    
    [Required]
    public string Currency { get; set; } =  null!;
}