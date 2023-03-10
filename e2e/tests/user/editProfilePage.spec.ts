import { test, expect } from '@playwright/test';
import { users } from '../../fixtures/users';
import { chooseFile } from '../../helperActions/fileChooser';

import { loginAsSeller } from '../../helperActions/login';
import { closeNotification } from '../../helperActions/notification';

test.use({
  storageState: './e2e/storages/withCity.json',
});

test.beforeEach(async ({ page }) => {
  await loginAsSeller({ page });
  await page.goto('profile');
  await expect(page).toHaveURL('profile');
});

test.describe('EditProfilePage', () => {
  test('User updates his profile', async ({ page }) => {
    const {
      seller: { firstName, lastName, middleName },
    } = users;
    const timestamp = Date.now();

    await test.step('Change avatar', async () => {
      await page.locator('[data-testid="edit-avatar-button"]').click();
      await chooseFile({
        page,
        selector: '[data-cy=load-avatar-input]',
        filePath: './e2e/fixtures/images/logo.png',
      });
      await page.locator('[data-cy=crop-image-button]').click();

      await closeNotification({ page, text: 'Аватар успешно обновлен' });
    });

    await test.step('Change profile info', async () => {
      await page.locator('[data-cy=lastName]').fill(`${lastName}-${timestamp}`);
      await page.locator('[data-cy=firstName]').fill(`${firstName}-${timestamp}`);
      await page.locator('[data-cy=middleName]').fill(`${middleName}-${timestamp}`);

      await page.locator('[data-cy=submit-profile-button]').click();

      await closeNotification({ page, text: 'Аккаунт успешно обновлен' });
    });
  });
});
