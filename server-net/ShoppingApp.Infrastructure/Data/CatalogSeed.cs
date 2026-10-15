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
            Product(30, "שוקולד מריר", "חפיסת שוקולד מריר 100 גרם", 14.90m, 6, "/catalog/chocolate.jpg"),

            Product(31, "לפטופ קל לעבודה", "מחשב נייד קל של 14 אינץ'", 4290.00m, 1, "/catalog/laptop.jpg"),
            Product(32, "לפטופ לסטודנט", "מחשב נייד בסיסי ללימודים", 2790.00m, 1, "/catalog/laptop.jpg"),
            Product(33, "לפטופ עסקי", "מחשב נייד עם זיכרון 16GB", 5190.00m, 1, "/catalog/laptop.jpg"),
            Product(34, "אוזניות ספורט", "אוזניות אלחוטיות לאימון", 249.00m, 1, "/catalog/headphones.jpg"),
            Product(35, "אוזניות סטודיו", "אוזניות סגורות להאזנה", 599.00m, 1, "/catalog/headphones.jpg"),
            Product(36, "אוזניות חוטיות", "אוזניות עם חיבור 3.5 מ\"מ", 149.00m, 1, "/catalog/headphones.jpg"),
            Product(37, "סמארטפון קומפקטי", "טלפון עם מסך 6.1 אינץ'", 990.00m, 1, "/catalog/phone.jpg"),
            Product(38, "סמארטפון פרימיום", "טלפון עם מצלמה משולשת", 3290.00m, 1, "/catalog/phone.jpg"),
            Product(39, "טאבלט קל", "טאבלט 8 אינץ' לקריאה", 890.00m, 1, "/catalog/tablet.jpg"),
            Product(40, "טאבלט לציור", "טאבלט 11 אינץ' עם עט", 2490.00m, 1, "/catalog/tablet.jpg"),
            Product(41, "רמקול חדר", "רמקול בלוטות' לחדר", 449.00m, 1, "/catalog/speaker.jpg"),
            Product(42, "רמקול כיס", "רמקול קטן לטיול", 129.00m, 1, "/catalog/speaker.jpg"),

            Product(43, "חולצה לבנה", "חולצת כותנה לבנה", 79.00m, 2, "/catalog/shirt.jpg"),
            Product(44, "חולצת פשתן", "חולצת פשתן לקיץ", 119.00m, 2, "/catalog/shirt.jpg"),
            Product(45, "חולצה מכופתרת", "חולצה מכופתרת למשרד", 149.00m, 2, "/catalog/shirt.jpg"),
            Product(46, "ז'קט ג'ינס", "ז'קט ג'ינס ליום יום", 279.00m, 2, "/catalog/jacket.jpg"),
            Product(47, "ז'קט חורף", "ז'קט מרופד לחורף", 549.00m, 2, "/catalog/jacket.jpg"),
            Product(48, "מעיל גשם", "מעיל קל לעונת הגשמים", 359.00m, 2, "/catalog/jacket.jpg"),
            Product(49, "ג'ינס בהיר", "מכנסי ג'ינס בהירים", 179.00m, 2, "/catalog/jeans.jpg"),
            Product(50, "ג'ינס סקיני", "מכנסי ג'ינס בגזרה צרה", 229.00m, 2, "/catalog/jeans.jpg"),
            Product(51, "נעלי עיר", "נעלי עור להליכה בעיר", 459.00m, 2, "/catalog/sneakers.jpg"),
            Product(52, "נעלי הליכה", "נעלי הליכה יומיומיות", 229.00m, 2, "/catalog/sneakers.jpg"),
            Product(53, "סוודר כותנה", "סוודר דק לעונת מעבר", 139.00m, 2, "/catalog/sweater.jpg"),
            Product(54, "קרדיגן", "קרדיגן פתוח לסתיו", 219.00m, 2, "/catalog/sweater.jpg"),

            Product(55, "ספר אלגוריתמים", "מבוא לאלגוריתמים", 109.00m, 3, "/catalog/book.jpg"),
            Product(56, "ספר בסיסי נתונים", "ספר על בסיסי נתונים", 129.00m, 3, "/catalog/book.jpg"),
            Product(57, "ספר פייתון", "לימוד פייתון מהיסוד", 79.00m, 3, "/catalog/book.jpg"),
            Product(58, "מארז ספרי ילדים", "שני ספרי ילדים", 99.00m, 3, "/catalog/books.jpg"),
            Product(59, "מארז קלאסיקה", "שני רומנים קלאסיים", 179.00m, 3, "/catalog/books.jpg"),
            Product(60, "רומן היסטורי", "רומן על תקופה היסטורית", 54.00m, 3, "/catalog/novel.jpg"),
            Product(61, "רומן מתח", "רומן מתח בכריכה רכה", 72.00m, 3, "/catalog/novel.jpg"),
            Product(62, "ספר אפייה", "מתכוני אפייה ביתית", 109.00m, 3, "/catalog/cookbook.jpg"),
            Product(63, "ספר ירקות", "מתכונים מהשוק", 79.00m, 3, "/catalog/cookbook.jpg"),
            Product(64, "ספר צביעה", "ספר צביעה לילדים", 39.00m, 3, "/catalog/kids-book.jpg"),
            Product(65, "ספר שינה", "סיפור קצר לפני השינה", 59.00m, 3, "/catalog/kids-book.jpg"),

            Product(66, "מכונת אספרסו", "מכונת אספרסו ביתית", 1290.00m, 4, "/catalog/coffee-machine.jpg"),
            Product(67, "מכונת קפה פילטר", "מכונת פילטר ל־12 כוסות", 349.00m, 4, "/catalog/coffee-machine.jpg"),
            Product(68, "מקציף חלב", "מקציף חלב למשקאות חמים", 189.00m, 4, "/catalog/coffee-machine.jpg"),
            Product(69, "מצעי ילדים", "סט מצעים למיטת ילד", 149.00m, 4, "/catalog/bedding.jpg"),
            Product(70, "מצעי כותנה", "סט מצעים מכותנה", 329.00m, 4, "/catalog/bedding.jpg"),
            Product(71, "שמיכת קיץ", "שמיכה דקה לקיץ", 279.00m, 4, "/catalog/bedding.jpg"),
            Product(72, "מנורת רצפה", "מנורת עמידה לסלון", 189.00m, 4, "/catalog/lamp.jpg"),
            Product(73, "מנורת לילה", "מנורת לילה קטנה", 89.00m, 4, "/catalog/lamp.jpg"),
            Product(74, "סיר קטן", "סיר 2 ליטר עם מכסה", 99.00m, 4, "/catalog/pot.jpg"),
            Product(75, "מחבת", "מחבת 28 ס\"מ", 149.00m, 4, "/catalog/pot.jpg"),
            Product(76, "מגבת ידיים", "זוג מגבות ידיים", 29.90m, 4, "/catalog/towel.jpg"),
            Product(77, "מגבת חוף", "מגבת גדולה לים", 49.90m, 4, "/catalog/towel.jpg"),

            Product(78, "כדור אולמות", "כדור למשחק באולם", 129.00m, 5, "/catalog/soccer.jpg"),
            Product(79, "כדור אימון", "כדור אימון עמיד", 49.00m, 5, "/catalog/soccer.jpg"),
            Product(80, "כדור ילדים", "כדור רך לילדים", 39.00m, 5, "/catalog/soccer.jpg"),
            Product(81, "מזרן פילאטיס", "מזרן אימון עבה", 129.00m, 5, "/catalog/yoga.jpg"),
            Product(82, "מזרן נסיעות", "מזרן דק לתיק", 59.00m, 5, "/catalog/yoga.jpg"),
            Product(83, "משקולת 2 ק\"ג", "משקולת יד קלה", 39.00m, 5, "/catalog/dumbbell.jpg"),
            Product(84, "משקולת 10 ק\"ג", "משקולת יד כבדה", 119.00m, 5, "/catalog/dumbbell.jpg"),
            Product(85, "בקבוק 500 מ\"ל", "בקבוק אימון קטן", 29.00m, 5, "/catalog/bottle.jpg"),
            Product(86, "בקבוק תרמי", "בקבוק שומר חום וקור", 49.00m, 5, "/catalog/bottle.jpg"),
            Product(87, "שעון ריצה", "שעון GPS לריצה", 699.00m, 5, "/catalog/watch.jpg"),
            Product(88, "שעון בסיסי", "שעון ספורט בסיסי", 299.00m, 5, "/catalog/watch.jpg"),

            Product(89, "שמן זית 500 מ\"ל", "שמן זית כתית 500 מ\"ל", 28.90m, 6, "/catalog/olive-oil.jpg"),
            Product(90, "שמן זית אורגני", "שמן זית אורגני 750 מ\"ל", 54.90m, 6, "/catalog/olive-oil.jpg"),
            Product(91, "שמן זית עדין", "שמן זית בטעם עדין", 36.90m, 6, "/catalog/olive-oil.jpg"),
            Product(92, "קפה פולים", "פולי קפה 250 גרם", 34.90m, 6, "/catalog/coffee.jpg"),
            Product(93, "קפה נמס", "קפה נמס 200 גרם", 19.90m, 6, "/catalog/coffee.jpg"),
            Product(94, "קפה טחון כהה", "קפה טחון קלוי כהה 250 גרם", 42.90m, 6, "/catalog/coffee.jpg"),
            Product(95, "פסטה מלאה", "פסטה מקמח מלא 500 גרם", 9.90m, 6, "/catalog/pasta.jpg"),
            Product(96, "פתיתים", "פתיתים 500 גרם", 6.50m, 6, "/catalog/pasta.jpg"),
            Product(97, "דבש פרחי בר", "דבש פרחי בר 350 גרם", 24.90m, 6, "/catalog/honey.jpg"),
            Product(98, "דבש שיטה", "דבש מפרחי שיטה 350 גרם", 44.90m, 6, "/catalog/honey.jpg"),
            Product(99, "שוקולד חלב", "חפיסת שוקולד חלב 100 גרם", 12.90m, 6, "/catalog/chocolate.jpg"),
            Product(100, "שוקולד אגוזים", "שוקולד מריר עם אגוזים 100 גרם", 18.90m, 6, "/catalog/chocolate.jpg")
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
