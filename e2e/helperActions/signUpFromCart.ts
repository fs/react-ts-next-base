import { expect, Page } from '@playwright/test';
import { users } from 'e2e/fixtures/users';

type TSignupFromCart = {
  page: Page;
  expectedPath?: string;
};

export const signupFromCart = async ({ page, expectedPath = '/dashboard' }: TSignupFromCart) => {
  const timestamp = Date.now();
  const {
    validUser: { firstName, lastName, middleName, code, password },
  } = users;
  const phoneNumber = (timestamp % 1000000000000).toString().slice(2);
  const email = `${timestamp}@test.com`;

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
  await expect(page.locator('[data-testid="message-for-user-from-cart"]')).toBeVisible();
};
