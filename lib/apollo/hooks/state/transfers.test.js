import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import { TransfersDocument } from 'graphql/queries/__generated__/transfers.generated';

import { mockTransfersData, mockTransfers } from '__tests__/mocks/mockTransfers';

import { AccountOperationSubjectEnum } from 'graphql/types';
import { useTransfers } from './transfers';

describe('useTransfers', () => {
  test('should return transfers data', async () => {
    // Arrange
    const { Withdrawal } = AccountOperationSubjectEnum;

    const variables = {
      transferTypes: Withdrawal,
      operationStatuses: [],
      searchQuery: '',
      ids: [],
      first: 12,
      after: '',
    };

    const mocks = [
      {
        request: {
          query: TransfersDocument,
          variables,
        },
        result: {
          data: mockTransfersData,
        },
      },
    ];

    const { result } = renderHook(() => useTransfers(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.transfers).toEqual(mockTransfers);
    });
  });

  test('should return error', async () => {
    // Arrange
    const variables = {
      transferTypes: 'INCORRECT_TYPE',
      operationStatuses: [],
    };
    const error = new Error();

    const mocks = [
      {
        request: {
          query: TransfersDocument,
          variables,
        },
        error,
      },
    ];

    const { result } = renderHook(() => useTransfers(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
