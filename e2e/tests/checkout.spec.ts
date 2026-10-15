import { expect, test } from '@playwright/test';

test.describe('shopping checkout flow', () => {
  test('loads catalog, adds quantity, submits a real order, and clears the cart', async ({ page }) => {
    const email = `e2e.${Date.now()}@example.com`;

    await page.goto('/shopping');
    await expect(page.getByRole('heading', { name: 'בחרו מוצרים לסל' })).toBeVisible();
    await expect(page.getByText('מציג 20 מתוך 100')).toBeVisible();
    await expect(page.locator('article')).toHaveCount(20);

    await page.getByLabel('חיפוש מוצרים').fill('לפטופ');
    await expect(page.getByText('נמצאו 4 מוצרים')).toBeVisible();
    await expect(page.locator('article')).toHaveCount(4);
    await page.getByLabel('חיפוש מוצרים').fill('');
    await expect(page.getByText('מציג 20 מתוך 100')).toBeVisible();

    await page.getByRole('combobox', { name: 'בחירת קטגוריה' }).click();
    await expect(page.getByRole('option', { name: /כל הקטגוריות/ })).toContainText('100 פריטים');
    await expect(page.getByRole('option', { name: /ביגוד/ })).toContainText('17 פריטים');
    await page.getByRole('option', { name: /ביגוד/ }).click();
    await expect(page.getByText('נמצאו 17 מוצרים')).toBeVisible();
    await expect(page.locator('article')).toHaveCount(17);
    await expect(page.getByRole('heading', { name: 'חולצה כחולה' })).toBeVisible();

    const shirtCard = page.locator('article').filter({ hasText: 'חולצה כחולה' });
    await shirtCard.getByRole('button', { name: 'הגדל כמות של חולצה כחולה' }).click();
    await shirtCard.getByRole('button', { name: 'הגדל כמות של חולצה כחולה' }).click();
    await shirtCard.getByRole('button', { name: 'הוסף מוצר לסל: חולצה כחולה' }).click();

    await expect(page.getByTestId('cart-count')).toHaveText('3 פריטים');
    await expect(page.getByLabel('עגלת קניות - 3 פריטים')).toBeVisible();

    await page.getByRole('button', { name: 'המשך הזמנה' }).click();
    await expect(page).toHaveURL(/\/order$/);
    await expect(page.getByRole('heading', { name: 'השלמת ההזמנה' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'חולצה כחולה' })).toBeVisible();
    await expect(page.getByText('₪89.99 × 3')).toBeVisible();

    await page.getByLabel(/שם פרטי/).fill('דנה');
    await page.getByLabel(/שם משפחה/).fill('כהן');
    await page.getByLabel(/כתובת משלוח/).fill('הרצל 10, תל אביב');
    await page.getByLabel(/כתובת מייל/).fill(email);

    const createOrder = page.waitForResponse(response =>
      response.url().includes('/api/orders')
      && response.request().method() === 'POST'
    );

    await page.getByRole('button', { name: 'אשר הזמנה' }).click();
    const response = await createOrder;
    expect(response.status()).toBe(201);
    const body = await response.json() as { id: string; status: string };
    expect(body.status).toBe('created');
    expect(body.id.length).toBeGreaterThan(0);

    await expect(page.getByText('ההזמנה נשלחה בהצלחה')).toBeVisible();
    await expect(page.getByText(body.id)).toBeVisible();

    await page.getByRole('button', { name: 'המשך קניות' }).click();
    await expect(page).toHaveURL(/\/shopping$/);
    await expect(page.getByTestId('cart-count')).toHaveText('0 פריטים');
  });

  test('keeps the cart and shows an error when the orders API fails', async ({ page }) => {
    await page.route(
      (url) => url.href.includes('/api/orders'),
      async (route) => {
        if (route.request().method() === 'POST') {
          await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Server error' }),
          });
          return;
        }
        await route.continue();
      },
    );

    await page.goto('/shopping');
    const shirtCard = page.locator('article').filter({ hasText: 'חולצה כחולה' });
    await shirtCard.getByRole('button', { name: 'הוסף מוצר לסל: חולצה כחולה' }).click();
    await expect(page.getByTestId('cart-count')).toHaveText('1 פריטים');

    await page.getByRole('button', { name: 'המשך הזמנה' }).click();
    await expect(page).toHaveURL(/\/order$/);

    await page.getByLabel(/שם פרטי/).fill('נועה');
    await page.getByLabel(/שם משפחה/).fill('לוי');
    await page.getByLabel(/כתובת משלוח/).fill('אלנבי 20, תל אביב');
    await page.getByLabel(/כתובת מייל/).fill(`fail.${Date.now()}@example.com`);

    const failedOrder = page.waitForResponse(response =>
      response.url().includes('/api/orders')
      && response.request().method() === 'POST'
      && response.status() === 500
    );

    await page.getByRole('button', { name: 'אשר הזמנה' }).click();
    await failedOrder;

    await expect(page.getByText(/שגיאה בשליחת ההזמנה|Server error/)).toBeVisible();
    await expect(page.getByText('ההזמנה נשלחה בהצלחה')).toHaveCount(0);
    await expect(page.getByLabel('עגלת קניות - 1 פריטים')).toBeVisible();
    await expect(page).toHaveURL(/\/order$/);
  });
});
