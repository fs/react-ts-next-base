import { expect, Page } from '@playwright/test';

type TSignIn = {
  page: Page;
  email: string;
  password: string;
  expectedPath?: string;
};

export const signIn = async ({ page, email, password, expectedPath = '' }: TSignIn) => {
  await page.goto('/signin');
  await page.locator('[data-testid="input-email"]').fill(email);
  await page.locator('[data-testid="input-password"]').fill(password);
  await page.locator('[data-testid="submit-button"]').click();
  await expect(page).toHaveURL(expectedPath);
};
