import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockProducts } from '__tests__/mocks/mockProducts';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';

import { CustomerProductsDocument } from 'graphql/queries/__generated__/customerProducts.generated';

import { useCustomerProducts } from './customerProducts';

describe('useCustomerProducts', () => {
  test('should return customerProducts data', async () => {
    // Arrange
    const query = {
      productIds: '4',
      deleted: false,
      statuses: [],
      first: 16,
    };

    const variables = {
      productIds: '4',
      deleted: false,
      statuses: [],
      first: 16,
    };

    const mocks = [
      {
        request: {
          query: CustomerProductsDocument,
          variables,
        },
        result: {
          data: {
            customerProducts: {
              edges: [{ cursor: mockProducts[0].id, node: mockProducts[0] }],
              pageInfo: mockPageInfo,
            },
          },
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCustomerProducts(query), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.customerProducts).toEqual([mockProducts[0]]);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const query = { categoryIds: '1' };

    const variables = { categoryIds: ['1'] };

    const mocks = [
      {
        request: {
          query: CustomerProductsDocument,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCustomerProducts(query), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
