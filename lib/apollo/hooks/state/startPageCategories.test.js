import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import {
  mockStartPageCategoriesData,
  mockStartPageCategories,
} from '__tests__/mocks/mockStartPageCategories';

import StartPageCategories from 'graphql/queries/startPageCategories.graphql';

import { useStartPageCategories } from './startPageCategories';

describe('useStartPageCategories', () => {
  test('should return startPageCategories data', async () => {
    // Arrange
    const mocks = [
      {
        request: {
          query: StartPageCategories,
        },
        result: {
          data: mockStartPageCategoriesData,
        },
      },
    ];

    const { result } = renderHook(() => useStartPageCategories(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.categories).toEqual(mockStartPageCategories);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const mocks = [
      {
        request: {
          query: StartPageCategories,
        },
        error,
      },
    ];

    const { result } = renderHook(() => useStartPageCategories(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
