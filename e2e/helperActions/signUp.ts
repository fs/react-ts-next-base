import { expect, Page } from '@playwright/test';

type TSignup = {
  page: Page;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  expectedPath?: string;
};

export const signUp = async ({
  page,
  email,
  password,
  firstName,
  lastName,
  expectedPath = '',
}: TSignup) => {
  await page.goto('/signup');
  await expect(page).toHaveURL(`/signup`);

  await page.locator('[data-testid=input-firstName]').fill(firstName);
  await page.locator('[data-testid=input-lastName]').fill(lastName);
  await page.locator('[data-testid=input-email]').fill(email);
  await page.locator('[data-testid=input-password]').fill(password);

  await page.locator('[data-testid=submit-button]').click();
  await expect(page).toHaveURL(expectedPath);
};
