# מערכת קניות

## Documentation (English)

| File | Contents |
|---|---|
| [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) | Directory tree, service order, responsibilities |
| [`QUALITY.md`](./QUALITY.md) | React 19, hooks, backend library currency, professionalism |
| [`AGENTS.md`](./AGENTS.md) | Instructions for AI coding tools |
| [`CLAUDE.md`](./CLAUDE.md) | Short AI entrypoint |
| [`shopping-client/FILE_GUIDE.md`](./shopping-client/FILE_GUIDE.md) | Frontend file-by-file guide |
| [`server-net/FILE_GUIDE.md`](./server-net/FILE_GUIDE.md) | Catalog API file-by-file guide |
| [`server-node/FILE_GUIDE.md`](./server-node/FILE_GUIDE.md) | Orders API file-by-file guide |

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

# E2E (המערכת חייבת לרוץ ב-Docker)
docker compose up --build -d
cd e2e && npm ci && npx playwright install chromium && npm test
```

## פיתוח מקומי בלי Docker

- SQL Server על פורט `1433`, משתמש `sa`, סיסמה `YourStrongPassword123!`.
- MongoDB על `mongodb://root:example@localhost:27017/orders?authSource=admin`.
- `dotnet run --project server-net/ShoppingApp.API`
- `npm run dev` בתוך `server-node` ובתוך `shopping-client`.

סיסמאות אלה מיועדות להרצה מקומית בלבד.
