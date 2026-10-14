# מערכת קניות

שלושה רכיבים, לפי מטלת הבית:

| רכיב | טכנולוגיה | תפקיד |
|---|---|---|
| `shopping-client` | React + Redux Toolkit | מסך רשימת הקניות ומסך סיכום ההזמנה |
| `server-net` | .NET 10, Entity Framework Core, SQL Server | קטגוריות ומוצרים |
| `server-node` | Node.js, Express, MongoDB | שמירת ההזמנה |

MongoDB הוא מסד NoSQL המותר במטלה. אין צורך בקובץ mapping של Elasticsearch.

## הרצה

נדרש Docker.

```bash
docker compose up --build
```

| שירות | כתובת |
|---|---|
| ממשק | http://localhost:5173 |
| קטלוג | http://localhost:5177/api/Products |
| הזמנות | http://localhost:5001/api/orders |
| בדיקת קטלוג | http://localhost:5177/health |
| בדיקת הזמנות | http://localhost:5001/health |

העלייה הראשונה של SQL Server יכולה לקחת דקה-שתיים.

## שימוש

1. במסך הקניות נטענות הקטגוריות והמוצרים.
2. בוחרים קטגוריה, משנים כמות, ולוחצים **הוסף מוצר לסל**. הסל מוצג באותו מסך.
3. **המשך הזמנה** פותח טופס עם שם פרטי, שם משפחה, כתובת מלאה ומייל, ואת רשימת המוצרים.
4. **אשר הזמנה** שומר ב-MongoDB את פרטי הלקוח ואת מערך המוצרים. אם השמירה נכשלת, המערכת מציגה שגיאה ולא מנקה את הסל.

## בדיקות

```bash
cd server-net && dotnet test
cd server-node && npm test
cd shopping-client && npm test
```

## פיתוח מקומי בלי Docker

- SQL Server על פורט `1433`, משתמש `sa`, סיסמה `YourStrongPassword123!`.
- MongoDB על `mongodb://root:example@localhost:27017/orders?authSource=admin`.
- `dotnet run --project server-net/ShoppingApp.API`
- `npm run dev` בתוך `server-node` ובתוך `shopping-client`.

סיסמאות אלה מיועדות להרצה מקומית בלבד.
