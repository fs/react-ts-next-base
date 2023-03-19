import { test } from '@playwright/test';

import { users } from '../../fixtures/users';
// import { closeNotification } from '../../helperActions/notification';
// import { signOut } from '../../helperActions/signOut';
import { signup } from '../../helperActions/signUp';

test.describe('Sign Up', () => {
  const {
    validUser: { firstName, lastName, password, email },
  } = users;

  test('Visitor sign-ups with valid credentials', async ({ page }) => {
    // eslint-disable-next-line playwright/no-conditional-in-test
    // const baseUrl = baseURL || '';

    const timestamp = Date.now();

    const validCredentials = {
      firstName,
      lastName,
      password,
      email: `${timestamp}@test.com`,
    };
    await signup({ page, ...validCredentials });

    // await signOut({ page, baseURL: baseUrl });
  });

  test('Visitor sign-ups with invalid credentials', async ({ page }) => {
    const invalidCredentials = {
      firstName,
      lastName,
      phoneNumber: (Date.now() % 1000000000000).toString().slice(2),
      password,
      expectedPath: '/signup',
      email,
    };

    await signup({ page, ...invalidCredentials });
    // await closeNotification({ page, text: 'Запись недействительна' });
  });
});
