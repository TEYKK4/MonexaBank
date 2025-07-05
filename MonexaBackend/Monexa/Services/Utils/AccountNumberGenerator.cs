namespace Monexa.Services.Utils;

public class AccountNumberGenerator : IAccountNumberGenerator
{
    private readonly Random _random = new();

    public string Generate()
    {
        return string.Concat(Enumerable.Range(0, 26).Select(_ => _random.Next(0, 10)));
    }
}