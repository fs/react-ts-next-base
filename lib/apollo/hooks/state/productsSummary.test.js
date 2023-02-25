import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import ProductSummary from 'graphql/queries/productSummary.graphql';

import mockProductSummary from '__tests__/mocks/mockProductSummary';
import { mockTotalCount } from '__tests__/mocks/mockProducts';

import { useProductSummary } from './productsSummary';

describe('useProductSummary', () => {
  test('should return products data', async () => {
    // Arrange
    const query = {
      categoryIds: '1',
      manufacturer: 'manufacturer',
      searchQuery: 'query',
      minPrice: '100',
      maxPrice: '200',
      rating: '2',
      companyRating: '5',
      freeDeliveryCompanyId: '10',
      newest: true,
      vatPresence: 'true',
      condition: 'test',
    };

    const variables = {
      categoryIds: '1',
      manufacturer: 'manufacturer',
      searchQuery: 'query',
      minPrice: '100',
      maxPrice: '200',
      dictionaryProperties: [],
      integerProperties: [],
      rating: '2',
      companyRating: '5',
      freeDeliveryCompanyId: '10',
      newest: true,
      vatPresence: true,
      condition: 'test',
    };

    const mocks = [
      {
        request: {
          query: ProductSummary,
          variables,
        },
        result: {
          data: mockProductSummary,
        },
      },
    ];

    const { result } = renderHook(() => useProductSummary(query), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.totalCount).toEqual(mockTotalCount);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const query = { categoryIds: '1' };

    const variables = { categoryIds: '1' };

    const mocks = [
      {
        request: {
          query: ProductSummary,
          variables,
        },
        error,
      },
    ];

    const { result } = renderHook(() => useProductSummary(query), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
