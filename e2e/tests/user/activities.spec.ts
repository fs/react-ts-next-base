import { test, expect } from '@playwright/test';

import { users } from 'e2e/fixtures/users';
import { signIn } from 'e2e/helperActions/signIn';
import { signOut } from 'e2e/helperActions/signOut';

test.describe('Activities Page', () => {
  test.beforeEach(async ({ page }) => {
    const {
      validUser: { password, email },
    } = users;
    await signIn({ page, email, password });

    await page.locator('[data-testid=dropdown-toggler]').click();
    await page.locator('[data-testid=activity]').click();

    await expect(page).toHaveURL('/activity');
  });

  test.afterEach(async ({ page }) => {
    await signOut({ page });
  });

  test('User sees activities table', async ({ page }) => {
    await expect(page.locator('[data-testid=activity-pagination]')).toBeVisible();
  });
});
