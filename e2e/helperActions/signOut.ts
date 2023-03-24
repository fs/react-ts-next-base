import { expect, Page } from '@playwright/test';

export const signOut = async ({
  page,
  expectedPath = '/signin',
}: {
  page: Page;
  expectedPath?: string;
}) => {
  await page.locator('[data-testid=dropdown-toggler]').click();
  await page.locator('[data-testid=sign-out]').click();

  await expect(page).toHaveURL(new RegExp(expectedPath));
};
