using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Monexa.Models;

namespace Monexa.Data;

public class MonexaDbContext : IdentityDbContext<ApplicationUser>
{
    public MonexaDbContext(DbContextOptions<MonexaDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Account)
            .WithMany(a => a.Transactions)
            .HasForeignKey(t => t.AccountId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.ToAccount)
            .WithMany()
            .HasForeignKey(t => t.ToAccountId)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Account>()
            .HasOne(a => a.ApplicationUser)
            .WithMany(au => au.Accounts)
            .HasForeignKey(a => a.ApplicationUserId); 
        
        modelBuilder.Entity<ApplicationUser>()
            .HasIndex(u => u.UserName)
            .IsUnique();

        modelBuilder.Entity<ApplicationUser>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Account>()
            .HasIndex(u => u.Number)
            .IsUnique();
    }
    
    public DbSet<Account> Accounts { get; set; } = null!; 
    public DbSet<Transaction> Transactions { get; set; } = null!; 
}
