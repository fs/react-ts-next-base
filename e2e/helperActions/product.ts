import { expect, Page } from '@playwright/test';
import { closeNotification } from './notification';
import { products as productsFixture } from '../fixtures/products';

type TCloseNotification = {
  page: Page;
  name: string;
};

type TCreateProductBasicStep = {
  page: Page;
  products: typeof productsFixture['productBasic'];
  timestamp: number;
};

export const removeProductCard = async ({ page, name }: TCloseNotification) => {
  const cardLocator = page.locator('[data-testid=product-card-container]', {
    hasText: name,
  });

  await expect(await cardLocator).toBeVisible();

  await cardLocator.locator('button', { hasText: 'Удалить' }).click();
  await page.locator('text=Подтвердить').click();
  await closeNotification({ page, text: 'Продукт был успешно удален' });

  await expect(await cardLocator).not.toBeVisible();
};

export const createProductBasicStep = async ({
  page,
  products,
  timestamp,
}: TCreateProductBasicStep) => {
  const { category, subCategory, section, name, manufacturer, country, description } = products;

  await expect(
    page.locator('[data-cy=create-product-basic-title]', { hasText: 'Основная информация' }),
  ).toBeVisible();

  await page
    .locator('div[id="select-categories.0"]', {
      hasText: 'Категория товара',
    })
    .click();
  await page
    .locator("[id^='react-select']")
    .locator("[id*='option']", { hasText: new RegExp(`^${category}$`) })
    .click();

  await page
    .locator('div[id="select-categories.1"]', {
      hasText: 'Подкатегория товара',
    })
    .click();
  await page
    .locator("[id^='react-select']")
    .locator("[id*='option']", { hasText: new RegExp(`^${subCategory}$`) })
    .click();

  await page
    .locator('div[id="select-categories.2"]', {
      hasText: 'Раздел',
    })
    .click();
  await page
    .locator("[id^='react-select']")
    .locator("[id*='option']", { hasText: new RegExp(`^${section}$`) })
    .click();

  await page.locator('[data-cy=condition_USED]').click();

  await page.locator('[data-cy=name]').fill(`${name}${timestamp}`);

  await page.locator('[data-cy=manufacturer]').fill(manufacturer);

  await page.locator('div[id=country]').click();

  await page.locator('input[id=country][type=text]').fill(country);

  await page.locator("[id*='option']", { hasText: new RegExp(`^${country}$`) }).click();

  await page.locator('[data-cy=description]').fill(description);

  await page.locator('[data-cy=create-product-basic-submit-button]').click();
};
