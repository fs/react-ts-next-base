import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useCreateDisputeProposal, useResolveDispute } from 'lib/apollo/hooks/actions/dispute';
import useNotifier from 'hooks/useNotifier';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { mockOrder } from '__tests__/mocks/mockOrders';
import { mockDispute } from '__tests__/mocks/mockDispute';

import CreateDisputeProposal from '.';

jest.mock('hooks/useNotifier');
jest.mock('lib/apollo/hooks/actions/dispute');

describe('CreateDisputeProposal', () => {
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setSuccess: jest.fn(),
      setError: jest.fn(),
    })),
  );

  const mockCreateDisputeProposal = jest.fn();
  const mockUseCreateDisputeProposal = jest.fn(() => [mockCreateDisputeProposal]);
  useCreateDisputeProposal.mockImplementation(mockUseCreateDisputeProposal);

  const mockResolveDispute = jest.fn();
  const mockUseResolveDispute = jest.fn(() => [mockResolveDispute]);
  useResolveDispute.mockImplementation(mockUseResolveDispute);

  test('should call useCreateDisputeProposal on submit', async () => {
    // Arrange
    const {
      dispute: { id: disputeId },
    } = mockOrder;
    const mockComment = 'test proposal comment';
    const expectedValues = {
      proposal: {
        returnRequired: true,
        returnQuantity: mockDispute.lastBuyerProposal.returnQuantity,
        productReturnAmount: 10,
        deliveryReturnAmount: mockDispute.lastBuyerProposal.deliveryReturnAmount,
        returnPayer: 'SELLER',
        comment: mockComment,
      },
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<CreateDisputeProposal order={mockOrder} query={{}} isSeller />),
        ),
      ),
    );
    await user.click(screen.getByTestId('proposal.returnRequired_true'));

    const productReturnAmountInput = screen.getByTestId('proposal.productReturnAmount');
    await user.clear(productReturnAmountInput);
    await user.type(productReturnAmountInput, String(expectedValues.proposal.productReturnAmount));
    await user.click(screen.getByTestId('proposal.returnPayer_SELLER'));
    await user.type(
      screen.getByTestId('proposal.deliveryReturnAmount'),
      String(expectedValues.proposal.deliveryReturnAmount),
    );
    await user.type(screen.getByTestId('proposal.comment'), mockComment);

    await user.click(screen.getByTestId('create-dispute-proposal-submit-button'));
    await user.click(await screen.findByTestId('confirm-modal-button'));

    // Assert
    expect(mockUseCreateDisputeProposal).toHaveBeenCalledWith({
      onSubmit: expect.any(Function),
      disputeId,
    });
    await waitFor(() => {
      expect(mockCreateDisputeProposal).toHaveBeenCalledWith(expectedValues);
    });
  });
});
