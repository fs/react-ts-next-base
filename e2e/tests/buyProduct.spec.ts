import { test, expect, Page } from '@playwright/test';
import { loginAsBuyer } from '../helperActions/login';
import { addProductToCart } from '../helperActions/addProductToCart';

test.use({
  storageState: './e2e/storages/withCity.json',
});

test.describe.configure({ mode: 'serial' });

const chooseProduct = async (page: Page) => {
  await page.goto('dashboard');
  await expect(page).toHaveURL('dashboard');

  await page.locator('[data-testid="tab-BUYER"]').click();
  await expect(page).toHaveURL('dashboard?direction=BUYER');

  const mainCompany = page.locator('[data-cy="status-company"]');

  if ((await mainCompany.textContent()) === 'Установить как основную') {
    mainCompany.click();
  }

  await expect(mainCompany).toContainText('Основная компания');

  await page.locator('[data-testid="button-open-company"]').click();
  await expect(page).toHaveURL('dashboard/company/2/orders');

  await page.locator('[data-cy="header-menu"]').click();

  await page.locator('text=Каталог товаров').click();
  await expect(page).toHaveURL('catalog');

  await page.locator('[data-testid="buy-product-button"]').click();
  await expect(page).toHaveURL('product/1');
};

test.beforeEach(async ({ page }) => {
  await loginAsBuyer({ page });
});
test.describe('buy product', () => {
  test('steps', async ({ page }) => {
    await test.step('Buyer add product to cart', async () => {
      await chooseProduct(page);
      await addProductToCart(page);
    });

    await test.step('Buyer buy product and delete from cart', async () => {
      await chooseProduct(page);

      const buyNowButton = page.locator('text=Купить сейчас');
      await buyNowButton.scrollIntoViewIfNeeded();
      await expect(buyNowButton).toBeEnabled();
      await buyNowButton.click();
      await expect(page).toHaveURL(/.*cart/);

      const lastAddedOrderCard = await page.locator('[data-cy=order-list-item]').first();

      const orderId = await lastAddedOrderCard.getAttribute('data-order-id');

      const deleteOrderButton = lastAddedOrderCard.locator('text=Удалить заказ');
      await deleteOrderButton.scrollIntoViewIfNeeded();
      await expect(deleteOrderButton).toBeVisible();
      await deleteOrderButton.click();

      await page.locator('[data-cy="confirm-modal-button"]').click();

      await expect(page.locator('[data-cy=notifier]')).toHaveText(
        `Заказ №${orderId} был успешно удален`,
      );
    });

    await test.step('Buyer buy product and confirm order in cart', async () => {
      await chooseProduct(page);

      const buyNowButton = page.locator('text=Купить сейчас');
      await buyNowButton.scrollIntoViewIfNeeded();
      await expect(buyNowButton).toBeEnabled();
      await buyNowButton.click();
      await expect(page).toHaveURL(/.*cart/);

      const lastAddedOrderCard = await page.locator('[data-cy=order-list-item]').first();

      const orderId = await lastAddedOrderCard.getAttribute('data-order-id');

      const confirmOrderButton = lastAddedOrderCard.locator('text=Оформить заказ');
      await confirmOrderButton.scrollIntoViewIfNeeded();
      await expect(confirmOrderButton).toBeVisible();
      await confirmOrderButton.click();

      await page.locator('[data-cy="confirm-modal-button"]').click();

      await expect(page.locator('[data-cy=notifier]')).toHaveText(`Заказ №${orderId} оформлен`);
      await expect(page).toHaveURL(`dashboard/company/2/orders/${orderId}?fromOrderPage=true`, {
        timeout: 15000,
      });

      await expect(page.locator('[data-testid=order-details]')).toHaveText(
        new RegExp(`Заказ № ${orderId}`),
      );
    });
  });
});
