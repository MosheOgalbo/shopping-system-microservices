using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShoppingApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class LocalCatalogImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Image",
                value: "/catalog/laptop.svg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: "/catalog/headphones.svg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "/catalog/shirt.svg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "Image",
                value: "/catalog/jacket.svg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "Image",
                value: "/catalog/book.svg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "Image",
                value: "/catalog/books.svg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Image",
                value: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "Image",
                value: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "Image",
                value: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "Image",
                value: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80");
        }
    }
}
