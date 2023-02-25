import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockOrderSellersData, mockOrderSellers } from '__tests__/mocks/mockOrderSellers';

import OrderSellers from 'graphql/queries/orderSellers.graphql';
import { IN_CART } from 'config/constants/checkoutStatus';

import { useOrderSellers } from './orderSellers';

describe('useOrderSellers', () => {
  test('should return orderSellers data', async () => {
    // Arrange
    const variables = { companyId: '1', checkoutStatus: IN_CART };
    const mocks = [
      {
        request: {
          query: OrderSellers,
          variables,
        },
        result: {
          data: mockOrderSellersData,
        },
      },
    ];

    const { result } = renderHook(() => useOrderSellers(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.orderSellers).toEqual(mockOrderSellers);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const variables = { companyId: '1', checkoutStatus: IN_CART };
    const mocks = [
      {
        request: {
          query: OrderSellers,
          variables,
        },
        error,
      },
    ];

    const { result } = renderHook(() => useOrderSellers(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
