import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockMyEmployees, mockMyEmployeessData } from '__tests__/mocks/mockMyEmployees';

import MyEmployees from 'graphql/queries/myEmployees.graphql';

import { useMyEmployees } from './myEmployees';

describe('useMyEmployees', () => {
  test('should return myEmployees data', async () => {
    // Arrange
    const mocks = [
      {
        request: {
          query: MyEmployees,
        },
        result: {
          data: mockMyEmployeessData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useMyEmployees(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.myEmployees).toEqual(mockMyEmployees);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const mocks = [
      {
        request: {
          query: MyEmployees,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useMyEmployees(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
