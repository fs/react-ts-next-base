import { test } from '@playwright/test';

import { users } from '../../fixtures/users';
import { closeNotification } from '../../helperActions/notification';
import { signOut } from '../../helperActions/signOut';

import { signup } from '../../helperActions/signUp';

test.use({
  storageState: './e2e/storages/withCity.json',
});

test.describe('Sign Up', () => {
  const {
    validUser: { firstName, lastName, middleName, code, password, email },
  } = users;

  test('Visitor sign-ups with valid credentials & SMS confirmation', async ({ page, baseURL }) => {
    // eslint-disable-next-line playwright/no-conditional-in-test
    const baseUrl = baseURL || '';

    const timestamp = Date.now();

    const validCredentials = {
      firstName,
      lastName,
      middleName,
      phoneNumber: (timestamp % 1000000000000).toString().slice(2),
      code,
      password,
      email: `${timestamp}@test.com`,
    };
    await signup({ page, ...validCredentials });

    await signOut({ page, baseURL: baseUrl });
  });

  test('Visitor sign-ups with invalid SMS code', async ({ page }) => {
    const timestamp = Date.now();

    const invalidCredentials = {
      firstName,
      lastName,
      middleName,
      code: 'invalidCode',
      phoneNumber: (timestamp % 1000000000000).toString().slice(2),
      password,
      expectedPath: '/auth?signup=true',
      email: `${timestamp}@test.com`,
    };

    await signup({ page, ...invalidCredentials });
    await closeNotification({ page, text: 'Некорректный SMS код' });
  });

  test('Visitor sign-ups with invalid credentials', async ({ page }) => {
    const invalidCredentials = {
      firstName,
      lastName,
      middleName,
      phoneNumber: (Date.now() % 1000000000000).toString().slice(2),
      code,
      password,
      expectedPath: '/auth?signup=true',
      email,
    };

    await signup({ page, ...invalidCredentials });
    await closeNotification({ page, text: 'Запись недействительна' });
  });
});
