import { test } from '@playwright/test';

import { users } from '../../fixtures/users';
import { closeNotification } from '../../helperActions/notification';
import { signOut } from '../../helperActions/signOut';
import { signup } from '../../helperActions/signUp';

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
    await signup({ page, ...validCredentials });

    await signOut({ page, expectedPath: baseUrl });
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

    await signup({ page, ...invalidCredentials });
    await closeNotification({ page, text: 'Record invalid' });
  });
});
