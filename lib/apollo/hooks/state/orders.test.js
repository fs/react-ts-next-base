import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import {
  mockOrdersData,
  mockOrders,
  mockOrdersSummaryData,
  mockOrdersTotalCount,
} from '__tests__/mocks/mockOrders';

import { OrdersDocument } from 'graphql/queries/__generated__/orders.generated';
import OrdersSummary from 'graphql/queries/ordersSummary.graphql';
import { IN_CART } from 'config/constants/checkoutStatus';

import { useOrders, useOrdersSummary } from './orders';

describe('useOrders', () => {
  test('should return orders data', async () => {
    // Arrange
    const mockOrderId = '1';
    const orderValues = {
      companyId: '1',
      sellerIds: '2',
      checkoutStatus: IN_CART,
      orderId: mockOrderId,
    };
    const variables = {
      companyId: '1',
      sellerIds: '2',
      checkoutStatus: IN_CART,
      ids: [mockOrderId],
    };

    const mocks = [
      {
        request: {
          query: OrdersDocument,
          variables,
        },
        result: {
          data: mockOrdersData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useOrders(orderValues), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.orders).toEqual(mockOrders);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const variables = { companyId: '1', sellerIds: '2', checkoutStatus: IN_CART };
    const mocks = [
      {
        request: {
          query: OrdersDocument,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useOrders(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});

describe('useOrdersSummary', () => {
  test('should return orders totalCount data', async () => {
    // Arrange
    const variables = { companyId: '1', sellerIds: '2', checkoutStatus: IN_CART };
    const mocks = [
      {
        request: {
          query: OrdersSummary,
          variables,
        },
        result: {
          data: mockOrdersSummaryData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useOrdersSummary(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.totalCount).toEqual(mockOrdersTotalCount);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const variables = { companyId: '1', sellerIds: '2', checkoutStatus: IN_CART };
    const mocks = [
      {
        request: {
          query: OrdersSummary,
          variables,
        },
        error,
      },
    ];

    const { result } = renderHook(() => useOrdersSummary(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
