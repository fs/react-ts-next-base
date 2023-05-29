import { expect, test } from '@playwright/test';

test.describe('404 Page', () => {
  test('Visitor sees 404 page title', async ({ page }) => {
    const expectedTitle = "The page you're looking for can't be found.";

    await page.goto('/non-existent-page');
    expect(page.locator('h1', { hasText: expectedTitle }));
  });
});
