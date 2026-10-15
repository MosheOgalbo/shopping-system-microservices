using ShoppingApp.Core.Models;

namespace ShoppingApp.Infrastructure.Data
{
    public static class CatalogSeed
    {
        private static readonly DateTime CreatedAt = new(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public static Category[] Categories { get; } =
        [
            new Category { Id = 1, Name = "אלקטרוניקה", Description = "מוצרי אלקטרוניקה ומחשבים", CreatedAt = CreatedAt },
            new Category { Id = 2, Name = "ביגוד", Description = "בגדים ואקססוריז", CreatedAt = CreatedAt },
            new Category { Id = 3, Name = "ספרים", Description = "ספרים ומגזינים", CreatedAt = CreatedAt },
            new Category { Id = 4, Name = "בית", Description = "מוצרים לבית ולמטבח", CreatedAt = CreatedAt },
            new Category { Id = 5, Name = "ספורט", Description = "ציוד ספורט ואימון", CreatedAt = CreatedAt },
            new Category { Id = 6, Name = "מזון", Description = "מוצרי מכולת", CreatedAt = CreatedAt }
        ];

        public static Product[] Products { get; } =
        [
            Product(1, "לפטופ Dell", "מחשב נייד לעבודה וללימודים", 3490.00m, 1, "/catalog/laptop.jpg"),
            Product(2, "אוזניות אלחוטיות", "אוזניות עם ביטול רעשים", 399.00m, 1, "/catalog/headphones.jpg"),
            Product(7, "סמארטפון", "טלפון עם מסך 6.5 אינץ'", 2190.00m, 1, "/catalog/phone.jpg"),
            Product(8, "טאבלט", "טאבלט 10 אינץ' לקריאה ולצפייה", 1590.00m, 1, "/catalog/tablet.jpg"),
            Product(9, "רמקול נייד", "רמקול בלוטות' לחדר ולטיולים", 249.00m, 1, "/catalog/speaker.jpg"),

            Product(3, "חולצה כחולה", "חולצת כותנה איכותית", 89.99m, 2, "/catalog/shirt.jpg"),
            Product(4, "ז'קט קלאסי", "ז'קט קל לעונת המעבר", 399.00m, 2, "/catalog/jacket.jpg"),
            Product(10, "ג'ינס כהה", "מכנסי ג'ינס בגזרה ישרה", 199.00m, 2, "/catalog/jeans.jpg"),
            Product(11, "נעלי ריצה", "נעלי ריצה לאימון יומי", 329.00m, 2, "/catalog/sneakers.jpg"),
            Product(12, "סוודר צמר", "סוודר צמר לסתיו ולחורף", 169.00m, 2, "/catalog/sweater.jpg"),

            Product(5, "ספר תכנות", "ספר ללימוד תכנות מעשי", 89.00m, 3, "/catalog/book.jpg"),
            Product(6, "מארז ספרים", "שלושה ספרים נבחרים", 149.00m, 3, "/catalog/books.jpg"),
            Product(13, "רומן", "רומן כריכה רכה", 68.00m, 3, "/catalog/novel.jpg"),
            Product(14, "ספר בישול", "מתכונים למטבח הביתי", 89.00m, 3, "/catalog/cookbook.jpg"),
            Product(15, "ספר ילדים", "ספר מאויר לילדים", 49.00m, 3, "/catalog/kids-book.jpg"),

            Product(16, "מכונת קפה", "מכונת קפה לשימוש ביתי", 549.00m, 4, "/catalog/coffee-machine.jpg"),
            Product(17, "סט מצעים", "ציפה וזוג ציפיות למיטה זוגית", 219.00m, 4, "/catalog/bedding.jpg"),
            Product(18, "מנורת שולחן", "מנורת קריאה עם אור חם", 129.00m, 4, "/catalog/lamp.jpg"),
            Product(19, "סיר נירוסטה", "סיר 5 ליטר עם מכסה", 149.00m, 4, "/catalog/pot.jpg"),
            Product(20, "מגבת אמבט", "מגבת כותנה בגודל אמבט", 39.90m, 4, "/catalog/towel.jpg"),

            Product(21, "כדור כדורגל", "כדור משחק בגודל 5", 79.00m, 5, "/catalog/soccer.jpg"),
            Product(22, "מזרן יוגה", "מזרן אימון בעובי 6 מ\"מ", 89.00m, 5, "/catalog/yoga.jpg"),
            Product(23, "משקולת יד", "משקולת יד 5 ק\"ג", 59.00m, 5, "/catalog/dumbbell.jpg"),
            Product(24, "בקבוק ספורט", "בקבוק 750 מ\"ל", 39.00m, 5, "/catalog/bottle.jpg"),
            Product(25, "שעון ספורט", "שעון דופק לריצה ולאימון", 449.00m, 5, "/catalog/watch.jpg"),

            Product(26, "שמן זית", "שמן זית כתית 750 מ\"ל", 42.90m, 6, "/catalog/olive-oil.jpg"),
            Product(27, "קפה טחון", "קפה טחון 250 גרם", 28.90m, 6, "/catalog/coffee.jpg"),
            Product(28, "פסטה", "פסטה 500 גרם", 7.90m, 6, "/catalog/pasta.jpg"),
            Product(29, "דבש טהור", "דבש טהור 350 גרם", 32.90m, 6, "/catalog/honey.jpg"),
            Product(30, "שוקולד מריר", "חפיסת שוקולד מריר 100 גרם", 14.90m, 6, "/catalog/chocolate.jpg")
        ];

        private static Product Product(int id, string name, string description, decimal price, int categoryId, string image)
        {
            return new Product
            {
                Id = id,
                Name = name,
                Description = description,
                Price = price,
                CategoryId = categoryId,
                Image = image,
                CreatedAt = CreatedAt
            };
        }
    }
}
