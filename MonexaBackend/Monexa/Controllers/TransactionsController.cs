using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Monexa.DTO.Transaction;
using Monexa.Services.Transaction;

namespace Monexa.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionsController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }
    
    [Authorize]
    [HttpPost("create-transfer")]
    public async Task<IActionResult> CreateTransfer([FromBody] TransferDto dto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId is null) return Unauthorized();
        
        var result = await _transactionService.TransferAsync(dto, userId);
        
        return result.Succeeded
            ? Ok(new { message = "Transaction created" }) 
            : BadRequest(new { errors = result.Errors });
    }

}