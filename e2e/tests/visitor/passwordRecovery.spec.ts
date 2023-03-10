import { test } from '@playwright/test';

import { users } from '../../fixtures/users';

import { closeNotification } from '../../helperActions/notification';
import { resetPassword } from '../../helperActions/resetPassword';

test.use({
  storageState: './e2e/storages/withCity.json',
});

test.describe('Password Recovery', () => {
  test('Visitor resets his password with valid email', async ({ page }) => {
    const { email } = users.seller;
    const expectedMessage =
      'Инструкции по восстановлению пароля были высланы, если аккаунт существует.';

    await resetPassword({ page, email });

    await closeNotification({ page, text: expectedMessage });
  });

  test('Visitor resets his password with invalid email', async ({ page }) => {
    const email = 'invalid.email@test.com';
    const expectedMessage = 'Запись не найдена';

    await resetPassword({ page, email });

    await closeNotification({ page, text: expectedMessage });
  });
});
