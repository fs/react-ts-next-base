import { users } from 'e2e/fixtures/users';
import { signIn } from 'e2e/helperActions/signIn';
import { signOut } from 'e2e/helperActions/signOut';
import { expect, test } from '@playwright/test';

test.describe('Activities Page', () => {
  test('User sees activities table', async ({ page }) => {
    const {
      validUser: { password, email },
    } = users;
    await signIn({ page, email, password });

    await page.locator('[data-testid=dropdown-toggler]').click();
    await page.locator('[data-testid=activity]').click();

    await expect(page).toHaveURL('/activity');

    await expect(page.locator('[data-testid=activity-pagination]')).toBeVisible();

    await signOut({ page });
  });
});
