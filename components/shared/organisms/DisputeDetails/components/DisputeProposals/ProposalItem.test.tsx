import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DASHBOARD_COMPANY_CREATE_DISPUTE_PROPOSAL } from 'config/routes';
import { ResolveDisputeInput } from 'graphql/types';
import { mockDispute } from '__tests__/mocks/mockDispute';
import { mockOrder } from '__tests__/mocks/mockOrders';
import { mockDisputeProposals } from '__tests__/mocks/mockDisputeProposals';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import { useResolveDispute } from 'lib/apollo/hooks/actions/dispute';
import useRouter from 'hooks/useRouter';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import ProposalItem from './ProposalItem';

jest.mock('lib/apollo/hooks/actions/dispute');
jest.mock('hooks/useRouter');

const mockedUseResolveDispute = useResolveDispute as jest.Mock;
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('ProposalItem', () => {
  const mockResolveDispute = jest.fn();
  const mockUseResolveDispute = jest.fn(() => [mockResolveDispute]);
  mockedUseResolveDispute.mockImplementation(mockUseResolveDispute);

  const mockPushRoute = jest.fn();
  const mockUseRouter = jest.fn(() => ({
    ...mockUseRouterData,
    pushRoute: mockPushRoute,
  }));
  mockedUseRouter.mockImplementation(mockUseRouter);

  const mockProposal = mockDisputeProposals[0];

  test('should call resolveDispute on accept buyers proposal by seller', async () => {
    // Arrange
    const expectedValues = {
      proposalId: mockProposal.id,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          renderWithNiceModal(
            <ProposalItem
              dispute={mockDispute}
              order={mockOrder}
              proposal={mockProposal}
              isSeller
              isSellersProposal={false}
              showActions
            />,
          ),
        ),
      ),
    );
    const resolveButton = screen.getByTestId('resolve-proposal-button');
    await user.click(resolveButton);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    await waitFor(() => {
      expect(mockResolveDispute).toHaveBeenCalledWith<ResolveDisputeInput[]>(expectedValues);
    });
  });

  test('should open decline buyers proposal form by seller', async () => {
    // Arrange
    const expectedDescription = 'Вы уверены, что хотите отклонить решение покупателя по спору?';
    const expectedCompanyId = mockOrder.buyer.id;
    const expectedOrderId = mockOrder.id;

    // Act
    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          renderWithNiceModal(
            <ProposalItem
              dispute={mockDispute}
              order={mockOrder}
              proposal={mockProposal}
              isSeller
              isSellersProposal={false}
              showActions
            />,
          ),
        ),
      ),
    );
    const declineButton = screen.getByTestId('decline-proposal-button');
    await user.click(declineButton);

    expect(screen.getByTestId('modal-description')).toHaveTextContent(expectedDescription);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    expect(mockPushRoute).toHaveBeenCalledWith({
      pathname: DASHBOARD_COMPANY_CREATE_DISPUTE_PROPOSAL,
      query: {
        companyId: expectedCompanyId,
        orderId: expectedOrderId,
      },
    });
  });

  test('should call resolveDispute on accept sellers proposal dispute by buyer', async () => {
    // Arrange
    const expectedValues = {
      proposalId: mockProposal.id,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          renderWithNiceModal(
            <ProposalItem
              dispute={mockDispute}
              order={mockOrder}
              proposal={mockProposal}
              isSeller={false}
              isSellersProposal
              showActions
            />,
          ),
        ),
      ),
    );
    const resolveButton = screen.getByTestId('resolve-proposal-button');
    await user.click(resolveButton);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    await waitFor(() => {
      expect(mockResolveDispute).toHaveBeenCalledWith<ResolveDisputeInput[]>(expectedValues);
    });
  });

  test('should open decline sellers proposal form by buyer', async () => {
    // Arrange
    const expectedDescription = 'Вы уверены, что хотите отклонить решение продавца по спору?';
    const expectedCompanyId = mockOrder.buyer.id;
    const expectedOrderId = mockOrder.id;

    // Act
    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          renderWithNiceModal(
            <ProposalItem
              dispute={mockDispute}
              order={mockOrder}
              proposal={mockProposal}
              isSeller={false}
              isSellersProposal
              showActions
            />,
          ),
        ),
      ),
    );
    const declineButton = screen.getByTestId('decline-proposal-button');
    await user.click(declineButton);

    expect(screen.getByTestId('modal-description')).toHaveTextContent(expectedDescription);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    expect(mockPushRoute).toHaveBeenCalledWith({
      pathname: DASHBOARD_COMPANY_CREATE_DISPUTE_PROPOSAL,
      query: {
        companyId: expectedCompanyId,
        orderId: expectedOrderId,
      },
    });
  });
});
