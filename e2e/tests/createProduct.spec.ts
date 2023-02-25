import { test, expect } from '@playwright/test';
import { products } from '../fixtures/products';

import { chooseFile } from '../helperActions/fileChooser';
import { loginAsSeller } from '../helperActions/login';
import { closeNotification } from '../helperActions/notification';
import { createProductBasicStep, removeProductCard } from '../helperActions/product';

test.use({
  storageState: './e2e/storages/withCity.json',
});

test.beforeEach(async ({ page }) => {
  await loginAsSeller({ page });
});

test.describe('Create product', () => {
  test('User create product', async ({ page }) => {
    const timestamp = Date.now();

    await page.locator('[data-cy=button-open-company]').click();

    await page.locator('[data-cy=create-product-button]').click();

    await expect(page).toHaveURL(new RegExp(`/draft`));

    await test.step('Step 1: Create product basic', async () => {
      await createProductBasicStep({ page, products: products.productBasic, timestamp });
    });

    await test.step('Step 2: Create product properties', async () => {
      const {
        productProperties: { property, article },
      } = products;

      await expect(
        page.locator('[data-cy=create-product-properties-title]', {
          hasText: 'Параметры товара',
        }),
      ).toBeVisible();

      await page
        .locator('[data-cy=select-properties-modal-button]', {
          hasText: 'Выбрать характеристики товара',
        })
        .click();

      await page
        .locator('div[id="select-properties"]', {
          hasText: 'Выберите характеристики товара',
        })
        .click();

      await page
        .locator("[id^='react-select']")
        .locator("[id*='option']", { hasText: new RegExp(`^${property}$`) })
        .click();

      await page
        .locator('div[id="select-properties"]', {
          hasText: 'Выберите характеристики товара',
        })
        .click();

      await expect(
        page.locator('[data-cy^=checked-property]', { hasText: property }),
      ).toBeVisible();

      await page.locator('[data-cy=select-properties-submit-button]').click();

      await page.locator('[data-cy="variants.0.variantProperties.0.propertyValue"]').fill(article);

      await page.locator('[data-cy="variants.0.expirationDate"]').click();

      await page.locator('[data-cy=no-date]').click();

      await page.locator('[data-cy=datepicker-button-submit]').click();

      await page.locator('[data-cy=add-photos-modal--variantPhotos]').click();
      await chooseFile({
        page,
        selector: '[data-cy=load-photo-input--add-photos-modal--variantPhotos]',
        filePath: './e2e/fixtures/images/logo.png',
      });
      await page
        .locator('[data-cy=add-photo-submit-button--add-photos-modal--variantPhotos]')
        .click();
      await expect(
        page.locator('[data-cy=variant-images-variantPhotos]').locator('img[data-cy^=photo]'),
      ).toHaveCount(1);

      await page.locator('[data-cy=add-photos-modal--variantCertificates]').click();
      await chooseFile({
        page,
        selector: '[data-cy=load-photo-input--add-photos-modal--variantCertificates]',
        filePath: './e2e/fixtures/images/logo.png',
      });
      await page
        .locator('[data-cy=add-photo-submit-button--add-photos-modal--variantCertificates]')
        .click();
      await expect(
        page.locator('[data-cy=variant-images-variantCertificates]').locator('img[data-cy^=photo]'),
      ).toHaveCount(1);

      await page.locator('[data-cy=create-product-properties-submit-button]').click();
    });

    await test.step('Step 3: Create product address', async () => {
      const {
        productAddress: { address, length, width, height, netWeight, grossWeight, packingMaterial },
      } = products;

      await page.locator('[data-cy="variants.0.length"]').fill(length);
      await page.locator('[data-cy="variants.0.width"]').fill(width);
      await page.locator('[data-cy="variants.0.height"]').fill(height);
      await page.locator('[data-cy="variants.0.netWeight"]').fill(netWeight);
      await page.locator('[data-cy="variants.0.grossWeight"]').fill(grossWeight);

      await page
        .locator('div[id="select-variants.0.packingMaterialId"]', { hasText: 'Материал упаковки' })
        .click();

      await page
        .locator("[id^='react-select']")
        .locator("[id*='option']", { hasText: new RegExp(`^${packingMaterial}$`) })
        .click();

      await expect(
        page.locator('[data-cy=create-product-address-title]', {
          hasText: 'Адрес и параметры упаковки',
        }),
      ).toBeVisible();

      await page.locator('[id=select-address]', { hasText: 'Выберите адрес' }).click();

      await page
        .locator("[id^='react-select']")
        .locator("[id*='option']", { hasText: address })
        .click();

      await page.locator('[data-cy=create-product-address-submit-button]').click();
    });
    await test.step('Step 4: Create product delivery condition', async () => {
      const {
        productDeliveryCondition: { comment, dellinFreightType, hazardClass },
      } = products;

      await expect(
        page.locator('[data-cy=create-product-delivery-condition-title]', {
          hasText: 'Параметры для службы доставки',
        }),
      ).toBeVisible();

      await page.locator('[data-cy="shipmentMethod_COURIER"]').click();

      await page.locator('[id=select-dellinFreightTypeId]', { hasText: 'Характер груза' }).click();

      await page
        .locator("[id^='react-select']")
        .locator("[id*='option']", { hasText: dellinFreightType })
        .click();

      await page.locator('[data-cy="deliveryConditionForVariant_false"]').click();

      await page.locator('[id=select-hazardClass]', { hasText: '1.0' }).click();

      await page.locator('[id=select-hazardClass]', { hasText: hazardClass }).click();

      await page.locator('[data-cy="insuranceRequired_true"]').click();

      await page.locator('[data-cy="comment"]').fill(comment);

      await page.locator('[data-cy=create-delivery-condition-submit-button]').click();
    });

    await test.step('Step 5: Create product delivery', async () => {
      const {
        productDelivery: {
          cityFree,
          minCost,
          freeMinDays,
          freeMaxDays,
          cityPaid,
          price,
          minWeight,
          maxWeight,
          paidMinDays,
          paidMaxDays,
        },
      } = products;

      await expect(
        page.locator('[data-cy=create-product-delivery-title]', { hasText: 'Своя доставка' }),
      ).toBeVisible();

      await page.locator('[data-cy="disablePickup"]').click();

      await page.locator('[data-cy="freeRadio_true"]').click();

      await page.locator('div[id="productFreeDeliveries.0.cityId"]').click();

      await page.locator('input[id="productFreeDeliveries.0.cityId"][type=text]').fill(cityFree);
      await page
        .locator("[id^='react-select']")
        .locator("[id*='option']", { hasText: cityFree })
        .click();

      await page.locator('[data-cy="productFreeDeliveries.0.minCost"]').fill(minCost);
      await page.locator('[data-cy="productFreeDeliveries.0.minDays"]').fill(freeMinDays);
      await page.locator('[data-cy="productFreeDeliveries.0.maxDays"]').fill(freeMaxDays);

      await page.locator('[data-cy="paidRadio_true"]').click();

      await page.locator('[data-cy="productPaidDeliveries.0.price"]').fill(price);
      await page.locator('[data-cy="productPaidDeliveries.0.minWeight"]').fill(minWeight);
      await page.locator('[data-cy="productPaidDeliveries.0.maxWeight"]').fill(maxWeight);

      await page.locator('div[id="productPaidDeliveries.0.cityId"]').click();

      await page.locator('input[id="productPaidDeliveries.0.cityId"][type=text]').type(cityPaid);
      await page
        .locator("[id^='react-select']")
        .locator("[id*='option']", { hasText: cityPaid })
        .click();

      await page.locator('[data-cy="productPaidDeliveries.0.minDays"]').fill(paidMinDays);
      await page.locator('[data-cy="productPaidDeliveries.0.maxDays"]').fill(paidMaxDays);

      await page.locator('[data-cy=create-product-own-delivery-submit-button]').click();
    });

    await test.step('Step 6: Create product prices', async () => {
      const {
        productPrices: { price, stock, wholesaleLot, wholesalePrice, minShipmentLot },
      } = products;

      await expect(
        page.locator('[data-cy=create-product-prices-title]', { hasText: 'Цены' }),
      ).toBeVisible();

      await page.locator('[data-cy="variants.0.price"]').fill(price);
      await page.locator('[data-cy="variants.0.stock"]').fill(stock);
      await page.locator('[data-cy="variants.0.minShipmentLot"]').fill(minShipmentLot);
      await page.locator('[data-cy=wholesaleLot]').fill(wholesaleLot);
      await page.locator('[data-cy="variants.0.wholesalePrice"]').fill(wholesalePrice);

      await page.locator('[data-cy="vat_20"]').click();

      await page.locator('[data-cy=photo-confirmation-modal-button]').click();
      await chooseFile({
        page,
        selector: '[data-cy=load-photo-input--photo-confirmation-modal-button]',
        filePath: './e2e/fixtures/images/logo.png',
      });
      await page
        .locator('[data-cy=add-photo-submit-button--photo-confirmation-modal-button]')
        .click();
      await expect(
        page.locator('[data-cy=photo-confirmation-wrapper]').locator('img[data-cy^=photo]'),
      ).toHaveCount(1);

      await page.locator('[data-cy=create-product-prices-submit-button]').click();
    });

    await test.step('Step 7: Create product discounts', async () => {
      const {
        productDiscounts: { weeklyAmount, weekday, periodAmount },
      } = products;

      await expect(
        page.locator('[data-cy=create-product-discounts-title]', { hasText: 'Параметры скидки' }),
      ).toBeVisible();

      await page.locator('[data-cy="radio_singleDiscount"]').click();

      await page
        .locator('div[id="select-weeklyDiscounts.0.weekday"]', { hasText: 'День недели' })
        .click();

      await page
        .locator("[id^='react-select']")
        .locator("[id*='option']", { hasText: weekday })
        .click();

      await page.locator('[data-cy="weeklyDiscounts.0.amount"]').fill(weeklyAmount);
      await page.locator('[data-cy="periodDiscounts.0.amount"]').fill(periodAmount);

      await page.locator('[data-cy="periodDiscounts.0.startDate"]').click();

      await page
        .locator('.react-datepicker')
        .locator('.react-datepicker__navigation--next')
        .click();

      await page.locator('.react-datepicker').locator('.react-datepicker__day').nth(10).click();

      await page.locator('[data-cy=datepicker-button-submit]').click();

      await page.locator('[data-cy="periodDiscounts.0.endDate"]').click();

      await page
        .locator('.react-datepicker')
        .locator('.react-datepicker__navigation--next')
        .click();

      await page.locator('.react-datepicker').locator('.react-datepicker__day').nth(15).click();

      await page.locator('[data-cy=datepicker-button-submit]').click();

      await page.locator('[data-cy=create-product-template-button]').click();

      await closeNotification({ page, text: 'Шаблон успешно создан' });

      await page.locator('[data-cy=create-product-discounts-submit-button]').click();
    });

    await test.step('Step 8: Remove created product', async () => {
      const {
        productBasic: { name },
      } = products;

      await removeProductCard({ page, name: `${name}${timestamp}` });
    });
  });

  test('User remove draft product', async ({ page }) => {
    const timestamp = Date.now();
    await page.locator('[data-cy=button-open-company]').click();

    await page.locator('[data-cy=create-product-button]').click();

    await expect(page).toHaveURL(new RegExp(`/draft`));

    const {
      productBasic: { name },
      productBasic,
    } = products;
    await createProductBasicStep({ page, products: productBasic, timestamp });

    await expect(
      page.locator('[data-cy=create-product-properties-title]', {
        hasText: 'Параметры товара',
      }),
    ).toBeVisible();

    await page
      .locator('[data-testid=breadcrumbs]', {
        hasText: 'Мои товары',
      })
      .click();

    await removeProductCard({ page, name: `${name}${timestamp}` });
  });
});
