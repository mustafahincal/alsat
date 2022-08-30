using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class mig8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "OperationClaims",
                columns: new[] { "OperationClaimId", "Name" },
                values: new object[] { 2, "Kullanıcı" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 165, 97, 63, 88, 190, 89, 69, 219, 25, 242, 132, 183, 85, 250, 134, 131, 235, 182, 77, 239, 128, 178, 156, 252, 117, 33, 4, 123, 25, 50, 152, 13, 90, 86, 118, 234, 200, 165, 167, 102, 173, 244, 209, 2, 224, 88, 54, 218, 121, 204, 240, 216, 28, 235, 211, 223, 167, 48, 61, 125, 43, 160, 144, 117 }, new byte[] { 174, 88, 169, 225, 250, 26, 168, 159, 219, 24, 198, 22, 26, 43, 158, 243, 83, 78, 242, 225, 36, 8, 47, 123, 162, 245, 158, 173, 64, 230, 2, 224, 168, 236, 83, 15, 173, 144, 149, 247, 90, 72, 77, 30, 91, 140, 13, 224, 242, 17, 4, 165, 202, 89, 103, 140, 252, 8, 114, 248, 219, 0, 233, 237, 71, 210, 234, 164, 22, 239, 229, 55, 183, 54, 115, 62, 181, 189, 8, 231, 209, 60, 123, 112, 1, 213, 94, 239, 234, 80, 204, 145, 245, 140, 18, 133, 3, 198, 34, 232, 149, 163, 40, 13, 95, 221, 190, 164, 186, 147, 199, 142, 229, 135, 181, 156, 131, 2, 124, 58, 10, 16, 26, 59, 209, 215, 244, 88 } });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "OperationClaims",
                keyColumn: "OperationClaimId",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 251, 214, 0, 17, 232, 203, 206, 119, 214, 37, 109, 11, 159, 84, 13, 169, 70, 255, 55, 14, 195, 93, 254, 15, 189, 188, 84, 214, 149, 129, 91, 194, 33, 92, 245, 80, 120, 126, 230, 132, 17, 6, 141, 205, 97, 196, 167, 118, 215, 61, 162, 178, 118, 177, 163, 247, 207, 244, 158, 14, 62, 103, 60, 105 }, new byte[] { 134, 95, 76, 130, 233, 186, 51, 105, 86, 182, 225, 22, 145, 186, 209, 115, 201, 128, 2, 44, 181, 146, 74, 208, 228, 129, 155, 40, 56, 193, 87, 240, 218, 192, 130, 8, 14, 197, 220, 182, 144, 207, 110, 58, 210, 86, 216, 212, 127, 176, 13, 121, 152, 161, 239, 194, 125, 120, 56, 237, 119, 141, 152, 247, 3, 31, 96, 222, 68, 111, 117, 78, 95, 174, 168, 54, 102, 197, 72, 135, 57, 148, 87, 35, 162, 112, 74, 101, 86, 156, 187, 102, 105, 20, 112, 149, 9, 12, 35, 176, 208, 135, 226, 134, 172, 203, 32, 66, 60, 139, 135, 89, 59, 221, 150, 56, 141, 165, 0, 249, 70, 95, 185, 139, 24, 138, 55, 23 } });
        }
    }
}
