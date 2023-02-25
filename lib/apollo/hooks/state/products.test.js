import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { TIMES_ORDERED } from 'config/constants/orders';

import { mockProducts, mockTotalCount } from '__tests__/mocks/mockProducts';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import {
  mockProductRandomReviewData,
  mockProductRandomReviews,
} from '__tests__/mocks/mockProductReviews';

import Products from 'graphql/queries/products.graphql';
import ProductRandomReview from 'graphql/queries/productRandomReview.graphql';

import { useProductRandomReview, useProducts } from './products';

describe('useProducts', () => {
  test('should return products data', async () => {
    // Arrange
    const query = {
      productIds: '4',
      categoryIds: '1,2',
      companyIds: '2',
      manufacturer: 'производитель',
      searchQuery: 'товар',
    };

    const variables = {
      productIds: ['4'],
      categoryIds: ['1', '2'],
      companyIds: ['2'],
      manufacturer: 'производитель',
      searchQuery: 'товар',
      first: 12,
      newest: false,
    };

    const mocks = [
      {
        request: {
          query: Products,
          variables,
        },
        result: {
          data: {
            products: {
              edges: [{ cursor: mockProducts[0].id, node: mockProducts[0] }],
              pageInfo: mockPageInfo,
            },
            productsSummary: {
              totalCount: mockTotalCount,
            },
          },
        },
      },
    ];

    const { result } = renderHook(() => useProducts(query), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.products).toEqual([mockProducts[0]]);
      expect(result.current.totalCount).toEqual(mockTotalCount);
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
          query: Products,
          variables,
        },
        error,
      },
    ];

    const { result } = renderHook(() => useProducts(query), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});

describe('useProductRandomReview', () => {
  test('should return products with review data', async () => {
    // Arrange
    const query = {
      orderBy: TIMES_ORDERED,
      rating: 4,
      first: 12,
    };

    const variables = query;

    const mocks = [
      {
        request: {
          query: ProductRandomReview,
          variables,
        },
        result: {
          data: mockProductRandomReviewData,
        },
      },
    ];

    const { result } = renderHook(() => useProductRandomReview(query), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.products).toEqual(mockProductRandomReviews);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const query = {
      orderBy: TIMES_ORDERED,
      rating: 4,
      first: 12,
    };

    const variables = query;

    const mocks = [
      {
        request: {
          query: ProductRandomReview,
          variables,
        },
        error,
      },
    ];

    const { result } = renderHook(() => useProductRandomReview(query), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
