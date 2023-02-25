import React from 'react';
import { DisputeProposalReturnPayerEnum } from 'graphql/types';

import { render, screen } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { mockDispute } from '__tests__/mocks/mockDispute';
import { mockOrder } from '__tests__/mocks/mockOrders';

import CreateDisputeProposalForm from './CreateDisputeProposalForm';

describe('CreateDisputeProposalForm', () => {
  test('should not show comment field for admin', () => {
    // Arrange
    const mockOnCloseDispute = jest.fn();
    const mockOnSubmit = jest.fn();

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateDisputeProposalForm
            onSubmit={mockOnSubmit}
            onCloseDispute={mockOnCloseDispute}
            variant="admin"
            dispute={mockDispute}
            order={mockOrder}
          />,
        ),
      ),
    );
    const commentInput = screen.queryByTestId('proposal.comment');

    // Assert
    expect(commentInput).not.toBeInTheDocument();
  });
  test('should have initial values for seller', () => {
    // Arrange
    const mockOnCloseDispute = jest.fn();
    const mockOnSubmit = jest.fn();
    const { lastBuyerProposal } = mockDispute;
    const { productReturnAmount, returnQuantity, deliveryReturnAmount } = lastBuyerProposal;
    const dispute = {
      ...mockDispute,
      lastBuyerProposal: {
        ...mockDispute.lastBuyerProposal,
        returnPayer: DisputeProposalReturnPayerEnum.Seller,
      },
    };

    const order = {
      ...mockOrder,
      deliveryPrice: 1000,
      dispute,
    };

    const expectedValues = {
      productReturnAmount: `${productReturnAmount} руб.`,
      returnQuantity: returnQuantity.toString(),
      deliveryReturnAmount: `${deliveryReturnAmount} руб.`,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateDisputeProposalForm
            onSubmit={mockOnSubmit}
            onCloseDispute={mockOnCloseDispute}
            variant="seller"
            dispute={dispute}
            order={order}
          />,
        ),
      ),
    );
    const productReturnAmountInput = screen.getByTestId('proposal.productReturnAmount');
    const returnQuantityInput = screen.getByTestId('proposal.returnQuantity');
    const deliveryReturnAmountInput = screen.getByTestId('proposal.deliveryReturnAmount');
    const commentInput = screen.queryByTestId('proposal.comment');

    // Assert
    expect(productReturnAmountInput).toHaveValue(expectedValues.productReturnAmount);
    expect(returnQuantityInput).toHaveValue(expectedValues.returnQuantity);
    expect(deliveryReturnAmountInput).toHaveValue(expectedValues.deliveryReturnAmount);
    expect(commentInput).toHaveValue('');
  });

  test('should have initial values for buyer', () => {
    // Arrange
    const mockOnCloseDispute = jest.fn();
    const mockOnSubmit = jest.fn();
    const { lastSellerProposal } = mockDispute;
    const { productReturnAmount, returnQuantity } = lastSellerProposal;
    const dispute = {
      ...mockDispute,
      lastBuyerProposal: {
        ...mockDispute.lastBuyerProposal,
        returnPayer: DisputeProposalReturnPayerEnum.Buyer,
      },
    };

    const order = {
      ...mockOrder,
      deliveryPrice: 1000,
      dispute,
    };

    const expectedValues = {
      productReturnAmount: `${productReturnAmount} руб.`,
      returnQuantity: returnQuantity.toString(),
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateDisputeProposalForm
            onSubmit={mockOnSubmit}
            onCloseDispute={mockOnCloseDispute}
            variant="buyer"
            dispute={dispute}
            order={order}
          />,
        ),
      ),
    );
    const productReturnAmountInput = screen.getByTestId('proposal.productReturnAmount');
    const returnQuantityInput = screen.getByTestId('proposal.returnQuantity');
    const deliveryReturnAmountInput = screen.queryByTestId('proposal.deliveryReturnAmount');
    const commentInput = screen.queryByTestId('proposal.comment');

    // Assert
    expect(productReturnAmountInput).toHaveValue(expectedValues.productReturnAmount);
    expect(returnQuantityInput).toHaveValue(expectedValues.returnQuantity);
    expect(deliveryReturnAmountInput).not.toBeInTheDocument();
    expect(commentInput).toHaveValue('');
  });
});
