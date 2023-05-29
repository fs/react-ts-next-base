import { users } from 'e2e/fixtures/users';
// import { chooseFile } from 'e2e/helperActions/fileChooser';
import { closeNotification } from 'e2e/helperActions/notification';
import { signIn } from 'e2e/helperActions/signIn';
import { expect, test } from '@playwright/test';

test.describe('Update Profile', () => {
  const timestamp = +new Date();
  const {
    validUser: { password, email, firstName, lastName },
  } = users;

  test('User updates his profile', async ({ page }) => {
    await signIn({ page, email, password });

    await expect(page.locator('[data-testid=user-name]', { hasText: email })).toBeVisible();

    await page.locator('[data-testid=dropdown-toggler]').click();
    await page.locator('[data-testid=profile]').click();

    await expect(page).toHaveURL('/profile');

    await expect(page.locator('[data-testid=profile-update-form]')).toBeVisible();

    // await chooseFile({
    //   page,
    //   selector: '[data-testid=avatar]',
    //   filePath: './e2e/fixtures/images/logo.png',
    // });

    await page.locator('[data-testid="first-name"]').fill(`${firstName}-${timestamp}`);
    await page.locator('[data-testid="last-name"]').fill(`${lastName}-${timestamp}`);

    await page.locator('[data-testid="submit-button"]').click();

    await closeNotification({ page, text: 'Profile updated successfully' });
  });
});
