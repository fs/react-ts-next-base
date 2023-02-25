import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { mockOrder } from '__tests__/mocks/mockOrders';
import { mockDispute } from '__tests__/mocks/mockDispute';

import { useCreateDisputeProposal } from 'lib/apollo/hooks/actions/dispute';
import { DisputeProposalReturnPayerEnum, DisputeStatusEnum } from 'graphql/types';

import CreateAdminDisputeProposal from './CreateAdminDisputeProposal';

jest.mock('lib/apollo/hooks/actions/dispute');

describe('CreateAdminDisputeProposal', () => {
  const mockedUseCreateDisputeProposal = useCreateDisputeProposal as jest.Mock;
  const mockCreateDisputeProposal = jest.fn();
  const mockUseCreateDisputeProposal = jest.fn(() => [mockCreateDisputeProposal]);
  mockedUseCreateDisputeProposal.mockImplementation(mockUseCreateDisputeProposal);
  test('should call useCreateDisputeProposal on submit', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockDisputeWithStatus = {
      ...mockDispute,
      status: DisputeStatusEnum.MedagregatorIntervened,
    };
    const { id: disputeId } = mockDisputeWithStatus;

    const expectedValues = {
      proposal: {
        returnRequired: true,
        returnQuantity: mockOrder.quantity,
        productReturnAmount: 10,
        deliveryReturnAmount: 40,
        returnPayer: DisputeProposalReturnPayerEnum.Seller,
        comment: '',
      },
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <CreateAdminDisputeProposal dispute={mockDisputeWithStatus} order={mockOrder} />,
          ),
        ),
      ),
    );

    const returnRequiredRadio = screen.getByTestId('proposal.returnRequired_true');
    await user.click(returnRequiredRadio);

    const productReturnAmountInput = screen.getByTestId('proposal.productReturnAmount');
    await user.clear(productReturnAmountInput);
    await user.type(productReturnAmountInput, String(expectedValues.proposal.productReturnAmount));

    const returnPayerSellerRadio = screen.getByTestId('proposal.returnPayer_SELLER');
    await user.click(returnPayerSellerRadio);

    const returnQuantityInput = screen.getByTestId('proposal.returnQuantity');
    await user.type(returnQuantityInput, String(expectedValues.proposal.returnQuantity));

    const deliveryReturnAmountInput = screen.getByTestId('proposal.deliveryReturnAmount');
    await user.type(
      deliveryReturnAmountInput,
      String(expectedValues.proposal.deliveryReturnAmount),
    );

    const submitFormButton = screen.getByTestId('create-dispute-proposal-submit-button');
    await user.click(submitFormButton);
    const confirmModalButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

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
