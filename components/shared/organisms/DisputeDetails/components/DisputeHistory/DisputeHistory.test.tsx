import React from 'react';
import { render, screen } from '@testing-library/react';

import { mockDispute } from '__tests__/mocks/mockDispute';
import { mockDisputeProposals } from '__tests__/mocks/mockDisputeProposals';

import { useDisputeProposals } from 'lib/apollo/hooks/state/disputeProposals';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import DisputeHistory from '.';

jest.mock('lib/apollo/hooks/state/disputeProposals');

const mockedUseDisputeProposals = useDisputeProposals as jest.MockedFunction<
  typeof useDisputeProposals
>;

describe('DisputeHistory', () => {
  const mockUseDisputeProposals = jest.fn(() => ({
    disputeProposals: mockDisputeProposals,
    pageInfo: { endCursor: null, hasNextPage: false },
    fetchMore: jest.fn(),
    loading: false,
    loadingMore: false,
    error: undefined,
  }));
  mockedUseDisputeProposals.mockImplementation(mockUseDisputeProposals);

  test('should show dispute proposals', async () => {
    // Arrange
    const expectedHistoryLength = mockDisputeProposals.length;
    const expectedValues = {
      disputeId: mockDispute.id,
    };

    // Act
    render(
      renderWithApolloClient(
        renderWithTheme(renderWithNiceModal(<DisputeHistory dispute={mockDispute} />)),
      ),
    );
    const historyItems = screen.getAllByTestId('dispute-history-item');

    // Assert
    expect(historyItems).toHaveLength(expectedHistoryLength);
    expect(mockUseDisputeProposals).toHaveBeenCalledWith<Parameters<typeof useDisputeProposals>>(
      expectedValues,
    );
  });
});
