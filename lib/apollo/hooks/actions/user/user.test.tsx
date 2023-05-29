import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import { mockUploadFile } from '__tests__/mocks/mockUploadFile';

import { UpdateUserDocument } from 'graphql/mutations/__generated__/updateUser.generated';

import { useUpdateUser } from './index';

describe('User actions', () => {
  describe('useUpdateUser', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        avatar: mockUploadFile,
        email: 'test@email.test',
        firstName: 'FirstName',
        lastName: 'LastName',
        currentPassword: 'currentPassword',
      };
      const mocks = [
        {
          request: {
            query: UpdateUserDocument,
            variables: { input: data },
          },
          result: {
            data: { updateUser: { me: mockCurrentUser } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateUser({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.updateUser).toEqual({ me: mockCurrentUser });
      });
    });
  });
});
