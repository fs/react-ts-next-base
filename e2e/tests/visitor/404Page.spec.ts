import { test, expect } from '@playwright/test';

test.use({
  storageState: './e2e/storages/withCity.json',
});

test.describe('404 Page', () => {
  test('Visitor sees 404 page title', async ({ page }) => {
    const expectedTitle = 'Запрашиваемая страница не найдена!';

    await page.goto('/non-existent-page');
    await expect(page.locator('h1', { hasText: expectedTitle })).toBeVisible();
  });
});
