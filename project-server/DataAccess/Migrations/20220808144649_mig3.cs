using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class mig3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsingStateId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "UsingStates",
                columns: table => new
                {
                    UsingStateId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsingStates", x => x.UsingStateId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_UsingStateId",
                table: "Products",
                column: "UsingStateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_UsingStates_UsingStateId",
                table: "Products",
                column: "UsingStateId",
                principalTable: "UsingStates",
                principalColumn: "UsingStateId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_UsingStates_UsingStateId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "UsingStates");

            migrationBuilder.DropIndex(
                name: "IX_Products_UsingStateId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "UsingStateId",
                table: "Products");
        }
    }
}
