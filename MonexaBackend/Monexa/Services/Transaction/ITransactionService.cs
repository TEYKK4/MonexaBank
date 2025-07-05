using Monexa.DTO.Transaction;

namespace Monexa.Services.Transaction;

public interface ITransactionService
{
    Task<(bool Succeeded, string? Errors)> TransferAsync(TransferDto dto, string userId);
}