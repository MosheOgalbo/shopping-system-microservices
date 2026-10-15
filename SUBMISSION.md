# הגשת FreshCart

קישור יחיד לקוד כל הרכיבים:

https://github.com/MosheOgalbo/shopping-system-microservices

## הרצה

```bash
cp .env.example .env
docker compose up --build
```

| שירות | כתובת |
|---|---|
| ממשק | http://localhost:5173 |
| קטלוג | http://localhost:5177/api/Products |
| הזמנות | http://localhost:5001/api/orders |

הפעלת SQL Server הראשונה עשויה לקחת דקה–שתיים.

## מה בודקים

1. מסך הקניות מציג 20 מוצרים וטוען את הבאים מהשרת בגלילה. סינון קטגוריה וחיפוש חופשי מציגים את כל ההתאמות.
2. סינון לפי קטגוריה, שינוי כמות, והוספה לסל.
3. המשך הזמנה → טופס חובה (שם פרטי, שם משפחה, כתובת מלאה, מייל) ורשימת המוצרים.
4. אישור הזמנה שומר ב-MongoDB ומחזיר `{ id, status }`.
5. אם השרת נכשל — העגלה נשארת ומוצגת שגיאה.

שם פרטי ושם משפחה הם שני שדות נפרדים. כך קל יותר לאמת ולשמור, והם ממלאים יחד את דרישת "שם פרטי ומשפחה".

הסבר על חלוקת השירותים ועל הבחירה בכל טכנולוגיה: [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## למה MongoDB ולא Elasticsearch

המטלה מתירה MongoDB או Elasticsearch, עם העדפה ל-Elasticsearch כשיש חיפוש. כאן NoSQL משמש לשמירת מסמך הזמנה אחד (לקוח + מערך מוצרים). MongoDB מתאים לזה ישירות. Elasticsearch חזק לחיפוש וקיטוע, לא לעסקת checkout.

## בדיקות בלי Docker מלא

```bash
cd server-net && dotnet test
cd server-node && npm test
cd shopping-client && npm test
```
