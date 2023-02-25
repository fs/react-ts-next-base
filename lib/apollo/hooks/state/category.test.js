import React from 'react';

import { MockedProvider } from '@apollo/client/testing';

import Category from 'graphql/queries/category.graphql';

import { renderHook, waitFor } from '@testing-library/react';
import { mockCategories } from '__tests__/mocks/mockCategories';
import { useCategory } from './category';

describe('useCategory', () => {
  test('should return category data', async () => {
    // Arrange
    const id = '1';

    const mocks = [
      {
        request: {
          query: Category,
          variables: {
            id,
          },
        },
        result: {
          data: { category: mockCategories[0] },
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCategory({ id }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.category).toEqual(mockCategories[0]);
    });
  });

  test('should return error', async () => {
    // Arrange
    const id = 'incorrect id';

    const error = new Error();

    const mocks = [
      {
        request: {
          query: Category,
          variables: {
            id,
          },
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCategory({ id }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
