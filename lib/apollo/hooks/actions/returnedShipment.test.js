import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import CreateReturnedShipment from 'graphql/mutations/createReturnedShipment.graphql';
import RejectReturnedShipment from 'graphql/mutations/rejectReturnedShipment.graphql';
import ConfirmReturnedShipment from 'graphql/mutations/confirmReturnedShipment.graphql';
import UpdateReturnedShipment from 'graphql/mutations/updateReturnedShipment.graphql';
import ReceiveReturnedShipment from 'graphql/mutations/receiveReturnedShipment.graphql';
import useNotifier from 'hooks/useNotifier';

import { mockReturnedShipment } from '__tests__/mocks/mockReturnedShipment';
import { mockOrder } from '__tests__/mocks/mockOrders';

import {
  useCreateReturnedShipment,
  useRejectReturnedShipment,
  useConfirmReturnedShipment,
  useUpdateReturnedShipment,
  useReceiveReturnedShipment,
} from './returnedShipment';

jest.mock('hooks/useNotifier');

describe('returnedShipment actions', () => {
  // Arrange
  useNotifier.mockImplementation(jest.fn(() => ({ setSuccess: jest.fn(), setError: jest.fn() })));

  describe('useCreateReturnedShipment', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockDisputeId = '1';
      const mockOnSubmit = () => {};

      const data = {
        disputeId: mockDisputeId,
        startDate: '2021-12-27T12:07:35Z',
        endDate: '2021-12-27T12:07:35Z',
        attachments: [
          {
            attachmentRemoteUrl: 'url',
          },
        ],
      };

      const mockResult = {
        attachments: [
          {
            attachmentUrl: 'url',
            originalFilename: 'product.png',
            id: '1',
          },
        ],
        endDate: '2022-08-26T08:48:39Z',
        id: '1',
        rejectComment: null,
        startDate: '2022-08-26T08:48:39Z',
        status: 'NOT_VERIFIED',
      };

      const mocks = [
        {
          request: {
            query: CreateReturnedShipment,
            variables: { input: data },
          },
          result: {
            data: { createReturnedShipment: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateReturnedShipment({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createReturnedShipment).toEqual(mockResult);
      });
    });
  });

  describe('useRejectReturnedShipment', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockOnSubmit = () => {};

      const data = {
        returnedShipmentId: '1',
        rejectComment: 'reject comment',
      };

      const mocks = [
        {
          request: {
            query: RejectReturnedShipment,
            variables: { input: data },
          },
          result: {
            data: { rejectReturnedShipment: mockReturnedShipment },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useRejectReturnedShipment({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.rejectReturnedShipment).toEqual(mockReturnedShipment);
      });
    });
  });

  describe('useConfirmReturnedShipment', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockOnSubmit = () => {};

      const data = {
        returnedShipmentId: '1',
      };

      const mocks = [
        {
          request: {
            query: ConfirmReturnedShipment,
            variables: { input: data },
          },
          result: {
            data: { confirmReturnedShipment: mockReturnedShipment },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useConfirmReturnedShipment({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.confirmReturnedShipment).toEqual(mockReturnedShipment);
      });
    });
  });

  describe('useUpdateReturnedShipment', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockOnSubmit = () => {};

      const data = {
        returnedShipmentId: '',
        startDate: '2021-12-27T12:07:35Z',
        endDate: '2021-12-27T12:07:35Z',
        attachments: [
          {
            attachmentRemoteUrl: 'url',
          },
        ],
      };

      const mocks = [
        {
          request: {
            query: UpdateReturnedShipment,
            variables: { input: data },
          },
          result: {
            data: { updateReturnedShipment: mockReturnedShipment },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateReturnedShipment({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateReturnedShipment).toEqual(mockReturnedShipment);
      });
    });
  });

  describe('useReceiveReturnedShipment', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockDispute = mockOrder.dispute;
      const mockOnSubmit = () => {};

      const data = {
        disputeId: '1',
      };

      const mocks = [
        {
          request: {
            query: ReceiveReturnedShipment,
            variables: { input: data },
          },
          result: {
            data: { receiveReturnedShipment: mockDispute },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useReceiveReturnedShipment({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.receiveReturnedShipment).toEqual(mockDispute);
      });
    });
  });
});
