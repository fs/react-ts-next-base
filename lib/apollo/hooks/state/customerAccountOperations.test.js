import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import CustomerAccountOperations from 'graphql/queries/customerAccountOperations.graphql';
import { ACCOUNT_OPERATION_STATUS } from 'config/constants/accountOperations';
import {
  mockCustomerAccountOperations,
  mockCustomerAccountOperationsData,
} from '__tests__/mocks/mockCustomerAccountOperations';

import { useCustomerAccountOperations } from './customerAccountOperations';

describe('useCustomerAccountOperations', () => {
  test('should return customerAccountOperations data', async () => {
    // Arrange
    const variables = {
      statuses: [
        ACCOUNT_OPERATION_STATUS.PENDING,
        ACCOUNT_OPERATION_STATUS.ACCEPTED,
        ACCOUNT_OPERATION_STATUS.DECLINED,
      ],
      first: 12,
    };

    const mocks = [
      {
        request: {
          query: CustomerAccountOperations,
          variables,
        },
        result: {
          data: mockCustomerAccountOperationsData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCustomerAccountOperations(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.customerAccountOperations).toEqual(mockCustomerAccountOperations);
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
          query: CustomerAccountOperations,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCustomerAccountOperations(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
