using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ShoppingApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ExpandCatalogTo100 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "CreatedAt", "Description", "Image", "Name", "Price" },
                values: new object[,]
                {
                    { 31, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מחשב נייד קל של 14 אינץ'", "/catalog/laptop.jpg", "לפטופ קל לעבודה", 4290.00m },
                    { 32, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מחשב נייד בסיסי ללימודים", "/catalog/laptop.jpg", "לפטופ לסטודנט", 2790.00m },
                    { 33, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מחשב נייד עם זיכרון 16GB", "/catalog/laptop.jpg", "לפטופ עסקי", 5190.00m },
                    { 34, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "אוזניות אלחוטיות לאימון", "/catalog/headphones.jpg", "אוזניות ספורט", 249.00m },
                    { 35, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "אוזניות סגורות להאזנה", "/catalog/headphones.jpg", "אוזניות סטודיו", 599.00m },
                    { 36, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "אוזניות עם חיבור 3.5 מ\"מ", "/catalog/headphones.jpg", "אוזניות חוטיות", 149.00m },
                    { 37, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "טלפון עם מסך 6.1 אינץ'", "/catalog/phone.jpg", "סמארטפון קומפקטי", 990.00m },
                    { 38, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "טלפון עם מצלמה משולשת", "/catalog/phone.jpg", "סמארטפון פרימיום", 3290.00m },
                    { 39, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "טאבלט 8 אינץ' לקריאה", "/catalog/tablet.jpg", "טאבלט קל", 890.00m },
                    { 40, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "טאבלט 11 אינץ' עם עט", "/catalog/tablet.jpg", "טאבלט לציור", 2490.00m },
                    { 41, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "רמקול בלוטות' לחדר", "/catalog/speaker.jpg", "רמקול חדר", 449.00m },
                    { 42, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "רמקול קטן לטיול", "/catalog/speaker.jpg", "רמקול כיס", 129.00m },
                    { 43, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "חולצת כותנה לבנה", "/catalog/shirt.jpg", "חולצה לבנה", 79.00m },
                    { 44, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "חולצת פשתן לקיץ", "/catalog/shirt.jpg", "חולצת פשתן", 119.00m },
                    { 45, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "חולצה מכופתרת למשרד", "/catalog/shirt.jpg", "חולצה מכופתרת", 149.00m },
                    { 46, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "ז'קט ג'ינס ליום יום", "/catalog/jacket.jpg", "ז'קט ג'ינס", 279.00m },
                    { 47, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "ז'קט מרופד לחורף", "/catalog/jacket.jpg", "ז'קט חורף", 549.00m },
                    { 48, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מעיל קל לעונת הגשמים", "/catalog/jacket.jpg", "מעיל גשם", 359.00m },
                    { 49, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מכנסי ג'ינס בהירים", "/catalog/jeans.jpg", "ג'ינס בהיר", 179.00m },
                    { 50, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מכנסי ג'ינס בגזרה צרה", "/catalog/jeans.jpg", "ג'ינס סקיני", 229.00m },
                    { 51, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "נעלי עור להליכה בעיר", "/catalog/sneakers.jpg", "נעלי עיר", 459.00m },
                    { 52, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "נעלי הליכה יומיומיות", "/catalog/sneakers.jpg", "נעלי הליכה", 229.00m },
                    { 53, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "סוודר דק לעונת מעבר", "/catalog/sweater.jpg", "סוודר כותנה", 139.00m },
                    { 54, 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "קרדיגן פתוח לסתיו", "/catalog/sweater.jpg", "קרדיגן", 219.00m },
                    { 55, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מבוא לאלגוריתמים", "/catalog/book.jpg", "ספר אלגוריתמים", 109.00m },
                    { 56, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "ספר על בסיסי נתונים", "/catalog/book.jpg", "ספר בסיסי נתונים", 129.00m },
                    { 57, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "לימוד פייתון מהיסוד", "/catalog/book.jpg", "ספר פייתון", 79.00m },
                    { 58, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שני ספרי ילדים", "/catalog/books.jpg", "מארז ספרי ילדים", 99.00m },
                    { 59, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שני רומנים קלאסיים", "/catalog/books.jpg", "מארז קלאסיקה", 179.00m },
                    { 60, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "רומן על תקופה היסטורית", "/catalog/novel.jpg", "רומן היסטורי", 54.00m },
                    { 61, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "רומן מתח בכריכה רכה", "/catalog/novel.jpg", "רומן מתח", 72.00m },
                    { 62, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מתכוני אפייה ביתית", "/catalog/cookbook.jpg", "ספר אפייה", 109.00m },
                    { 63, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מתכונים מהשוק", "/catalog/cookbook.jpg", "ספר ירקות", 79.00m },
                    { 64, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "ספר צביעה לילדים", "/catalog/kids-book.jpg", "ספר צביעה", 39.00m },
                    { 65, 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "סיפור קצר לפני השינה", "/catalog/kids-book.jpg", "ספר שינה", 59.00m },
                    { 66, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מכונת אספרסו ביתית", "/catalog/coffee-machine.jpg", "מכונת אספרסו", 1290.00m },
                    { 67, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מכונת פילטר ל־12 כוסות", "/catalog/coffee-machine.jpg", "מכונת קפה פילטר", 349.00m },
                    { 68, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מקציף חלב למשקאות חמים", "/catalog/coffee-machine.jpg", "מקציף חלב", 189.00m },
                    { 69, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "סט מצעים למיטת ילד", "/catalog/bedding.jpg", "מצעי ילדים", 149.00m },
                    { 70, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "סט מצעים מכותנה", "/catalog/bedding.jpg", "מצעי כותנה", 329.00m },
                    { 71, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שמיכה דקה לקיץ", "/catalog/bedding.jpg", "שמיכת קיץ", 279.00m },
                    { 72, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מנורת עמידה לסלון", "/catalog/lamp.jpg", "מנורת רצפה", 189.00m },
                    { 73, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מנורת לילה קטנה", "/catalog/lamp.jpg", "מנורת לילה", 89.00m },
                    { 74, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "סיר 2 ליטר עם מכסה", "/catalog/pot.jpg", "סיר קטן", 99.00m },
                    { 75, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מחבת 28 ס\"מ", "/catalog/pot.jpg", "מחבת", 149.00m },
                    { 76, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "זוג מגבות ידיים", "/catalog/towel.jpg", "מגבת ידיים", 29.90m },
                    { 77, 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מגבת גדולה לים", "/catalog/towel.jpg", "מגבת חוף", 49.90m },
                    { 78, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "כדור למשחק באולם", "/catalog/soccer.jpg", "כדור אולמות", 129.00m },
                    { 79, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "כדור אימון עמיד", "/catalog/soccer.jpg", "כדור אימון", 49.00m },
                    { 80, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "כדור רך לילדים", "/catalog/soccer.jpg", "כדור ילדים", 39.00m },
                    { 81, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מזרן אימון עבה", "/catalog/yoga.jpg", "מזרן פילאטיס", 129.00m },
                    { 82, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "מזרן דק לתיק", "/catalog/yoga.jpg", "מזרן נסיעות", 59.00m },
                    { 83, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "משקולת יד קלה", "/catalog/dumbbell.jpg", "משקולת 2 ק\"ג", 39.00m },
                    { 84, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "משקולת יד כבדה", "/catalog/dumbbell.jpg", "משקולת 10 ק\"ג", 119.00m },
                    { 85, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "בקבוק אימון קטן", "/catalog/bottle.jpg", "בקבוק 500 מ\"ל", 29.00m },
                    { 86, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "בקבוק שומר חום וקור", "/catalog/bottle.jpg", "בקבוק תרמי", 49.00m },
                    { 87, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שעון GPS לריצה", "/catalog/watch.jpg", "שעון ריצה", 699.00m },
                    { 88, 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שעון ספורט בסיסי", "/catalog/watch.jpg", "שעון בסיסי", 299.00m },
                    { 89, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שמן זית כתית 500 מ\"ל", "/catalog/olive-oil.jpg", "שמן זית 500 מ\"ל", 28.90m },
                    { 90, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שמן זית אורגני 750 מ\"ל", "/catalog/olive-oil.jpg", "שמן זית אורגני", 54.90m },
                    { 91, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שמן זית בטעם עדין", "/catalog/olive-oil.jpg", "שמן זית עדין", 36.90m },
                    { 92, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "פולי קפה 250 גרם", "/catalog/coffee.jpg", "קפה פולים", 34.90m },
                    { 93, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "קפה נמס 200 גרם", "/catalog/coffee.jpg", "קפה נמס", 19.90m },
                    { 94, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "קפה טחון קלוי כהה 250 גרם", "/catalog/coffee.jpg", "קפה טחון כהה", 42.90m },
                    { 95, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "פסטה מקמח מלא 500 גרם", "/catalog/pasta.jpg", "פסטה מלאה", 9.90m },
                    { 96, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "פתיתים 500 גרם", "/catalog/pasta.jpg", "פתיתים", 6.50m },
                    { 97, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "דבש פרחי בר 350 גרם", "/catalog/honey.jpg", "דבש פרחי בר", 24.90m },
                    { 98, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "דבש מפרחי שיטה 350 גרם", "/catalog/honey.jpg", "דבש שיטה", 44.90m },
                    { 99, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "חפיסת שוקולד חלב 100 גרם", "/catalog/chocolate.jpg", "שוקולד חלב", 12.90m },
                    { 100, 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "שוקולד מריר עם אגוזים 100 גרם", "/catalog/chocolate.jpg", "שוקולד אגוזים", 18.90m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 57);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 61);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 62);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 63);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 64);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 66);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 67);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 68);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 69);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 70);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 71);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 72);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 73);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 74);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 75);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 76);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 77);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 78);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 79);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 80);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 81);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 82);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 83);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 84);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 85);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 86);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 87);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 88);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 89);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 90);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 92);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 93);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 95);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 96);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 100);
        }
    }
}
