import { expect, Page } from '@playwright/test';

type TSignup = {
  page: Page;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  code: string;
  expectedPath?: string;
};

export const signup = async ({
  page,
  email,
  password,
  firstName,
  lastName,
  middleName,
  phoneNumber,
  code,
  expectedPath = '/dashboard',
}: TSignup) => {
  await page.goto('/auth?signup=true');
  await expect(page).toHaveURL(`/auth?signup=true`);

  await page.locator('[data-cy=lastName]').fill(lastName);
  await page.locator('[data-cy=firstName]').fill(firstName);
  await page.locator('[data-cy=middleName]').fill(middleName);
  await page.locator('[data-cy=email]').fill(email);
  await page.locator('[data-cy=phoneNumber]').fill(phoneNumber);
  await page.locator('[data-cy=phoneVerification]').click();
  await page.locator('[data-cy=codeInput]').fill(code);

  await page.locator('[data-cy=password]').fill(password);

  await page.locator('[data-cy=agreement]').click();
  await page.locator('[data-cy=submit-button]').click();
  await expect(page).toHaveURL(expectedPath);
};
