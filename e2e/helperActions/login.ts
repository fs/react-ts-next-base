import { expect, Page } from '@playwright/test';
import { users } from '../fixtures/users';

type TLoginAs = {
  page: Page;
  email: string;
  password: string;
};

export const loginAs = async ({ page, email, password }: TLoginAs) => {
  await page.goto('');
  await page.locator('text=ПРИСОЕДИНИТЬСЯ').click();
  await expect(page).toHaveURL(`/auth?signup=true`);
  await page.locator('[data-testid="tab-signin"]').click();
  await expect(page).toHaveURL(`/auth?signin=true`);
  await page.locator('[data-testid="login"]').fill(email);
  await page.locator('[data-testid="password"]').fill(password);
  await page.locator('[data-testid="submit-button"]').click();
  await expect(page).toHaveURL(`/dashboard`);
};
export const loginAsBuyer = async ({ page }: { page: Page }) => {
  await loginAs({ page, email: users.buyer.email, password: users.buyer.password });
};

export const loginAsSeller = async ({ page }: { page: Page }) => {
  await loginAs({ page, email: users.seller.email, password: users.seller.password });
};
