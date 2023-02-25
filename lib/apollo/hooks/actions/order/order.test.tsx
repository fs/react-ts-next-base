import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockOrder } from '__tests__/mocks/mockOrders';

import useNotifier from 'hooks/useNotifier';

import { PlaceOrderDocument } from 'graphql/mutations/__generated__/placeOrder.generated';
import { DestroyOrderDocument } from 'graphql/mutations/__generated__/destroyOrder.generated';
import { CreateReviewDocument } from 'graphql/mutations/__generated__/createReview.generated';
import { ReserveOrderDocument } from 'graphql/mutations/__generated__/reserveOrder.generated';
import { AddProductToCartDocument } from 'graphql/mutations/__generated__/addProductToCart.generated';
import { UpdateOrderDeliveryDocument } from 'graphql/mutations/__generated__/updateOrderDelivery.generated';
import { UpdateOrderQuantityDocument } from 'graphql/mutations/__generated__/updateOrderQuantity.generated';
import { FinishOrderDeliveryDocument } from 'graphql/mutations/__generated__/finishOrderDelivery.generated';
import { CancelReservedOrderDocument } from 'graphql/mutations/__generated__/cancelReservedOrder.generated';
import { ConfirmReservedOrderDocument } from 'graphql/mutations/__generated__/ConfirmReservedOrder.generated';
import { ConfirmOrderPaymentDocument } from 'graphql/mutations/__generated__/confirmOrderPayment.generated';
import { AddProductToGuestCartDocument } from 'graphql/mutations/__generated__/addProductToGuestCart.generated';

import { DeliveryMethodEnum, DeliveryServiceEnum } from 'graphql/types';
import {
  useAddProductToCart,
  useDestroyOrder,
  useUpdateOrderDelivery,
  usePlaceOrder,
  useUpdateOrderQuantity,
  useCreateReview,
  useFinishOrderDelivery,
  useConfirmReservedOrder,
  useCancelReservedOrder,
  useReserveOrder,
  useConfirmOrderPayment,
  useAddProductToGuestCart,
} from './order';

jest.mock('hooks/useNotifier');
jest.mock('hooks/useRouter');

describe('Order mutations', () => {
  const mockedUseNotifier = useNotifier as jest.Mock;
  const mockSetError = jest.fn();
  mockedUseNotifier.mockImplementation(
    jest.fn(() => ({ setSuccess: jest.fn(), setError: mockSetError })),
  );

  describe('useAddProductToCart', () => {
    test('should  mutate state', async () => {
      // Arrange
      const data = {
        companyId: '1',
        companyLocationId: '42',
        deliveryMethod: DeliveryMethodEnum.Courier,
        deliveryPointId: null,
        deliveryService: DeliveryServiceEnum.Seller,
        pickupDate: null,
        quantity: 1,
        variantId: '1',
      };

      const mocks = [
        {
          request: {
            query: AddProductToCartDocument,
            variables: { input: data },
          },
          result: {
            data: { addProductToCart: mockOrder },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useAddProductToCart({ companyId: '1' }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.addProductToCart).toEqual(mockOrder);
      });
    });
  });

  describe('useDestroyOrder', () => {
    test('should  mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const mockResult = { message: '' };
      const data = {
        orderId: mockOrderId,
      };

      const mocks = [
        {
          request: {
            query: DestroyOrderDocument,
            variables: { input: data },
          },
          result: {
            data: { destroyOrder: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useDestroyOrder({ orderId: mockOrderId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute());

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.destroyOrder).toEqual(mockResult);
      });
    });
  });

  describe('useUpdateOrderDelivery', () => {
    test('should  mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const data = {
        orderId: mockOrderId,
        deliveryMethod: DeliveryMethodEnum.Courier,
        deliveryService: DeliveryServiceEnum.Seller,
        companyLocationId: '1',
        deliveryPointId: '1',
        pickupDate: null,
      };

      const mocks = [
        {
          request: {
            query: UpdateOrderDeliveryDocument,
            variables: { input: data },
          },
          result: {
            data: { updateOrderDelivery: mockOrder },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateOrderDelivery({ orderId: mockOrderId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.updateOrderDelivery).toEqual(mockOrder);
      });
    });
  });

  describe('usePlaceOrder', () => {
    test('should  mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const data = {
        orderId: mockOrderId,
      };

      const mocks = [
        {
          request: {
            query: PlaceOrderDocument,
            variables: { input: data },
          },
          result: {
            data: { placeOrder: mockOrder },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => usePlaceOrder({ orderId: mockOrderId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute());

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.placeOrder).toEqual(mockOrder);
      });
    });
  });

  describe('useUpdateOrderQuantity', () => {
    test('should  mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const data = {
        orderId: mockOrderId,
        quantity: 10,
      };

      const mocks = [
        {
          request: {
            query: UpdateOrderQuantityDocument,
            variables: { input: data },
          },
          result: {
            data: { updateOrderQuantity: mockOrder },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateOrderQuantity(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.updateOrderQuantity).toEqual(mockOrder);
      });
    });
  });

  describe('useCreateReview', () => {
    test('should  mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const data = {
        orderId: mockOrderId,
        productBody: 'Product review',
        productRating: 4,
        companyBody: 'Company review',
        companyRating: 5,
      };

      const mocks = [
        {
          request: {
            query: CreateReviewDocument,
            variables: { input: data },
          },
          result: {
            data: { createReview: mockOrder },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateReview(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.createReview).toEqual(mockOrder);
      });
    });
  });

  describe('useFinishOrderDelivery', () => {
    test('should  mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const data = {
        orderId: mockOrderId,
      };

      const mocks = [
        {
          request: {
            query: FinishOrderDeliveryDocument,
            variables: { input: data },
          },
          result: {
            data: { finishOrderDelivery: mockOrder },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useFinishOrderDelivery({ orderId: mockOrderId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute());

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.finishOrderDelivery).toEqual(mockOrder);
      });
    });
  });

  describe('useConfirmReservedOrder', () => {
    test('should  mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const data = {
        orderId: mockOrderId,
      };

      const mocks = [
        {
          request: {
            query: ConfirmReservedOrderDocument,
            variables: { input: data },
          },
          result: {
            data: { confirmReservedOrder: mockOrder },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useConfirmReservedOrder({ orderId: mockOrderId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute());

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.confirmReservedOrder).toEqual(mockOrder);
      });
    });
  });

  describe('useCancelReservedOrder', () => {
    test('should  mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const data = {
        orderId: mockOrderId,
      };
      const mockOnSubmit = jest.fn();

      const mocks = [
        {
          request: {
            query: CancelReservedOrderDocument,
            variables: { input: data },
          },
          result: {
            data: { cancelReservedOrder: mockOrder },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useCancelReservedOrder({ orderId: mockOrderId, onSubmit: mockOnSubmit }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute());

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.cancelReservedOrder).toEqual(mockOrder);
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });
  });

  describe('useReserveOrder', () => {
    test('should  mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const data = {
        orderId: mockOrderId,
      };

      const mockResultData = {
        order: mockOrder,
        message: 'test message',
      };

      const mocks = [
        {
          request: {
            query: ReserveOrderDocument,
            variables: { input: data },
          },
          result: {
            data: { reserveOrder: mockResultData },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useReserveOrder({ orderId: mockOrderId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute());

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.reserveOrder).toEqual(mockResultData);
      });
    });
  });

  describe('useAddProductToGuestCart', () => {
    test('should  mutate state', async () => {
      // Arrange
      const mockOnCompleted = jest.fn();

      const data = {
        cityId: '1',
        deliveryMethod: DeliveryMethodEnum.Courier,
        deliveryService: DeliveryServiceEnum.Seller,
        deliveryPointId: null,
        pickupDate: null,
        quantity: 1,
        variantId: '1',
      };

      const mocks = [
        {
          request: {
            query: AddProductToGuestCartDocument,
            variables: { input: data },
          },
          result: {
            data: { addProductToGuestCart: mockOrder },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useAddProductToGuestCart({ onCompleted: mockOnCompleted }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.addProductToGuestCart).toEqual(mockOrder);
        expect(mockOnCompleted).toHaveBeenCalled();
      });
    });
  });

  describe('useConfirmOrderPayment', () => {
    const mockResultData = {
      id: '1',
      executionStatus: '',
    };

    test('should mutate state', async () => {
      // Arrange
      const orderId = '1';
      const data = {
        orderId,
      };
      const mocks = [
        {
          request: {
            query: ConfirmOrderPaymentDocument,
            variables: { input: data },
          },
          result: {
            data: { confirmOrderPayment: mockResultData },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useConfirmOrderPayment({ orderId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute());

      // Assert
      await waitFor(
        () => {
          expect(result.current[1]?.data?.confirmOrderPayment).toEqual(mockResultData);
        },
        { interval: 1 },
      );
    });
  });
});
