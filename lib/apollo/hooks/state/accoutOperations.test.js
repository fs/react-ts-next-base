import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import AccountOperations from 'graphql/queries/accountOperations.graphql';

import {
  mockAccountOperations,
  mockAccountOperationsData,
} from '__tests__/mocks/mockAccountOperations';

import { useAccountOperations } from './accountOperations';

describe('useAccountOperations', () => {
  test('should return accountOperations data', async () => {
    // Arrange
    const mockedCompanyId = 1;

    const variables = {
      companyId: mockedCompanyId,
      subjects: [],
      orderIds: [],
      first: 12,
    };

    const mocks = [
      {
        request: {
          query: AccountOperations,
          variables,
        },
        result: {
          data: mockAccountOperationsData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useAccountOperations(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.accountOperations).toEqual(mockAccountOperations);
    });
  });

  test('should return error', async () => {
    // Arrange
    const variables = {
      companyId: 'incorrect id',
      subjects: [],
      orderIds: [],
    };

    const error = new Error();

    const mocks = [
      {
        request: {
          query: AccountOperations,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useAccountOperations(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
