import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import DeliveryMethods from 'graphql/queries/deliveryMethods.graphql';
import GuestDeliveryMethods from 'graphql/queries/guestDeliveryMethods.graphql';
import { renderHook, waitFor } from '@testing-library/react';

import mockDeliveryMethods from '__tests__/mocks/mockDeliveryMethods';
import { useDeliveryMethods, useGuestDeliveryMethods } from './deliveryMethods';

describe('useDeliveryMethods', () => {
  test('should return deliveryMethods data', async () => {
    // Arrange
    const variables = {
      variantId: '1',
      quantity: 10,
      companyLocationId: '825',
    };

    const mocks = [
      {
        request: {
          query: DeliveryMethods,
          variables,
        },
        result: {
          data: { deliveryMethods: mockDeliveryMethods },
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useDeliveryMethods(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.deliveryMethods).toEqual(mockDeliveryMethods);
    });
  });

  test('should return error', async () => {
    // Arrange
    const variables = {
      variantId: 'incorrect id',
      quantity: 10,
      companyLocationId: '825',
    };
    const error = new Error();

    const mocks = [
      {
        request: {
          query: DeliveryMethods,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useDeliveryMethods(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});

describe('useGuestDeliveryMethods', () => {
  test('should return deliveryMethods data', async () => {
    // Arrange
    const variables = {
      variantId: '1',
      quantity: 10,
      cityId: '825',
    };

    const mocks = [
      {
        request: {
          query: GuestDeliveryMethods,
          variables,
        },
        result: {
          data: { guestDeliveryMethods: mockDeliveryMethods },
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useGuestDeliveryMethods(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.guestDeliveryMethods).toEqual(mockDeliveryMethods);
    });
  });

  test('should return error', async () => {
    // Arrange
    const variables = {
      variantId: 'incorrect id',
      quantity: 10,
      cityId: '825',
    };
    const error = new Error();

    const mocks = [
      {
        request: {
          query: GuestDeliveryMethods,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useGuestDeliveryMethods(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
