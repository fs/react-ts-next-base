import { test, expect } from '@playwright/test';

import { company } from '../../fixtures/company';
import { location } from '../../fixtures/location';
import { users } from '../../fixtures/users';

import {
  createCompanyLocation,
  createCompanySeller,
  destroyCompanyLocation,
} from '../../helperActions/company';
import { signup } from '../../helperActions/signUp';

test.use({
  storageState: './e2e/storages/withCity.json',
});

test.describe('createCompanyPage', () => {
  test('User creates first and second company, create and destroy location', async ({ page }) => {
    const timestamp = Date.now();
    const secondTimestamp = timestamp + 1;
    await test.step('signup', async () => {
      const {
        validUser: { firstName, lastName, middleName, code, password },
      } = users;
      const validCredentials = {
        firstName,
        lastName,
        middleName,
        phoneNumber: (Date.now() % 1000000000000).toString().slice(2),
        code,
        password,
        path: '/dashboard',
        email: `${timestamp}@test.com`,
      };
      await signup({ page, ...validCredentials });
    });

    await test.step('Create first company', async () => {
      await page.locator('[data-cy=create-first-seller-company-button]').click();

      await createCompanySeller({ page, company, timestamp });

      await createCompanyLocation({ page, location, timestamp });

      await expect(page.locator('[data-cy=company-location-submit-button]')).not.toBeVisible();
      await expect(page.locator('[data-cy=company-tutorial]')).toBeVisible();
      await page.locator('[data-cy=close-button]').click();
      await expect(
        page.locator('[data-cy=address-item]', { hasText: `${location.comment + timestamp}` }),
      ).toBeVisible();

      await destroyCompanyLocation({ page });

      await expect(page.locator(`text=${location.comment + timestamp}`)).not.toBeVisible();
      await page.locator('[data-cy=breadcrumbs-company-sidebar]').click();
    });

    await test.step('Create second company', async () => {
      await page.locator('[data-cy=create-company-button]').click();
      await expect(page.locator('[data-cy=create-company-form]')).toBeVisible();

      await createCompanySeller({ page, company, timestamp: secondTimestamp });

      await page.locator('[data-cy=close-button]').click();

      await page.locator('[data-cy=breadcrumbs-company-sidebar]').click();

      await expect(
        page.locator('[data-cy=companies-list]', {
          hasText: company.officialName + secondTimestamp,
        }),
      ).toBeVisible();
    });
  });
});
