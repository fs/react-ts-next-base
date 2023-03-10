import { expect, Page } from '@playwright/test';

export const signOut = async ({ page, baseURL = '' }: { page: Page; baseURL?: string }) => {
  await page.locator('[data-cy=sidebar-toggler]').click();

  await page.locator('[data-cy=sidebar]').locator('button', { hasText: 'Выйти' }).click();
  await expect(page).toHaveURL(new RegExp(baseURL));
};
