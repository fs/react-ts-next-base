import { expect, test } from '@playwright/test';

import { signOut } from 'e2e/helperActions/signOut';
import { signupFromCart } from 'e2e/helperActions/signUpFromCart';
import { closeNotification } from 'e2e/helperActions/notification';
import { addProductToCart } from 'e2e/helperActions/addProductToCart';
import { createCompanyBuyer } from 'e2e/helperActions/company';

import { company } from 'e2e/fixtures/company';

test.use({
  storageState: './e2e/storages/withCity.json',
});

test.describe('Sign Up from cart with order', () => {
  test('Visitor sign-ups from cart with order and with valid credentials and place order', async ({
    page,
    baseURL,
  }) => {
    const timestamp = Date.now();

    await page.goto('/');
    await expect(page).toHaveURL('/');

    await page.locator('[data-testid="buy-product-button"]').click();
    await expect(page).toHaveURL('product/1');

    await addProductToCart(page);

    await page.locator('[data-testid="cart-button"]').click();
    await expect(page).toHaveURL('cart');

    const lastAddedOrderCard = await page.locator('[data-cy=order-list-item]').first();
    const orderId = await lastAddedOrderCard.getAttribute('data-order-id');

    await page.locator('[data-testid="order-item-submit-button"]').click();
    await signupFromCart({ page });

    await page.locator('[data-cy=create-first-buyer-company-button]').click();
    await createCompanyBuyer({ page, company, timestamp, route: '/orders', isFromCart: true });

    await page.locator('[data-testid="confirm-reserved-order-button"]').click();
    await page.locator('[data-testid="confirm-modal-button"]').click();
    await closeNotification({ page, text: `Заказ №${orderId} подтвержден` });
    await expect(page.locator('[data-testid="order-details"]')).toBeVisible();

    await signOut({ page, baseURL });
  });

  test('Visitor sign-ups from cart with order and with valid credentials and cancel order', async ({
    page,
    baseURL,
  }) => {
    const timestamp = Date.now();

    await page.goto('/');
    await expect(page).toHaveURL('/');

    await page.locator('[data-testid="buy-product-button"]').click();
    await expect(page).toHaveURL('product/1');

    await addProductToCart(page);

    await page.locator('[data-testid="cart-button"]').click();
    await expect(page).toHaveURL('cart');

    const lastAddedOrderCard = await page.locator('[data-cy=order-list-item]').first();
    const orderId = await lastAddedOrderCard.getAttribute('data-order-id');

    await page.locator('[data-testid="order-item-submit-button"]').click();
    await signupFromCart({ page });

    await page.locator('[data-cy=create-first-buyer-company-button]').click();
    await createCompanyBuyer({ page, company, timestamp, isFromCart: true, route: '/orders' });

    await page.locator('[data-testid="cancel-reserved-order-button"]').click();
    await page.locator('[data-testid="confirm-modal-button"]').click();
    await closeNotification({ page, text: `Заказ №${orderId} отменен` });

    await signOut({ page, baseURL });
  });

  test('Visitor sign-ups from cart with order and with valid credentials and request support', async ({
    page,
    baseURL,
  }) => {
    const timestamp = Date.now();

    await page.goto('/');
    await expect(page).toHaveURL('/');

    await page.locator('[data-testid="buy-product-button"]').click();
    await expect(page).toHaveURL('product/1');

    await addProductToCart(page);

    await page.locator('[data-testid="cart-button"]').click();
    await expect(page).toHaveURL('cart');

    await page.locator('[data-testid="order-item-submit-button"]').click();
    await signupFromCart({ page });

    await page.locator('[data-cy=create-first-buyer-company-button]').click();
    await createCompanyBuyer({ page, company, timestamp, isFromCart: true, route: '/orders' });

    await page.locator('[data-testid="request-support-reserved-order-button"]').click();
    await page.locator('[data-testid="message"]').fill(`message${timestamp}`);
    await page.locator('[data-testid="submit-button"]').click();
    await closeNotification({ page, text: `Сообщение в службу поддержки успешно отправлено` });

    await signOut({ page, baseURL });
  });
});
