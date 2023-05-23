import { test } from '@playwright/test';

import { users } from 'e2e/fixtures/users';
import { signUp } from 'e2e/helperActions/signUp';
import { signOut } from 'e2e/helperActions/signOut';
import { closeNotification } from 'e2e/helperActions/notification';

test.describe('Sign Up', () => {
  const {
    validUser: { firstName, lastName, password, email },
  } = users;

  test('Visitor sign-ups with valid credentials', async ({ page, baseURL }) => {
    // eslint-disable-next-line playwright/no-conditional-in-test
    const baseUrl = baseURL || '';

    const timestamp = Date.now();

    const validCredentials = {
      firstName,
      lastName,
      password,
      email: `${timestamp}@test.com`,
    };
    await signUp({ page, expectedPath: baseUrl, ...validCredentials });

    await signOut({ page });
  });

  test('Visitor sign-ups with existed email', async ({ page }) => {
    const timestamp = +new Date();

    const invalidCredentials = {
      firstName,
      lastName,
      password: `Password${timestamp}`,
      email,
      expectedPath: '/signup',
    };

    await signUp({ page, ...invalidCredentials });
    await closeNotification({ page, text: 'Record invalid' });
  });
});
