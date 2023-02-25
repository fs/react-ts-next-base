import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';

import { useOpenDispute } from 'lib/apollo/hooks/actions/dispute';
import useNotifier from 'hooks/useNotifier';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { mockOrder } from '__tests__/mocks/mockOrders';

import { disputeReasonsNotDelivered } from 'config/constants/dispute';
import OpenDispute from '.';

jest.mock('hooks/useNotifier');
jest.mock('lib/apollo/hooks/actions/dispute');

describe('OpenDispute', () => {
  const mockedUseNotifier = useNotifier as jest.Mock;
  mockedUseNotifier.mockImplementation(
    jest.fn(() => ({
      setSuccess: jest.fn(),
      setError: jest.fn(),
    })),
  );

  const mockedUseOpenDispute = useOpenDispute as jest.Mock;
  const mockOpenDispute = jest.fn();
  const mockUseOpenDispute = jest.fn(() => [mockOpenDispute]);
  mockedUseOpenDispute.mockImplementation(mockUseOpenDispute);

  test('should call useOpenDispute on submit', async () => {
    // Arrange
    const { id: orderId, quantity, itemPrice } = mockOrder;
    const mockCompanyId = '100';
    const expectedReason = disputeReasonsNotDelivered[3];
    const mockQuery = {
      companyId: mockCompanyId,
      orderId,
    };
    const expectedValues = {
      dispute: {
        productDelivered: false,
        reason: expectedReason.value,
        comment: 'test comment',
        attachments: [],
      },
      proposal: {
        returnRequired: false,
        returnQuantity: quantity,
        productReturnAmount: quantity * itemPrice,
        deliveryReturnAmount: 100,
        returnPayer: 'SELLER',
      },
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<OpenDispute order={mockOrder} companyId={mockQuery.companyId} />),
        ),
      ),
    );
    await user.click(screen.getByTestId('dispute.productDelivered_false'));
    await selectEvent.openMenu(await screen.findByText('Выберите причину спора'));
    await selectEvent.select(screen.getByText('Выберите причину спора'), expectedReason.label);
    await user.type(screen.getByTestId('dispute.comment'), expectedValues.dispute.comment);
    await user.click(screen.getByTestId('proposal.returnRequired_false'));

    const productReturnAmountInput = screen.getByTestId('proposal.productReturnAmount');
    await user.clear(productReturnAmountInput);
    await user.type(productReturnAmountInput, String(expectedValues.proposal.productReturnAmount));
    await user.click(screen.getByTestId('proposal.returnPayer_SELLER'));
    await user.type(
      screen.getByTestId('proposal.deliveryReturnAmount'),
      String(expectedValues.proposal.deliveryReturnAmount),
    );

    await user.click(screen.getByTestId('create-dispute-submit-button'));
    await user.click(await screen.findByTestId('confirm-modal-button'));

    // Assert
    expect(mockUseOpenDispute).toHaveBeenCalledWith({
      onSubmit: expect.any(Function),
      orderId,
    });
    await waitFor(() => {
      expect(mockOpenDispute).toHaveBeenCalledWith(expectedValues);
    });
  });
});
