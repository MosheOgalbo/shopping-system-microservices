using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShoppingApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RenameCatalogProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מחשב נייד 13 אינץ׳ לעבודה", "לפטופ Dell XPS 13" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "אוזניות אלחוטיות עם ביטול רעשים", "אוזניות Sony WH-1000XM5" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name" },
                values: new object[] { "חולצת ספורט כחולה", "חולצת Nike Dri-FIT כחולה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ז'קט ג'ינס קלאסי", "ז'קט Levi's Trucker" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר מאת רוברט ס. מרטין", "קוד נקי" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שלושת ספרי הטרילוגיה", "שר הטבעות - מארז" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טלפון עם מסך 6.2 אינץ׳", "סמארטפון Samsung Galaxy S24" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טאבלט 10.9 אינץ׳ לקריאה ולצפייה", "אייפד 10.9" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רמקול בלוטות׳ נייד", "רמקול JBL Flip 6" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "Name",
                value: "ג'ינס Levi's 501");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "Name",
                value: "נעלי Nike Revolution 7");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                column: "Name",
                value: "סוודר צמר Uniqlo");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רומן מאת ג'ורג' אורוול", "1984" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר בישול מאת סאמין נוסארט", "מלח שומן חומצה חום" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר מאויר מאת אריק קרל", "הזחל הרעב מאוד" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מכונת קפה לקפסולות", "מכונת Nespresso Vertuo Pop" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                column: "Name",
                value: "מצעי IKEA NATTJASMIN");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מנורת קריאה עם זרוע מתכווננת", "מנורת שולחן IKEA TERTIAL" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "Description", "Name" },
                values: new object[] { "סיר נירוסטה 5 ליטר עם מכסה", "סיר IKEA HEMKOMST" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20,
                column: "Name",
                value: "מגבת אמבט IKEA TOFTBO");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 21,
                column: "Name",
                value: "כדור Adidas Tiro League");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מזרן יוגה בעובי 5 מ״מ", "מזרן Manduka PROlite" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "Description", "Name" },
                values: new object[] { "משקולת יד לאימון", "משקולת Domyos 5 ק״ג" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "Description", "Name" },
                values: new object[] { "בקבוק אימון", "בקבוק Nike 750 מ״ל" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 25,
                column: "Name",
                value: "שעון Samsung Galaxy Fit3");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 26,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שמן זית כתית מעולה", "שמן זית יד מרדכי 750 מ״ל" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 27,
                column: "Name",
                value: "קפה טורקי עלית");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 28,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספגטי 500 גרם", "פסטה ברילה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 29,
                column: "Name",
                value: "דבש טהור יד מרדכי");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 30,
                columns: new[] { "Description", "Name" },
                values: new object[] { "חפיסה 100 גרם", "שוקולד מריר עלית" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 31,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מחשב נייד קל של Apple", "מקבוק אייר 13" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 32,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מחשב נייד ללימודים", "לפטופ Lenovo IdeaPad 3" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 33,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מחשב נייד עסקי עם זיכרון 16GB", "לפטופ HP EliteBook 840" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 34,
                columns: new[] { "Description", "Name" },
                values: new object[] { "אוזניות ספורט אלחוטיות", "אוזניות JBL Endurance Run 2" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 35,
                columns: new[] { "Description", "Name" },
                values: new object[] { "אוזניות סטודיו סגורות", "אוזניות Audio-Technica ATH-M50x" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 36,
                columns: new[] { "Description", "Name" },
                values: new object[] { "אוזניות חוטיות עם חיבור USB-C", "אוזניות Samsung EO-IC100" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 37,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טלפון עם מסך 6.6 אינץ׳", "סמארטפון Samsung Galaxy A35" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 38,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טלפון עם מצלמה כפולה", "אייפון 16" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 39,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טאבלט 8.7 אינץ׳ לקריאה", "טאבלט Samsung Galaxy Tab A9" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 40,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טאבלט 11 אינץ׳ עם Apple Pencil", "אייפד אייר 11" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 41,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רמקול בלוטות׳ לחדר", "רמקול Bose SoundLink Flex" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 42,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רמקול כיס לטיול", "רמקול Sony SRS-XB100" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 43,
                columns: new[] { "Description", "Name" },
                values: new object[] { "חולצת פולו מכותנה", "חולצת פולו Lacoste" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 44,
                column: "Name",
                value: "חולצת פשתן Zara");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 45,
                column: "Name",
                value: "חולצה מכופתרת Calvin Klein");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 46,
                column: "Name",
                value: "ז'קט ג'ינס Levi's");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 47,
                column: "Name",
                value: "ז'קט The North Face");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 48,
                column: "Name",
                value: "מעיל גשם Columbia");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 49,
                column: "Name",
                value: "ג'ינס Lee");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 50,
                column: "Name",
                value: "ג'ינס Diesel");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 51,
                columns: new[] { "Description", "Name" },
                values: new object[] { "נעליים ליום יום", "נעלי Adidas Samba" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 52,
                column: "Name",
                value: "נעלי Skechers Go Walk");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 53,
                column: "Name",
                value: "סוודר כותנה H&M");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 54,
                column: "Name",
                value: "קרדיגן Uniqlo");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 55,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספרם של קורמן, לייזרסון וריבסט", "מבוא לאלגוריתמים" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 56,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספרם של סילברשץ, קורת וסודרשאן", "מושגי מערכות מסדי נתונים" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 57,
                column: "Name",
                value: "Python Crash Course");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 58,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שני הספרים הראשונים", "הארי פוטר - מארז" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 59,
                columns: new[] { "Description", "Name" },
                values: new object[] { "גאווה ודעה קדומה ושכל וריגוש", "ג'יין אוסטן - מארז" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 60,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רומן מאת גבריאל גרסיה מרקס", "מאה שנים של בדידות" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 61,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רומן מתח מאת סטיג לארסון", "הנערה עם קעקוע הדרקון" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 62,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר בישול מאת יוטם אוטולנגי", "Ottolenghi Simple" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 63,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר בישול מאת אוטולנגי ותמימי", "ירושלים" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 64,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר חיפוש מאת מרטין הנדפורד", "איפה וולי?" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 65,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר שינה מאת מרגרט וייז בראון", "לילה טוב ירח" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 66,
                column: "Name",
                value: "מכונת Breville Barista Express");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 67,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מכונת קפה פילטר ל־12 כוסות", "מכונת Philips HD7461" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 68,
                column: "Name",
                value: "מקציף Nespresso Aeroccino");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 69,
                column: "Name",
                value: "מצעי IKEA STJÄRNSTARR");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 70,
                columns: new[] { "Description", "Name" },
                values: new object[] { "סט מצעים מכותנה למיטה זוגית", "מצעי IKEA DVALA" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 71,
                column: "Name",
                value: "שמיכת IKEA SMÅSPORRE");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 72,
                column: "Name",
                value: "מנורת רצפה IKEA HEKTAR");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 73,
                column: "Name",
                value: "מנורת לילה IKEA FADO");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 74,
                column: "Name",
                value: "סיר IKEA MIDDAGSMAT");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 75,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מחבת 28 ס״מ", "מחבת Tefal" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 76,
                column: "Name",
                value: "מגבות ידיים IKEA TOFTBO");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 77,
                column: "Name",
                value: "מגבת חוף IKEA TOFTBO");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 78,
                column: "Name",
                value: "כדור Select Futsal");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 79,
                column: "Name",
                value: "כדור אימון Nike");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 80,
                column: "Name",
                value: "כדור ילדים Adidas");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 81,
                column: "Name",
                value: "מזרן פילאטיס Gaiam");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 82,
                column: "Name",
                value: "מזרן נסיעות Manduka");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 83,
                column: "Name",
                value: "משקולת Domyos 2 ק״ג");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 84,
                column: "Name",
                value: "משקולת Domyos 10 ק״ג");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 85,
                column: "Name",
                value: "בקבוק Nike 500 מ״ל");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 86,
                column: "Name",
                value: "בקבוק Hydro Flask");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 87,
                column: "Name",
                value: "שעון Garmin Forerunner 55");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 88,
                column: "Name",
                value: "שעון Amazfit Bip 5");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 89,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שמן זית כתית 500 מ״ל", "שמן זית יד מרדכי 500 מ״ל" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 90,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שמן זית אורגני 750 מ״ל", "שמן זית אורגני עץ הזית" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 91,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שמן זית כתית בטעם עדין", "שמן זית ברכת הארץ" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 92,
                column: "Name",
                value: "פולי קפה Lavazza");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 93,
                column: "Name",
                value: "נסקפה נמס");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 94,
                columns: new[] { "Description", "Name" },
                values: new object[] { "קפה קלוי כהה 250 גרם", "קפה טחון עלית כהה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 95,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספגטי מקמח מלא 500 גרם", "פסטה מלאה ברילה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 96,
                column: "Name",
                value: "פתיתים אסם");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 97,
                column: "Name",
                value: "דבש פרחי בר יד מרדכי");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 98,
                column: "Name",
                value: "דבש שיטה יד מרדכי");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 99,
                column: "Name",
                value: "שוקולד פרה");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 100,
                columns: new[] { "Description", "Name" },
                values: new object[] { "חפיסה 100 גרם עם אגוזים", "שוקולד מריר עלית עם אגוזים" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מחשב נייד לעבודה וללימודים", "לפטופ Dell" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "אוזניות עם ביטול רעשים", "אוזניות אלחוטיות" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name" },
                values: new object[] { "חולצת כותנה איכותית", "חולצה כחולה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ז'קט קל לעונת המעבר", "ז'קט קלאסי" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר ללימוד תכנות מעשי", "ספר תכנות" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שלושה ספרים נבחרים", "מארז ספרים" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טלפון עם מסך 6.5 אינץ'", "סמארטפון" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טאבלט 10 אינץ' לקריאה ולצפייה", "טאבלט" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רמקול בלוטות' לחדר ולטיולים", "רמקול נייד" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "Name",
                value: "ג'ינס כהה");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "Name",
                value: "נעלי ריצה");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                column: "Name",
                value: "סוודר צמר");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רומן כריכה רכה", "רומן" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מתכונים למטבח הביתי", "ספר בישול" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר מאויר לילדים", "ספר ילדים" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מכונת קפה לשימוש ביתי", "מכונת קפה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                column: "Name",
                value: "סט מצעים");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מנורת קריאה עם אור חם", "מנורת שולחן" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "Description", "Name" },
                values: new object[] { "סיר 5 ליטר עם מכסה", "סיר נירוסטה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20,
                column: "Name",
                value: "מגבת אמבט");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 21,
                column: "Name",
                value: "כדור כדורגל");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מזרן אימון בעובי 6 מ\"מ", "מזרן יוגה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "Description", "Name" },
                values: new object[] { "משקולת יד 5 ק\"ג", "משקולת יד" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "Description", "Name" },
                values: new object[] { "בקבוק 750 מ\"ל", "בקבוק ספורט" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 25,
                column: "Name",
                value: "שעון ספורט");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 26,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שמן זית כתית 750 מ\"ל", "שמן זית" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 27,
                column: "Name",
                value: "קפה טחון");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 28,
                columns: new[] { "Description", "Name" },
                values: new object[] { "פסטה 500 גרם", "פסטה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 29,
                column: "Name",
                value: "דבש טהור");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 30,
                columns: new[] { "Description", "Name" },
                values: new object[] { "חפיסת שוקולד מריר 100 גרם", "שוקולד מריר" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 31,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מחשב נייד קל של 14 אינץ'", "לפטופ קל לעבודה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 32,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מחשב נייד בסיסי ללימודים", "לפטופ לסטודנט" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 33,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מחשב נייד עם זיכרון 16GB", "לפטופ עסקי" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 34,
                columns: new[] { "Description", "Name" },
                values: new object[] { "אוזניות אלחוטיות לאימון", "אוזניות ספורט" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 35,
                columns: new[] { "Description", "Name" },
                values: new object[] { "אוזניות סגורות להאזנה", "אוזניות סטודיו" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 36,
                columns: new[] { "Description", "Name" },
                values: new object[] { "אוזניות עם חיבור 3.5 מ\"מ", "אוזניות חוטיות" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 37,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טלפון עם מסך 6.1 אינץ'", "סמארטפון קומפקטי" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 38,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טלפון עם מצלמה משולשת", "סמארטפון פרימיום" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 39,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טאבלט 8 אינץ' לקריאה", "טאבלט קל" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 40,
                columns: new[] { "Description", "Name" },
                values: new object[] { "טאבלט 11 אינץ' עם עט", "טאבלט לציור" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 41,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רמקול בלוטות' לחדר", "רמקול חדר" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 42,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רמקול קטן לטיול", "רמקול כיס" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 43,
                columns: new[] { "Description", "Name" },
                values: new object[] { "חולצת כותנה לבנה", "חולצה לבנה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 44,
                column: "Name",
                value: "חולצת פשתן");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 45,
                column: "Name",
                value: "חולצה מכופתרת");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 46,
                column: "Name",
                value: "ז'קט ג'ינס");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 47,
                column: "Name",
                value: "ז'קט חורף");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 48,
                column: "Name",
                value: "מעיל גשם");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 49,
                column: "Name",
                value: "ג'ינס בהיר");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 50,
                column: "Name",
                value: "ג'ינס סקיני");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 51,
                columns: new[] { "Description", "Name" },
                values: new object[] { "נעלי עור להליכה בעיר", "נעלי עיר" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 52,
                column: "Name",
                value: "נעלי הליכה");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 53,
                column: "Name",
                value: "סוודר כותנה");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 54,
                column: "Name",
                value: "קרדיגן");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 55,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מבוא לאלגוריתמים", "ספר אלגוריתמים" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 56,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר על בסיסי נתונים", "ספר בסיסי נתונים" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 57,
                column: "Name",
                value: "ספר פייתון");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 58,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שני ספרי ילדים", "מארז ספרי ילדים" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 59,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שני רומנים קלאסיים", "מארז קלאסיקה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 60,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רומן על תקופה היסטורית", "רומן היסטורי" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 61,
                columns: new[] { "Description", "Name" },
                values: new object[] { "רומן מתח בכריכה רכה", "רומן מתח" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 62,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מתכוני אפייה ביתית", "ספר אפייה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 63,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מתכונים מהשוק", "ספר ירקות" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 64,
                columns: new[] { "Description", "Name" },
                values: new object[] { "ספר צביעה לילדים", "ספר צביעה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 65,
                columns: new[] { "Description", "Name" },
                values: new object[] { "סיפור קצר לפני השינה", "ספר שינה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 66,
                column: "Name",
                value: "מכונת אספרסו");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 67,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מכונת פילטר ל־12 כוסות", "מכונת קפה פילטר" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 68,
                column: "Name",
                value: "מקציף חלב");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 69,
                column: "Name",
                value: "מצעי ילדים");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 70,
                columns: new[] { "Description", "Name" },
                values: new object[] { "סט מצעים מכותנה", "מצעי כותנה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 71,
                column: "Name",
                value: "שמיכת קיץ");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 72,
                column: "Name",
                value: "מנורת רצפה");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 73,
                column: "Name",
                value: "מנורת לילה");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 74,
                column: "Name",
                value: "סיר קטן");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 75,
                columns: new[] { "Description", "Name" },
                values: new object[] { "מחבת 28 ס\"מ", "מחבת" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 76,
                column: "Name",
                value: "מגבת ידיים");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 77,
                column: "Name",
                value: "מגבת חוף");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 78,
                column: "Name",
                value: "כדור אולמות");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 79,
                column: "Name",
                value: "כדור אימון");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 80,
                column: "Name",
                value: "כדור ילדים");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 81,
                column: "Name",
                value: "מזרן פילאטיס");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 82,
                column: "Name",
                value: "מזרן נסיעות");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 83,
                column: "Name",
                value: "משקולת 2 ק\"ג");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 84,
                column: "Name",
                value: "משקולת 10 ק\"ג");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 85,
                column: "Name",
                value: "בקבוק 500 מ\"ל");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 86,
                column: "Name",
                value: "בקבוק תרמי");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 87,
                column: "Name",
                value: "שעון ריצה");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 88,
                column: "Name",
                value: "שעון בסיסי");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 89,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שמן זית כתית 500 מ\"ל", "שמן זית 500 מ\"ל" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 90,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שמן זית אורגני 750 מ\"ל", "שמן זית אורגני" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 91,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שמן זית בטעם עדין", "שמן זית עדין" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 92,
                column: "Name",
                value: "קפה פולים");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 93,
                column: "Name",
                value: "קפה נמס");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 94,
                columns: new[] { "Description", "Name" },
                values: new object[] { "קפה טחון קלוי כהה 250 גרם", "קפה טחון כהה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 95,
                columns: new[] { "Description", "Name" },
                values: new object[] { "פסטה מקמח מלא 500 גרם", "פסטה מלאה" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 96,
                column: "Name",
                value: "פתיתים");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 97,
                column: "Name",
                value: "דבש פרחי בר");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 98,
                column: "Name",
                value: "דבש שיטה");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 99,
                column: "Name",
                value: "שוקולד חלב");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 100,
                columns: new[] { "Description", "Name" },
                values: new object[] { "שוקולד מריר עם אגוזים 100 גרם", "שוקולד אגוזים" });
        }
    }
}
