import { test, expect } from '@playwright/test';
import { users } from '../../fixtures/users';
import { loginAs } from '../../helperActions/login';
import { closeNotification } from '../../helperActions/notification';
import { signOut } from '../../helperActions/signOut';

test.use({
  storageState: './e2e/storages/withCity.json',
});

test.describe('signIn', () => {
  const {
    seller: { lastName, password, email },
  } = users;

  test('Visitor signs in with valid credentials', async ({ page, baseURL }) => {
    await loginAs({ page, email, password });

    await page.locator('[data-cy=sidebar-toggler]').click();

    await expect(page.locator('[data-cy=sidebar]', { hasText: lastName })).toBeVisible();

    await page.locator('[data-cy=sidebar-close-button]').click();

    // eslint-disable-next-line playwright/no-conditional-in-test
    await signOut({ page, baseURL: baseURL || '' });
  });

  test('Visitor signs in with invalid credentials', async ({ page }) => {
    await page.goto('');
    await page.locator('text=ПРИСОЕДИНИТЬСЯ').click();
    await expect(page).toHaveURL(`/auth?signup=true`);
    await page.locator('[data-testid="tab-signin"]').click();
    await expect(page).toHaveURL(`/auth?signin=true`);
    await page.locator('[data-testid="login"]').fill(email);
    await page.locator('[data-testid="password"]').fill(`invalid_password`);
    await page.locator('[data-testid="submit-button"]').click();
    await closeNotification({ page, text: 'Неверно введены учетные данные' });
  });

  test('Authorized user visits auth page', async ({ page, baseURL }) => {
    // eslint-disable-next-line playwright/no-conditional-in-test
    const baseUrl = baseURL || '';

    await loginAs({ page, email, password });

    page.goto('/auth');

    await expect(page).toHaveURL(new RegExp(baseUrl));

    await signOut({ page, baseURL: baseUrl });
  });
});
