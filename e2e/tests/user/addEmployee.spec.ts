import { test, expect } from '@playwright/test';

import { loginAsSeller } from '../../helperActions/login';
import { closeNotification } from '../../helperActions/notification';

test.use({
  storageState: './e2e/storages/withCity.json',
});

test.beforeEach(async ({ page }) => {
  await loginAsSeller({ page });
});

test.describe('AddEmployee', () => {
  test('User add and remove employee', async ({ page }) => {
    const email = `${Date.now()}@test.com`;

    await test.step('add new employee', async () => {
      await page.goto('dashboard');
      await expect(page).toHaveURL('dashboard');

      await page.locator('[data-cy=add-company-member-button]').click();

      await expect(page.locator('[data-cy=member-modal-title]')).toHaveText(
        'Добавление нового пользователя',
      );

      await page.locator('[data-cy=email]').fill(email);
      await page.locator('[data-cy=confirmEmail]').fill(email);

      await page.locator('[data-cy=company-1]').click();

      await page.locator('[data-cy=add-user-submit-button]').click();

      await expect(page.locator('[data-cy=accept-modal-title]')).toHaveText(
        'Пользователь создан для управления выбранными компаниями',
      );

      await page.locator('[data-cy=accept-modal-submit-button]').click();
    });

    await test.step('remove employee', async () => {
      await page.locator('[data-cy=edit-company-member-button]').click();

      await expect(page.locator('[data-cy=edit-member-modal-title]')).toHaveText(
        'Список пользователей',
      );

      const employeeItem = page.locator('[data-cy=employee-item]', { hasText: email });
      await employeeItem.locator('[data-cy^=delete-]').click();

      await expect(page.locator('[data-cy=simple-modal-title]')).toHaveText(
        'Удаление пользователя',
      );

      await page.locator('[data-cy=confirm-modal-button]').click();

      await closeNotification({ page, text: `Пользователь ${email} удален` });
    });
  });
});
