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
    await signIn({ page, email, password });

    await expect(page.locator('[data-testid=user-name]', { hasText: email })).toBeVisible();

    await signOut({ page });
  });

  test('Visitor signs in with invalid credentials', async ({ page }) => {
    await signIn({ page, email, password: 'Invalid123', expectedPath: '/signin' });

    await closeNotification({ page, text: 'Invalid credentials' });
  });

  test('Authorized user visits auth page', async ({ page }) => {
    await signIn({ page, email, password });

    page.goto('/signin');

    await expect(page).toHaveURL('');

    await signOut({ page, expectedPath: '' });
  });
});
