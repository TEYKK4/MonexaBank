using Microsoft.EntityFrameworkCore;
using Monexa.Data;
using Monexa.DTO.Transaction;
using Monexa.Models;

namespace Monexa.Services.Transaction;

public class TransactionService : ITransactionService
{
    private readonly MonexaDbContext _dbContext;

    public TransactionService(MonexaDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<(bool Succeeded, string? Errors)> TransferAsync(TransferDto dto, string userId)
    {
        var senderAccount = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Number == dto.FromNumber && a.ApplicationUserId == userId);
        
        if (senderAccount is null) return (false, "No such account number");

        if (dto.Amount > senderAccount.Balance) return (false, "Amount is greater than balance");
        
        var receiverAccount = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Number == dto.ToNumber);
        
        if (receiverAccount == null) return (false, "No such account number");
        
        senderAccount.Balance -= dto.Amount;
        receiverAccount.Balance += dto.Amount;
        
        _dbContext.Transactions.Add(new Models.Transaction
        {
            Amount = dto.Amount,
            Currency = dto.Currency,
            Description = dto.Description,
            TransactionType = TransactionType.Transfer,
            AccountId = senderAccount.Id,
            ToAccountId = receiverAccount.Id
        });

        var result = await _dbContext.SaveChangesAsync();
        
        return (result > 0, null);
    }
}