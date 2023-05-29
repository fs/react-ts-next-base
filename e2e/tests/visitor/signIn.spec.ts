import { users } from 'e2e/fixtures/users';
import { closeNotification } from 'e2e/helperActions/notification';
import { signIn } from 'e2e/helperActions/signIn';
import { signOut } from 'e2e/helperActions/signOut';
import { expect, test } from '@playwright/test';

test.describe('signIn', () => {
  const {
    validUser: { password, email },
  } = users;

  test('Visitor signs in with valid credentials', async ({ page }) => {
    await signIn({ page, email, password });

    await expect(page.locator('[data-testid=user-name]', { hasText: email })).toBeVisible();

    await signOut({ page });
  });

  test('Visitor signs in with invalid credentials', async ({ page }) => {
    const {
      invalidUser: { password: invalidPassword, email: invalidEmail },
    } = users;

    await signIn({ page, email: invalidEmail, password: invalidPassword, expectedPath: '/signin' });

    await closeNotification({ page, text: 'Invalid credentials' });
  });

  test('Authorized user visits auth page', async ({ page }) => {
    await signIn({ page, email, password });

    page.goto('/signin');

    await expect(page).toHaveURL('');

    await signOut({ page });
  });
});
