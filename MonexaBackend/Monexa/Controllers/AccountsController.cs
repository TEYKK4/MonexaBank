using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Monexa.Data;
using Monexa.DTO.Account;
using Monexa.Models;
using Monexa.Services.Utils;

namespace Monexa.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountsController : ControllerBase
{
    private readonly MonexaDbContext _dbContext;
    private readonly IAccountNumberGenerator _accountNumberGenerator;

    public AccountsController(MonexaDbContext dbContext, IAccountNumberGenerator accountNumberGenerator)
    {
        _dbContext = dbContext;
        _accountNumberGenerator = accountNumberGenerator;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateAccount([FromBody] CreateAccountDto dto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId is null) return Unauthorized();

        var account = new Account
        {
            Name = dto.Name,
            Number = _accountNumberGenerator.Generate(),
            Balance = 0,
            Currency = dto.Currency,
            ApplicationUserId = userId,
        };
        
        await _dbContext.Accounts.AddAsync(account);
        await _dbContext.SaveChangesAsync();
        
        return Ok(new { message = "Account created", accountId = account.Id });
    }
    
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAccounts()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId is null) return Unauthorized();

        var accounts = await _dbContext.Accounts
            .Where(a => a.ApplicationUserId == userId)
            .Select(a => new
            {
                a.Id,
                a.Name,
                a.Currency,
                a.Balance,
                a.CreatedAt
            })
            .ToListAsync();

        return Ok(accounts);
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetAccountById(Guid id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (userId is null) return Unauthorized();

        var account = await _dbContext.Accounts
            .FirstOrDefaultAsync(a => a.Id == id && a.ApplicationUserId == userId);

        return account is null
            ? NotFound()
            : Ok(new
            {
                account.Id,
                account.Name,
                account.Currency,
                account.Balance,
                account.CreatedAt,
                account.Number
            });
    }
    
    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateAccount(Guid id, [FromBody] string newName)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (userId is null) return Unauthorized();

        var account = await _dbContext.Accounts
            .FirstOrDefaultAsync(a => a.Id == id && a.ApplicationUserId == userId);

        if (account is null) return NotFound();

        account.Name = newName;
        await _dbContext.SaveChangesAsync();

        return Ok(new { message = "Account updated" });
    }
    
    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteAccount(Guid id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (userId is null) return Unauthorized();

        var account = await _dbContext.Accounts
            .FirstOrDefaultAsync(a => a.Id == id && a.ApplicationUserId == userId);

        if (account is null) return NotFound();
        
        if (account.Balance != 0)
            return BadRequest("Cannot delete account with non-zero balance.");

        _dbContext.Accounts.Remove(account);
        await _dbContext.SaveChangesAsync();

        return Ok(new { message = "Account deleted" });
    }
}