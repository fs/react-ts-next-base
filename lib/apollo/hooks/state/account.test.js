import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import Account from 'graphql/queries/account.graphql';

import { mockAccount, mockAccountData } from '__tests__/mocks/mockAccount';

import { useAccount } from './account';

describe('useAccount', () => {
  test('should return account data', async () => {
    // Arrange
    const mockedCompanyId = 1;

    const mocks = [
      {
        request: {
          query: Account,
          variables: {
            companyId: mockedCompanyId,
          },
        },
        result: {
          data: mockAccountData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useAccount({ companyId: mockedCompanyId }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.account).toEqual(mockAccount);
    });
  });

  test('should return error', async () => {
    // Arrange
    const mockedCompanyId = 'incorrect id';

    const error = new Error();

    const mocks = [
      {
        request: {
          query: Account,
          variables: {
            companyId: mockedCompanyId,
          },
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useAccount({ companyId: mockedCompanyId }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
