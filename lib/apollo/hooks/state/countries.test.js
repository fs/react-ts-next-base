import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import { mockCountries, mockCountriesData } from '__tests__/mocks/mockCountries';

import Countries from 'graphql/queries/countries.graphql';

import { useCountries } from './countries';

describe('useCountries', () => {
  test('should return countries data', async () => {
    // Arrange
    const variables = { after: undefined, name: 'Рос' };
    const mocks = [
      {
        request: {
          query: Countries,
          variables,
        },
        result: {
          data: mockCountriesData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCountries(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });
    const response = await result.current(variables);
    // Assert
    await waitFor(() => {
      expect(response).toEqual({
        nodes: mockCountries,
        pageInfo: mockCountriesData.countries.pageInfo,
        loading: false,
        error: undefined,
      });
    });
  });

  test('should throw error', async () => {
    // Arrange
    const variables = { after: undefined, name: 'Invalid country' };
    const error = new Error();

    const mocks = [
      {
        request: {
          query: Countries,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCountries(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });
    // Assert
    await waitFor(() => {
      expect(result.current(variables)).rejects.toThrow();
    });
  });
});
