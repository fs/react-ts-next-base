import { expect, Page } from '@playwright/test';
import { closeNotification } from './notification';

export const addProductToCart = async (page: Page) => {
  const ordersAmountElement = page.locator('[data-testid=orders-amount]');
  await expect(ordersAmountElement).not.toBeEmpty();
  const ordersAmount = await ordersAmountElement.textContent();

  const submitButton = page.locator('[data-cy=product-card-submit-button]');
  await submitButton.scrollIntoViewIfNeeded();
  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  await expect(await ordersAmountElement).not.toHaveText(String(ordersAmount));
  await closeNotification({ page, text: 'Товар “Тестовая перчатка #1” добавлен в корзину' });
};
