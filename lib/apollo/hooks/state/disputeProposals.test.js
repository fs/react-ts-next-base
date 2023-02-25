import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import { DisputeProposalsDocument } from 'graphql/queries/__generated__/disputeProposals.generated';

import {
  mockDisputeProposals,
  mockDisputeProposalsData,
} from '__tests__/mocks/mockDisputeProposals';

import { useDisputeProposals } from './disputeProposals';

describe('useDisputeProposals', () => {
  test('should return disputeProposals data', async () => {
    // Arrange
    const disputeId = '1';

    const variables = {
      disputeId,
      first: 12,
      after: '',
    };

    const mocks = [
      {
        request: {
          query: DisputeProposalsDocument,
          variables,
        },
        result: {
          data: mockDisputeProposalsData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useDisputeProposals(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.disputeProposals).toEqual(mockDisputeProposals);
    });
  });

  test('should return error', async () => {
    // Arrange
    const variables = {};
    const error = new Error();

    const mocks = [
      {
        request: {
          query: DisputeProposalsDocument,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useDisputeProposals(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
