import React from 'react';

import { MockedProvider } from '@apollo/client/testing';

import Categories from 'graphql/queries/categories.graphql';

import { renderHook, waitFor } from '@testing-library/react';
import { mockCategories } from '__tests__/mocks/mockCategories';
import { useCategories } from './categories';

describe('useCategories', () => {
  test('should return categories data', async () => {
    // Arrange
    const mockedParentId = '1';

    const mocks = [
      {
        request: {
          query: Categories,
          variables: {
            parentId: mockedParentId,
          },
        },
        result: {
          data: { categories: mockCategories },
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCategories({ parentId: mockedParentId }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.categories).toEqual(mockCategories);
    });
  });

  test('should return error', async () => {
    // Arrange
    const mockedParentId = 'incorrect id';

    const error = new Error();

    const mocks = [
      {
        request: {
          query: Categories,
          variables: {
            parentId: mockedParentId,
          },
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCategories({ parentId: mockedParentId }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
