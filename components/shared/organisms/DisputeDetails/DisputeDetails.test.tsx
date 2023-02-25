import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { DisputeStatusEnum } from 'graphql/types';
import { useDisputeProposals } from 'lib/apollo/hooks/state/disputeProposals';

import { mockOrder } from '__tests__/mocks/mockOrders';
import { mockDispute } from '__tests__/mocks/mockDispute';
import { mockDisputeProposals } from '__tests__/mocks/mockDisputeProposals';

import DisputeDetails from './DisputeDetails';

jest.mock('lib/apollo/hooks/state/disputeProposals');

const mockedUseDisputeProposals = useDisputeProposals as jest.MockedFunction<
  typeof useDisputeProposals
>;

describe('DisputeDetails', () => {
  const mockUseDisputeProposals = jest.fn(() => ({
    disputeProposals: mockDisputeProposals,
    pageInfo: { endCursor: null, hasNextPage: false },
    fetchMore: jest.fn(),
    loading: false,
    loadingMore: false,
    error: undefined,
  }));
  mockedUseDisputeProposals.mockImplementation(mockUseDisputeProposals);
  test('should show message about medagregator intervened', () => {
    // Arrange
    const mockDisputeWithStatus = {
      ...mockDispute,
      status: DisputeStatusEnum.MedagregatorIntervened,
    };
    const expectedText = 'В спор вмешался Medagregator';

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <DisputeDetails order={mockOrder} dispute={mockDisputeWithStatus} />,
        ),
      ),
    );

    const message = screen.getByTestId('medagregator-intervened-title');
    const disputeCounter = screen.getByTestId('dispute-counter');
    const disputeHistory = screen.getByTestId('dispute-history');

    // Assert
    expect(message).toHaveTextContent(expectedText);
    expect(disputeCounter).toBeInTheDocument();
    expect(disputeHistory).toBeInTheDocument();
  });

  test('should show correct items if status discussing', () => {
    // Arrange
    const mockDisputeWithStatus = {
      ...mockDispute,
      status: DisputeStatusEnum.Discussing,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <DisputeDetails order={mockOrder} dispute={mockDisputeWithStatus} />,
        ),
      ),
    );

    const sellerProposal = screen.getByTestId('seller-proposal-title');
    const buyerProposal = screen.getByTestId('buyer-proposal-title');
    const disputeHistory = screen.getByTestId('dispute-history');
    const disputeCounter = screen.getByTestId('dispute-counter');

    // Assert
    expect(disputeHistory).toBeInTheDocument();
    expect(disputeCounter).toBeInTheDocument();
    expect(sellerProposal).toBeInTheDocument();
    expect(buyerProposal).toBeInTheDocument();
  });

  test('should show message if dispute was canceled', () => {
    // Arrange
    const mockDisputeWithStatus = {
      ...mockDispute,
      status: DisputeStatusEnum.Canceled,
    };
    const expectedTitle = 'Спор отменен';

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <DisputeDetails order={mockOrder} dispute={mockDisputeWithStatus} />,
        ),
      ),
    );

    const title = screen.getByTestId('canceled-dispute');
    const disputeHistory = screen.getByTestId('dispute-history');

    // Assert
    expect(disputeHistory).toBeInTheDocument();
    expect(title).toHaveTextContent(expectedTitle);
  });

  test('should show message if proposal accepted', () => {
    // Arrange
    const mockDisputeWithStatus = {
      ...mockDispute,
      status: DisputeStatusEnum.ProposalAccepted,
      acceptedProposal: mockDisputeProposals[0],
    };
    const { seller } = mockOrder;
    const expectedTitle = `Решение по спору с компанией ${seller.legalForm.shortName} “${seller.officialName}” по заказу №${mockOrder.id} принято.`;

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <DisputeDetails order={mockOrder} dispute={mockDisputeWithStatus} />,
        ),
      ),
    );

    const title = screen.getByTestId('proposal-accepted-title');
    const disputeHistory = screen.getByTestId('dispute-history');
    const disputeCounter = screen.getByTestId('dispute-counter');

    // Assert
    expect(disputeHistory).toBeInTheDocument();
    expect(title).toHaveTextContent(expectedTitle);
    expect(disputeCounter).toBeInTheDocument();
  });
});
