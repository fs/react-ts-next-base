import React from 'react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockOrder } from '__tests__/mocks/mockOrders';
import { mockDispute } from '__tests__/mocks/mockDispute';
import { render, screen, within } from '@testing-library/react';

import DisputeProposals from './DisputeProposals';

describe('DisputeProposals', () => {
  test('should render correct buttons for buyer', () => {
    // Arrange
    const expectedSellerTitle = 'Решение продавца';
    const expectedBuyerTitle = 'Мое решение';

    // Act
    render(
      renderWithApolloClient(
        renderWithTheme(
          <DisputeProposals
            order={mockOrder}
            isSeller={false}
            isAdmin={false}
            showActions
            dispute={mockDispute}
          />,
        ),
      ),
    );

    const sellerProposal = screen.getByTestId('seller-proposal');
    const buyerProposal = screen.getByTestId('buyer-proposal');

    const sellerProposalTitle = screen.getByTestId('seller-proposal-title');
    const buyerProposalTitle = screen.getByTestId('buyer-proposal-title');

    const resolveButton = within(sellerProposal).getByTestId('resolve-proposal-button');
    const declineButton = within(sellerProposal).getByTestId('decline-proposal-button');
    const requestDisputeSupportButton =
      within(buyerProposal).getByTestId('request-dispute-support');

    // Assert
    expect(sellerProposalTitle).toHaveTextContent(expectedSellerTitle);
    expect(buyerProposalTitle).toHaveTextContent(expectedBuyerTitle);
    expect(resolveButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();
    expect(requestDisputeSupportButton).toBeInTheDocument();
  });

  test('should render correct buttons for seller', () => {
    // Arrange
    const expectedSellerTitle = 'Мое решение';
    const expectedBuyerTitle = 'Решение покупателя';

    // Act
    render(
      renderWithApolloClient(
        renderWithTheme(
          <DisputeProposals
            order={mockOrder}
            isSeller
            isAdmin={false}
            showActions
            dispute={mockDispute}
          />,
        ),
      ),
    );

    const sellerProposal = screen.getByTestId('seller-proposal');
    const buyerProposal = screen.getByTestId('buyer-proposal');

    const sellerProposalTitle = screen.getByTestId('seller-proposal-title');
    const buyerProposalTitle = screen.getByTestId('buyer-proposal-title');

    const resolveButton = within(buyerProposal).getByTestId('resolve-proposal-button');
    const declineButton = within(buyerProposal).getByTestId('decline-proposal-button');
    const requestDisputeSupportButton =
      within(sellerProposal).getByTestId('request-dispute-support');

    // Assert
    expect(sellerProposalTitle).toHaveTextContent(expectedSellerTitle);
    expect(buyerProposalTitle).toHaveTextContent(expectedBuyerTitle);
    expect(resolveButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();
    expect(requestDisputeSupportButton).toBeInTheDocument();
  });
});
