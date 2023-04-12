import { Page } from '@playwright/test';

export const signOut = async ({ page }: { page: Page }) => {
  await page.locator('[data-testid=dropdown-toggler]').click();
  await page.locator('[data-testid=sign-out]').click();
};
