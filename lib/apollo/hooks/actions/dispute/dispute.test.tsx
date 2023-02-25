import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import useNotifier from 'hooks/useNotifier';

import {
  DisputeProposalReturnPayerEnum,
  DisputeReasonEnum,
  DisputeStatusEnum,
} from 'graphql/types';
import { OpenDisputeDocument } from 'graphql/mutations/__generated__/openDispute.generated';
import { CancelDisputeDocument } from 'graphql/mutations/__generated__/cancelDispute.generated';
import { ResolveDisputeDocument } from 'graphql/mutations/__generated__/resolveDispute.generated';
import { CreateDisputeProposalDocument } from 'graphql/mutations/__generated__/createDisputeProposal.generated';
import { RequestDisputeSupportDocument } from 'graphql/mutations/__generated__/requestDisputeSupport.generated';

import { mockAuthorizationResultSuccess } from '__tests__/mocks/mockAuthorizationResult';

import {
  useOpenDispute,
  useCreateDisputeProposal,
  useCancelDispute,
  useResolveDispute,
  useRequestDisputeSupport,
} from './dispute';

jest.mock('hooks/useNotifier');

describe('dispute actions', () => {
  // Arrange
  const mockedUseNotifier = useNotifier as jest.Mock;
  mockedUseNotifier.mockImplementation(
    jest.fn(() => ({ setSuccess: jest.fn(), setError: jest.fn() })),
  );

  describe('useOpenDispute', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const mockOnSubmit = () => {};

      const data = {
        orderId: mockOrderId,
        dispute: {
          productDelivered: true,
          reason: DisputeReasonEnum.Fake,
          comment: '',
          attachments: [],
        },
        proposal: {
          returnRequired: true,
          returnQuantity: 10,
          productReturnAmount: 1000,
          deliveryReturnAmount: 0,
          returnPayer: DisputeProposalReturnPayerEnum.Seller,
        },
      };

      const mockResult = {
        id: 1,
      };

      const mocks = [
        {
          request: {
            query: OpenDisputeDocument,
            variables: { input: data },
          },
          result: {
            data: { openDispute: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useOpenDispute({ orderId: mockOrderId, onSubmit: mockOnSubmit }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data?.openDispute).toEqual(mockResult);
      });
    });
  });

  describe('useCreateDisputeProposal', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockDisputeId = '1';
      const mockOnSubmit = () => {};

      const data = {
        disputeId: mockDisputeId,
        proposal: {
          returnRequired: true,
          returnQuantity: 10,
          productReturnAmount: 1000,
          deliveryReturnAmount: 0,
          returnPayer: DisputeProposalReturnPayerEnum.Seller,
        },
      };

      const mockResult = {
        id: 1,
      };

      const mocks = [
        {
          request: {
            query: CreateDisputeProposalDocument,
            variables: { input: data },
          },
          result: {
            data: { createDisputeProposal: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useCreateDisputeProposal({ disputeId: mockDisputeId, onSubmit: mockOnSubmit }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data?.createDisputeProposal).toEqual(mockResult);
      });
    });
  });

  describe('useCancelDispute', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockOrderId = '1';
      const mockDisputeId = '1';

      const data = {
        disputeId: mockDisputeId,
      };

      const mockResult = {
        id: '1',
      };

      const mocks = [
        {
          request: {
            query: CancelDisputeDocument,
            variables: { input: data },
          },
          result: {
            data: { cancelDispute: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () =>
          useCancelDispute({
            disputeId: mockDisputeId,
            orderId: mockOrderId,
          }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute());

      // Assert
      await waitFor(() => {
        expect(result.current[1].data?.cancelDispute).toEqual(mockResult);
      });
    });
  });

  describe('useResolveDispute', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockProposalId = '1';
      const mockOnSubmit = () => {};

      const data = {
        proposalId: mockProposalId,
      };

      const mockResult = {
        id: '1',
      };

      const mocks = [
        {
          request: {
            query: ResolveDisputeDocument,
            variables: { input: data },
          },
          result: {
            data: { resolveDispute: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useResolveDispute({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data?.resolveDispute).toEqual(mockResult);
      });
    });
  });

  describe('useRequestDisputeSupport', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockDisputeId = '1';
      const mockOnSubmit = () => {};

      const data = {
        disputeId: mockDisputeId,
      };

      const mockResult = {
        dispute: {
          id: '1',
          status: DisputeStatusEnum.MedagregatorIntervened,
          canRequestSupport: mockAuthorizationResultSuccess,
          canAcceptProposal: mockAuthorizationResultSuccess,
          canCreateProposal: mockAuthorizationResultSuccess,
          medagregatorResponseDeadlineAt: null,
        },
      };

      const mocks = [
        {
          request: {
            query: RequestDisputeSupportDocument,
            variables: { input: data },
          },
          result: {
            data: { requestDisputeSupport: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useRequestDisputeSupport({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data?.requestDisputeSupport).toEqual(mockResult);
      });
    });
  });
});
