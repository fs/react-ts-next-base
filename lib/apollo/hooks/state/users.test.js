import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import { mockUsersData, mockUsers } from '__tests__/mocks/mockUsers';
import { UsersDocument } from 'graphql/queries/__generated__/users.generated';

import { useUsers } from './users';

describe('useUsers', () => {
  test('should return users data', async () => {
    // Arrange
    const variables = {};
    const mocks = [
      {
        request: {
          query: UsersDocument,
          variables,
        },
        result: {
          data: mockUsersData,
        },
      },
    ];

    const { result } = renderHook(() => useUsers(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.users).toEqual(mockUsers);
    });
  });

  test('should return error', async () => {
    // Arrange
    const variables = {
      INCORRECT_PROP: 'INCORRECT_PROP',
    };
    const error = new Error();

    const mocks = [
      {
        request: {
          query: UsersDocument,
          variables,
        },
        error,
      },
    ];

    const { result } = renderHook(() => useUsers(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
