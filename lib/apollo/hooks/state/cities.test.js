import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import { mockCities, mockCitiesData } from '__tests__/mocks/mockCities';

import Cities from 'graphql/queries/cities.graphql';

import { useCities } from './cities';

describe('useCities', () => {
  test('should return cities data', async () => {
    // Arrange
    const variables = { after: undefined, name: 'Kazan', strict: false };
    const mocks = [
      {
        request: {
          query: Cities,
          variables,
        },
        result: {
          data: mockCitiesData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCities(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    const response = await result.current(variables);
    // Assert
    await waitFor(() => {
      expect(response).toEqual({
        nodes: mockCities,
        pageInfo: mockCitiesData.cities.pageInfo,
        loading: false,
        error: undefined,
      });
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const variables = { after: undefined, name: 'Invalid city' };
    const mocks = [
      {
        request: {
          query: Cities,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCities(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current(variables)).rejects.toThrow();
    });
  });
});
