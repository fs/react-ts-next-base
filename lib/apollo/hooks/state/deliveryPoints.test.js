import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import DeliveryPoints from 'graphql/queries/deliveryPoints.graphql';
import { renderHook, waitFor } from '@testing-library/react';

import { mockDeliveryPoints } from '__tests__/mocks/mockDeliveryPoints';
import { useDeliveryPoints } from './deliveryPoints';

describe('useDeliveryPoints', () => {
  test('should return deliveryPoints data', async () => {
    // Arrange
    const variables = {
      service: 'DELLIN',
      cityId: '928',
      direction: 'ALL',
    };

    const mocks = [
      {
        request: {
          query: DeliveryPoints,
          variables,
        },
        result: {
          data: { deliveryPoints: mockDeliveryPoints },
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useDeliveryPoints(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.deliveryPoints).toEqual(mockDeliveryPoints);
    });
  });

  test('should return error', async () => {
    // Arrange
    const variables = {
      service: 'incorrect service',
      cityId: '928',
      direction: 'ALL',
    };
    const error = new Error();

    const mocks = [
      {
        request: {
          query: DeliveryPoints,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useDeliveryPoints(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
