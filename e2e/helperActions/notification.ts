import { expect, Page } from '@playwright/test';

type TCloseNotification = {
  page: Page;
  text: string;
};

export const closeNotification = async ({ page, text }: TCloseNotification) => {
  await expect(page.locator('.Toastify__toast-container', { hasText: text })).toBeVisible();
  await page.locator('.Toastify__toast-container [aria-label="close"]').click();

  await expect(page.locator('.Toastify__toast-container', { hasText: text })).toHaveCount(0);
};
