import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import { CustomerOrdersDocument } from 'graphql/queries/__generated__/customerOrders.generated';

import { mockCustomerOrdersData, mockOrders } from '__tests__/mocks/mockOrders';

import { useCustomerOrders } from './customerOrders';

describe('useCustomerOrders', () => {
  test('should return customerOrders data', async () => {
    // Arrange
    const variables = {
      checkoutStatus: 'PLACED',
      executionStatuses: [],
      first: 12,
      after: '',
    };

    const mocks = [
      {
        request: {
          query: CustomerOrdersDocument,
          variables,
        },
        result: {
          data: mockCustomerOrdersData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCustomerOrders(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.customerOrders).toEqual(mockOrders);
    });
  });

  test('should return error', async () => {
    // Arrange
    const variables = {
      checkoutStatus: 'INCORRECT_STATUS',
      executionStatuses: ['CONFIRMED'],
    };

    const error = new Error();

    const mocks = [
      {
        request: {
          query: CustomerOrdersDocument,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCustomerOrders(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
