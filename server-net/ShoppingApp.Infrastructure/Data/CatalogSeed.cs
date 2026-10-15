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
            Product(1, "לפטופ Dell XPS 13", "מחשב נייד 13 אינץ׳ לעבודה", 3490.00m, 1, "/catalog/laptop.jpg"),
            Product(31, "מקבוק אייר 13", "מחשב נייד קל של Apple", 4290.00m, 1, "/catalog/laptop.jpg"),
            Product(32, "לפטופ Lenovo IdeaPad 3", "מחשב נייד ללימודים", 2790.00m, 1, "/catalog/laptop.jpg"),
            Product(33, "לפטופ HP EliteBook 840", "מחשב נייד עסקי עם זיכרון 16GB", 5190.00m, 1, "/catalog/laptop.jpg"),
            Product(2, "אוזניות Sony WH-1000XM5", "אוזניות אלחוטיות עם ביטול רעשים", 399.00m, 1, "/catalog/headphones.jpg"),
            Product(34, "אוזניות JBL Endurance Run 2", "אוזניות ספורט אלחוטיות", 249.00m, 1, "/catalog/headphones.jpg"),
            Product(35, "אוזניות Audio-Technica ATH-M50x", "אוזניות סטודיו סגורות", 599.00m, 1, "/catalog/headphones.jpg"),
            Product(36, "אוזניות Samsung EO-IC100", "אוזניות חוטיות עם חיבור USB-C", 149.00m, 1, "/catalog/headphones.jpg"),
            Product(7, "סמארטפון Samsung Galaxy S24", "טלפון עם מסך 6.2 אינץ׳", 2190.00m, 1, "/catalog/phone.jpg"),
            Product(37, "סמארטפון Samsung Galaxy A35", "טלפון עם מסך 6.6 אינץ׳", 990.00m, 1, "/catalog/phone.jpg"),
            Product(38, "אייפון 16", "טלפון עם מצלמה כפולה", 3290.00m, 1, "/catalog/phone.jpg"),
            Product(8, "אייפד 10.9", "טאבלט 10.9 אינץ׳ לקריאה ולצפייה", 1590.00m, 1, "/catalog/tablet.jpg"),
            Product(39, "טאבלט Samsung Galaxy Tab A9", "טאבלט 8.7 אינץ׳ לקריאה", 890.00m, 1, "/catalog/tablet.jpg"),
            Product(40, "אייפד אייר 11", "טאבלט 11 אינץ׳ עם Apple Pencil", 2490.00m, 1, "/catalog/tablet.jpg"),
            Product(9, "רמקול JBL Flip 6", "רמקול בלוטות׳ נייד", 249.00m, 1, "/catalog/speaker.jpg"),
            Product(41, "רמקול Bose SoundLink Flex", "רמקול בלוטות׳ לחדר", 449.00m, 1, "/catalog/speaker.jpg"),
            Product(42, "רמקול Sony SRS-XB100", "רמקול כיס לטיול", 129.00m, 1, "/catalog/speaker.jpg"),
            Product(3, "חולצת Nike Dri-FIT כחולה", "חולצת ספורט כחולה", 89.99m, 2, "/catalog/shirt.jpg"),
            Product(4, "ז'קט Levi's Trucker", "ז'קט ג'ינס קלאסי", 399.00m, 2, "/catalog/jacket.jpg"),
            Product(10, "ג'ינס Levi's 501", "מכנסי ג'ינס בגזרה ישרה", 199.00m, 2, "/catalog/jeans.jpg"),
            Product(11, "נעלי Nike Revolution 7", "נעלי ריצה לאימון יומי", 329.00m, 2, "/catalog/sneakers.jpg"),
            Product(12, "סוודר צמר Uniqlo", "סוודר צמר לסתיו ולחורף", 169.00m, 2, "/catalog/sweater.jpg"),
            Product(43, "חולצת פולו Lacoste", "חולצת פולו מכותנה", 79.00m, 2, "/catalog/shirt.jpg"),
            Product(44, "חולצת פשתן Zara", "חולצת פשתן לקיץ", 119.00m, 2, "/catalog/shirt.jpg"),
            Product(45, "חולצה מכופתרת Calvin Klein", "חולצה מכופתרת למשרד", 149.00m, 2, "/catalog/shirt.jpg"),
            Product(46, "ז'קט ג'ינס Levi's", "ז'קט ג'ינס ליום יום", 279.00m, 2, "/catalog/jacket.jpg"),
            Product(47, "ז'קט The North Face", "ז'קט מרופד לחורף", 549.00m, 2, "/catalog/jacket.jpg"),
            Product(48, "מעיל גשם Columbia", "מעיל קל לעונת הגשמים", 359.00m, 2, "/catalog/jacket.jpg"),
            Product(49, "ג'ינס Lee", "מכנסי ג'ינס בהירים", 179.00m, 2, "/catalog/jeans.jpg"),
            Product(50, "ג'ינס Diesel", "מכנסי ג'ינס בגזרה צרה", 229.00m, 2, "/catalog/jeans.jpg"),
            Product(51, "נעלי Adidas Samba", "נעליים ליום יום", 459.00m, 2, "/catalog/sneakers.jpg"),
            Product(52, "נעלי Skechers Go Walk", "נעלי הליכה יומיומיות", 229.00m, 2, "/catalog/sneakers.jpg"),
            Product(53, "סוודר כותנה H&M", "סוודר דק לעונת מעבר", 139.00m, 2, "/catalog/sweater.jpg"),
            Product(54, "קרדיגן Uniqlo", "קרדיגן פתוח לסתיו", 219.00m, 2, "/catalog/sweater.jpg"),
            Product(5, "קוד נקי", "ספר מאת רוברט ס. מרטין", 89.00m, 3, "/catalog/book.jpg"),
            Product(55, "מבוא לאלגוריתמים", "ספרם של קורמן, לייזרסון וריבסט", 109.00m, 3, "/catalog/book.jpg"),
            Product(56, "מושגי מערכות מסדי נתונים", "ספרם של סילברשץ, קורת וסודרשאן", 129.00m, 3, "/catalog/book.jpg"),
            Product(57, "Python Crash Course", "לימוד פייתון מהיסוד", 79.00m, 3, "/catalog/book.jpg"),
            Product(6, "שר הטבעות - מארז", "שלושת ספרי הטרילוגיה", 149.00m, 3, "/catalog/books.jpg"),
            Product(58, "הארי פוטר - מארז", "שני הספרים הראשונים", 99.00m, 3, "/catalog/books.jpg"),
            Product(59, "ג'יין אוסטן - מארז", "גאווה ודעה קדומה ושכל וריגוש", 179.00m, 3, "/catalog/books.jpg"),
            Product(13, "1984", "רומן מאת ג'ורג' אורוול", 68.00m, 3, "/catalog/novel.jpg"),
            Product(60, "מאה שנים של בדידות", "רומן מאת גבריאל גרסיה מרקס", 54.00m, 3, "/catalog/novel.jpg"),
            Product(61, "הנערה עם קעקוע הדרקון", "רומן מתח מאת סטיג לארסון", 72.00m, 3, "/catalog/novel.jpg"),
            Product(14, "מלח שומן חומצה חום", "ספר בישול מאת סאמין נוסארט", 89.00m, 3, "/catalog/cookbook.jpg"),
            Product(62, "Ottolenghi Simple", "ספר בישול מאת יוטם אוטולנגי", 109.00m, 3, "/catalog/cookbook.jpg"),
            Product(63, "ירושלים", "ספר בישול מאת אוטולנגי ותמימי", 79.00m, 3, "/catalog/cookbook.jpg"),
            Product(15, "הזחל הרעב מאוד", "ספר מאויר מאת אריק קרל", 49.00m, 3, "/catalog/kids-book.jpg"),
            Product(64, "איפה וולי?", "ספר חיפוש מאת מרטין הנדפורד", 39.00m, 3, "/catalog/kids-book.jpg"),
            Product(65, "לילה טוב ירח", "ספר שינה מאת מרגרט וייז בראון", 59.00m, 3, "/catalog/kids-book.jpg"),
            Product(16, "מכונת Nespresso Vertuo Pop", "מכונת קפה לקפסולות", 549.00m, 4, "/catalog/coffee-machine.jpg"),
            Product(66, "מכונת Breville Barista Express", "מכונת אספרסו ביתית", 1290.00m, 4, "/catalog/coffee-machine.jpg"),
            Product(67, "מכונת Philips HD7461", "מכונת קפה פילטר ל־12 כוסות", 349.00m, 4, "/catalog/coffee-machine.jpg"),
            Product(68, "מקציף Nespresso Aeroccino", "מקציף חלב למשקאות חמים", 189.00m, 4, "/catalog/coffee-machine.jpg"),
            Product(17, "מצעי IKEA NATTJASMIN", "ציפה וזוג ציפיות למיטה זוגית", 219.00m, 4, "/catalog/bedding.jpg"),
            Product(69, "מצעי IKEA STJÄRNSTARR", "סט מצעים למיטת ילד", 149.00m, 4, "/catalog/bedding.jpg"),
            Product(70, "מצעי IKEA DVALA", "סט מצעים מכותנה למיטה זוגית", 329.00m, 4, "/catalog/bedding.jpg"),
            Product(71, "שמיכת IKEA SMÅSPORRE", "שמיכה דקה לקיץ", 279.00m, 4, "/catalog/bedding.jpg"),
            Product(18, "מנורת שולחן IKEA TERTIAL", "מנורת קריאה עם זרוע מתכווננת", 129.00m, 4, "/catalog/lamp.jpg"),
            Product(72, "מנורת רצפה IKEA HEKTAR", "מנורת עמידה לסלון", 189.00m, 4, "/catalog/lamp.jpg"),
            Product(73, "מנורת לילה IKEA FADO", "מנורת לילה קטנה", 89.00m, 4, "/catalog/lamp.jpg"),
            Product(19, "סיר IKEA HEMKOMST", "סיר נירוסטה 5 ליטר עם מכסה", 149.00m, 4, "/catalog/pot.jpg"),
            Product(74, "סיר IKEA MIDDAGSMAT", "סיר 2 ליטר עם מכסה", 99.00m, 4, "/catalog/pot.jpg"),
            Product(75, "מחבת Tefal", "מחבת 28 ס״מ", 149.00m, 4, "/catalog/pot.jpg"),
            Product(20, "מגבת אמבט IKEA TOFTBO", "מגבת כותנה בגודל אמבט", 39.90m, 4, "/catalog/towel.jpg"),
            Product(76, "מגבות ידיים IKEA TOFTBO", "זוג מגבות ידיים", 29.90m, 4, "/catalog/towel.jpg"),
            Product(77, "מגבת חוף IKEA TOFTBO", "מגבת גדולה לים", 49.90m, 4, "/catalog/towel.jpg"),
            Product(21, "כדור Adidas Tiro League", "כדור משחק בגודל 5", 79.00m, 5, "/catalog/soccer.jpg"),
            Product(78, "כדור Select Futsal", "כדור למשחק באולם", 129.00m, 5, "/catalog/soccer.jpg"),
            Product(79, "כדור אימון Nike", "כדור אימון עמיד", 49.00m, 5, "/catalog/soccer.jpg"),
            Product(80, "כדור ילדים Adidas", "כדור רך לילדים", 39.00m, 5, "/catalog/soccer.jpg"),
            Product(22, "מזרן Manduka PROlite", "מזרן יוגה בעובי 5 מ״מ", 89.00m, 5, "/catalog/yoga.jpg"),
            Product(81, "מזרן פילאטיס Gaiam", "מזרן אימון עבה", 129.00m, 5, "/catalog/yoga.jpg"),
            Product(82, "מזרן נסיעות Manduka", "מזרן דק לתיק", 59.00m, 5, "/catalog/yoga.jpg"),
            Product(23, "משקולת Domyos 5 ק״ג", "משקולת יד לאימון", 59.00m, 5, "/catalog/dumbbell.jpg"),
            Product(83, "משקולת Domyos 2 ק״ג", "משקולת יד קלה", 39.00m, 5, "/catalog/dumbbell.jpg"),
            Product(84, "משקולת Domyos 10 ק״ג", "משקולת יד כבדה", 119.00m, 5, "/catalog/dumbbell.jpg"),
            Product(24, "בקבוק Nike 750 מ״ל", "בקבוק אימון", 39.00m, 5, "/catalog/bottle.jpg"),
            Product(85, "בקבוק Nike 500 מ״ל", "בקבוק אימון קטן", 29.00m, 5, "/catalog/bottle.jpg"),
            Product(86, "בקבוק Hydro Flask", "בקבוק שומר חום וקור", 49.00m, 5, "/catalog/bottle.jpg"),
            Product(25, "שעון Samsung Galaxy Fit3", "שעון דופק לריצה ולאימון", 449.00m, 5, "/catalog/watch.jpg"),
            Product(87, "שעון Garmin Forerunner 55", "שעון GPS לריצה", 699.00m, 5, "/catalog/watch.jpg"),
            Product(88, "שעון Amazfit Bip 5", "שעון ספורט בסיסי", 299.00m, 5, "/catalog/watch.jpg"),
            Product(26, "שמן זית יד מרדכי 750 מ״ל", "שמן זית כתית מעולה", 42.90m, 6, "/catalog/olive-oil.jpg"),
            Product(89, "שמן זית יד מרדכי 500 מ״ל", "שמן זית כתית 500 מ״ל", 28.90m, 6, "/catalog/olive-oil.jpg"),
            Product(90, "שמן זית אורגני עץ הזית", "שמן זית אורגני 750 מ״ל", 54.90m, 6, "/catalog/olive-oil.jpg"),
            Product(91, "שמן זית ברכת הארץ", "שמן זית כתית בטעם עדין", 36.90m, 6, "/catalog/olive-oil.jpg"),
            Product(27, "קפה טורקי עלית", "קפה טחון 250 גרם", 28.90m, 6, "/catalog/coffee.jpg"),
            Product(92, "פולי קפה Lavazza", "פולי קפה 250 גרם", 34.90m, 6, "/catalog/coffee.jpg"),
            Product(93, "נסקפה נמס", "קפה נמס 200 גרם", 19.90m, 6, "/catalog/coffee.jpg"),
            Product(94, "קפה טחון עלית כהה", "קפה קלוי כהה 250 גרם", 42.90m, 6, "/catalog/coffee.jpg"),
            Product(28, "פסטה ברילה", "ספגטי 500 גרם", 7.90m, 6, "/catalog/pasta.jpg"),
            Product(95, "פסטה מלאה ברילה", "ספגטי מקמח מלא 500 גרם", 9.90m, 6, "/catalog/pasta.jpg"),
            Product(96, "פתיתים אסם", "פתיתים 500 גרם", 6.50m, 6, "/catalog/pasta.jpg"),
            Product(29, "דבש טהור יד מרדכי", "דבש טהור 350 גרם", 32.90m, 6, "/catalog/honey.jpg"),
            Product(97, "דבש פרחי בר יד מרדכי", "דבש פרחי בר 350 גרם", 24.90m, 6, "/catalog/honey.jpg"),
            Product(98, "דבש שיטה יד מרדכי", "דבש מפרחי שיטה 350 גרם", 44.90m, 6, "/catalog/honey.jpg"),
            Product(30, "שוקולד מריר עלית", "חפיסה 100 גרם", 14.90m, 6, "/catalog/chocolate.jpg"),
            Product(99, "שוקולד פרה", "חפיסת שוקולד חלב 100 גרם", 12.90m, 6, "/catalog/chocolate.jpg"),
            Product(100, "שוקולד מריר עלית עם אגוזים", "חפיסה 100 גרם עם אגוזים", 18.90m, 6, "/catalog/chocolate.jpg")
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
