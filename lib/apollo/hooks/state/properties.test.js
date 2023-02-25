import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockProperties, mockPropertiesData } from '__tests__/mocks/mockProperties';

import Properties from 'graphql/queries/properties.graphql';

import { useProperties } from './properties';

describe('useProperties', () => {
  test('should return properties data', async () => {
    // Arrange
    const variables = { categoryIds: ['1'] };
    const mocks = [
      {
        request: {
          query: Properties,
          variables,
        },
        result: {
          data: mockPropertiesData,
        },
      },
    ];

    const { result } = renderHook(() => useProperties(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.properties).toEqual(mockProperties);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const variables = { categoryIds: ['1'] };
    const mocks = [
      {
        request: {
          query: Properties,
          variables,
        },
        error,
      },
    ];

    const { result } = renderHook(() => useProperties(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
