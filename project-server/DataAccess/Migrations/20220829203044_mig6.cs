using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class mig6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "OperationClaims",
                columns: new[] { "OperationClaimId", "Name" },
                values: new object[] { 1, "Admin" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "FirstName", "LastName", "PasswordHash", "PasswordSalt", "Status" },
                values: new object[] { 1, "admin@mail.com", "Admin", "AdminLastName", new byte[] { 250, 132, 234, 135, 254, 28, 88, 100, 164, 56, 85, 171, 9, 129, 139, 47, 58, 51, 184, 98, 142, 220, 242, 155, 201, 31, 123, 101, 103, 36, 78, 46, 109, 199, 130, 107, 206, 75, 160, 236, 116, 207, 184, 93, 61, 222, 78, 160, 26, 189, 8, 140, 121, 124, 173, 233, 131, 184, 241, 60, 247, 32, 90, 109 }, new byte[] { 128, 79, 133, 175, 102, 193, 200, 242, 192, 50, 178, 149, 41, 67, 171, 181, 97, 36, 144, 9, 250, 49, 178, 108, 160, 185, 229, 58, 212, 138, 23, 101, 222, 171, 130, 117, 10, 67, 245, 77, 6, 225, 47, 124, 215, 237, 13, 7, 194, 12, 210, 95, 158, 122, 102, 108, 230, 149, 38, 208, 89, 120, 244, 1, 153, 26, 163, 58, 186, 243, 241, 137, 180, 121, 243, 96, 243, 1, 178, 75, 57, 232, 220, 216, 113, 190, 96, 116, 69, 23, 191, 216, 211, 141, 157, 35, 33, 130, 106, 181, 247, 28, 94, 99, 186, 27, 141, 26, 170, 30, 103, 25, 74, 139, 248, 7, 205, 39, 99, 244, 216, 174, 211, 86, 250, 31, 138, 127 }, false });

            migrationBuilder.InsertData(
                table: "UserOperationClaims",
                columns: new[] { "UserOperationClaimId", "OperationClaimId", "UserId" },
                values: new object[] { 1, 1, 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "UserOperationClaimId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "OperationClaims",
                keyColumn: "OperationClaimId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1);
        }
    }
}
