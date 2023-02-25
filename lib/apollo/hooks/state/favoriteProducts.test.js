import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockMyProducts, mockMyFavoriteProductsData } from '__tests__/mocks/mockMyProducts';

import { FavoriteProductsDocument } from 'graphql/queries/__generated__/favoriteProducts.generated';

import { useFavoriteProducts } from './favoriteProducts';

describe('useProducts', () => {
  test('should return products data', async () => {
    // Arrange
    const query = '22';
    const variables = { searchQuery: query };

    const mocks = [
      {
        request: {
          query: FavoriteProductsDocument,
          variables,
        },
        result: {
          data: mockMyFavoriteProductsData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useFavoriteProducts(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.favoriteProducts).toEqual(mockMyProducts);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const query = '1';

    const variables = { searchQuery: query };

    const mocks = [
      {
        request: {
          query: FavoriteProductsDocument,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useFavoriteProducts(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
