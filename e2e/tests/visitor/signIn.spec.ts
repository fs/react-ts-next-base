import { test, expect } from '@playwright/test';
import { users } from '../../fixtures/users';
import { signIn } from '../../helperActions/signIn';
import { closeNotification } from '../../helperActions/notification';
import { signOut } from '../../helperActions/signOut';

test.describe('signIn', () => {
  const {
    validUser: { password, email },
  } = users;

  test('Visitor signs in with valid credentials', async ({ page }) => {
    await signIn({ page, email, password, expectedPath: '' });

    await expect(page.locator('[data-cy=user-name]', { hasText: email })).toBeVisible();

    await signOut({ page, expectedPath: '/signin' });
  });

  test('Visitor signs in with invalid credentials', async ({ page }) => {
    await page.goto('/signin');
    await page.locator('[data-testid="input-email"]').fill(email);
    await page.locator('[data-testid="input-password"]').fill(password);
    await page.locator('[data-testid="submit-button"]').click();
    await expect(page).toHaveURL(`/dashboard`);
    await closeNotification({ page, text: 'Неверно введены учетные данные' });
  });

  test('Authorized user visits auth page', async ({ page }) => {
    await signIn({ page, email, password, expectedPath: '' });

    page.goto('/signin');

    await expect(page).toHaveURL(new RegExp(''));

    await signOut({ page, expectedPath: '/signin' });
  });
});
