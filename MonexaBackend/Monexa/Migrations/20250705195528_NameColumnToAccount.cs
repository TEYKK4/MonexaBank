using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Monexa.Migrations
{
    /// <inheritdoc />
    public partial class NameColumnToAccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Accounts",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Accounts");
        }
    }
}
