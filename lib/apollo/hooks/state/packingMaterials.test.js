import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import {
  mockPackingMaterialsData,
  mockPackingMaterials,
} from '__tests__/mocks/mockPackingMaterials';

import PackingMaterials from 'graphql/queries/packingMaterials.graphql';

import { usePackingMaterials } from './packingMaterials';

describe('usePackingMaterials', () => {
  test('should return products data', async () => {
    // Arrange
    const variables = { name: 'картон' };
    const mocks = [
      {
        request: {
          query: PackingMaterials,
          variables,
        },
        result: {
          data: mockPackingMaterialsData,
        },
      },
    ];

    const { result } = renderHook(() => usePackingMaterials(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.packingMaterials).toEqual(mockPackingMaterials);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const variables = { name: 'invalid name' };
    const mocks = [
      {
        request: {
          query: PackingMaterials,
          variables,
        },
        error,
      },
    ];

    const { result } = renderHook(() => usePackingMaterials(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
