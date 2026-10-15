using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ShoppingApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ExpandCatalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "Description", "Name" },
                values: new object[,]
                {
                    { 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מוצרים לבית ולמטבח", "בית" },
                    { 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "ציוד ספורט ואימון", "ספורט" },
                    { 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מוצרי מכולת", "מזון" }
                });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Price",
                value: 3490.00m);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Price",
                value: 399.00m);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "Price",
                value: 399.00m);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "Price",
                value: 89.00m);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "Price",
                value: 149.00m);

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "CreatedAt", "Description", "Image", "Name", "Price" },
                values: new object[,]
                {
                    { 7, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "טלפון עם מסך 6.5 אינץ'", "/catalog/phone.jpg", "סמארטפון", 2190.00m },
                    { 8, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "טאבלט 10 אינץ' לקריאה ולצפייה", "/catalog/tablet.jpg", "טאבלט", 1590.00m },
                    { 9, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "רמקול בלוטות' לחדר ולטיולים", "/catalog/speaker.jpg", "רמקול נייד", 249.00m },
                    { 10, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מכנסי ג'ינס בגזרה ישרה", "/catalog/jeans.jpg", "ג'ינס כהה", 199.00m },
                    { 11, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "נעלי ריצה לאימון יומי", "/catalog/sneakers.jpg", "נעלי ריצה", 329.00m },
                    { 12, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "סוודר צמר לסתיו ולחורף", "/catalog/sweater.jpg", "סוודר צמר", 169.00m },
                    { 13, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "רומן כריכה רכה", "/catalog/novel.jpg", "רומן", 68.00m },
                    { 14, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מתכונים למטבח הביתי", "/catalog/cookbook.jpg", "ספר בישול", 89.00m },
                    { 15, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "ספר מאויר לילדים", "/catalog/kids-book.jpg", "ספר ילדים", 49.00m },
                    { 16, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מכונת קפה לשימוש ביתי", "/catalog/coffee-machine.jpg", "מכונת קפה", 549.00m },
                    { 17, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "ציפה וזוג ציפיות למיטה זוגית", "/catalog/bedding.jpg", "סט מצעים", 219.00m },
                    { 18, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מנורת קריאה עם אור חם", "/catalog/lamp.jpg", "מנורת שולחן", 129.00m },
                    { 19, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "סיר 5 ליטר עם מכסה", "/catalog/pot.jpg", "סיר נירוסטה", 149.00m },
                    { 20, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מגבת כותנה בגודל אמבט", "/catalog/towel.jpg", "מגבת אמבט", 39.90m },
                    { 21, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "כדור משחק בגודל 5", "/catalog/soccer.jpg", "כדור כדורגל", 79.00m },
                    { 22, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מזרן אימון בעובי 6 מ\"מ", "/catalog/yoga.jpg", "מזרן יוגה", 89.00m },
                    { 23, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "משקולת יד 5 ק\"ג", "/catalog/dumbbell.jpg", "משקולת יד", 59.00m },
                    { 24, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "בקבוק 750 מ\"ל", "/catalog/bottle.jpg", "בקבוק ספורט", 39.00m },
                    { 25, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שעון דופק לריצה ולאימון", "/catalog/watch.jpg", "שעון ספורט", 449.00m },
                    { 26, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שמן זית כתית 750 מ\"ל", "/catalog/olive-oil.jpg", "שמן זית", 42.90m },
                    { 27, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "קפה טחון 250 גרם", "/catalog/coffee.jpg", "קפה טחון", 28.90m },
                    { 28, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "פסטה 500 גרם", "/catalog/pasta.jpg", "פסטה", 7.90m },
                    { 29, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "דבש טהור 350 גרם", "/catalog/honey.jpg", "דבש טהור", 32.90m },
                    { 30, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "חפיסת שוקולד מריר 100 גרם", "/catalog/chocolate.jpg", "שוקולד מריר", 14.90m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Price",
                value: 2999.99m);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Price",
                value: 349.00m);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "Price",
                value: 249.00m);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "Price",
                value: 149.99m);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "Price",
                value: 119.00m);
        }
    }
}
