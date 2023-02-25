import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import DellinFreightTypes from 'graphql/queries/dellinFreightTypes.graphql';

import {
  mockDellinFreightTypes,
  mockDellinFreightTypesData,
} from '__tests__/mocks/mockDellinFreightTypes';

import { useDellinFreightTypes } from './dellinFreightTypes';

describe('useDellinFreightTypes', () => {
  test('should return dellinFreightTypes data', async () => {
    // Arrange
    const variables = { name: 'test', active: true };
    const mocks = [
      {
        request: {
          query: DellinFreightTypes,
          variables,
        },
        result: {
          data: mockDellinFreightTypesData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useDellinFreightTypes(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.dellinFreightTypes).toEqual(mockDellinFreightTypes);
    });
  });

  test('should throw error', async () => {
    // Arrange
    const variables = { name: '', active: true };
    const error = new Error();

    const mocks = [
      {
        request: {
          query: DellinFreightTypes,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useDellinFreightTypes(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
