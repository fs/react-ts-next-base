import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockMyProducts, mockMyProductsData } from '__tests__/mocks/mockMyProducts';

import MyProducts from 'graphql/queries/myProducts.graphql';

import { useMyProducts } from './myProducts';

describe('useMyProducts', () => {
  test('should return products data', async () => {
    // Arrange
    const variables = {
      companyIds: ['1'],
      searchQuery: '',
      productIds: ['2'],
      template: true,
      deleted: false,
      first: 12,
    };
    const mocks = [
      {
        request: {
          query: MyProducts,
          variables,
        },
        result: {
          data: mockMyProductsData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useMyProducts(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.products).toEqual(mockMyProducts);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const variables = {
      companyIds: ['invalid id'],
      searchQuery: 'invalid',
      productIds: ['invalid id'],
      template: false,
      deleted: false,
    };
    const mocks = [
      {
        request: {
          query: MyProducts,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useMyProducts(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
