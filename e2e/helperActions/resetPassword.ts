import { Page, expect } from '@playwright/test';

export const resetPassword = async ({ page, email }: { page: Page; email: string }) => {
  await page.goto('/reset_password');
  await expect(page).toHaveURL(`/reset_password`);

  await page.locator('[data-cy=email]').fill(email);

  await page.locator('[data-cy=submit-button]').click();
};
