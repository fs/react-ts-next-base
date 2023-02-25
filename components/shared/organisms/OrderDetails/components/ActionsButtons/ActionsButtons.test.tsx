import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { mockOrders } from '__tests__/mocks/mockOrders';
import { mockDispute } from '__tests__/mocks/mockDispute';
import { mockReturnedShipment } from '__tests__/mocks/mockReturnedShipment';
import { mockProductReviews } from '__tests__/mocks/mockProductReviews';
import { mockAuthorizationResultSuccess } from '__tests__/mocks/mockAuthorizationResult';

import {
  OrderCheckoutStatusEnum,
  OrderExecutionStatusEnum,
  OrderReservationStatusEnum,
} from 'graphql/types';

import { useCancelDispute } from 'lib/apollo/hooks/actions/dispute';
import { useReceiveReturnedShipment } from 'lib/apollo/hooks/actions/returnedShipment';
import {
  useCancelReservedOrder,
  useConfirmReservedOrder,
  useDestroyOrder,
  useFinishOrderDelivery,
  useConfirmOrderPayment,
} from 'lib/apollo/hooks/actions/order';

import ActionsButtons from './ActionsButtons';

jest.mock('lib/apollo/hooks/actions/order');
jest.mock('lib/apollo/hooks/actions/dispute');
jest.mock('lib/apollo/hooks/actions/returnedShipment');

describe('ActionButtons', () => {
  const mockRefetchOrders = jest.fn();
  const mockCompanyId = '1';

  const mockedUseDestroyOrder = useDestroyOrder as jest.Mock;
  const mockDestroyOrder = jest.fn(() => {});
  const mockUseDestroyOrder = jest.fn(() => [mockDestroyOrder]);
  mockedUseDestroyOrder.mockImplementation(mockUseDestroyOrder);

  const mockedUseFinishOrderDelivery = useFinishOrderDelivery as jest.Mock;
  const mockFinishOrderDelivery = jest.fn(() => {});
  const mockUseFinishOrderDelivery = jest.fn(() => [mockFinishOrderDelivery]);
  mockedUseFinishOrderDelivery.mockImplementation(mockUseFinishOrderDelivery);

  const mockedUseConfirmOrderPayment = useConfirmOrderPayment as jest.Mock;
  const mockConfirmOrderPayment = jest.fn(() => {});
  const mockUseConfirmOrderPayment = jest.fn(() => [mockConfirmOrderPayment]);
  mockedUseConfirmOrderPayment.mockImplementation(mockUseConfirmOrderPayment);

  const mockedUseCancelDispute = useCancelDispute as jest.Mock;
  const mockCancelDispute = jest.fn(() => {});
  const mockUseCancelDispute = jest.fn(() => [mockCancelDispute]);
  mockedUseCancelDispute.mockImplementation(mockUseCancelDispute);

  const mockedUseReceiveReturnedShipment = useReceiveReturnedShipment as jest.Mock;
  const mockReceiveReturnedShipment = jest.fn(() => {});
  const mockUseReceiveReturnedShipment = jest.fn(() => [mockReceiveReturnedShipment]);
  mockedUseReceiveReturnedShipment.mockImplementation(mockUseReceiveReturnedShipment);

  const mockedUseConfirmReservedOrder = useConfirmReservedOrder as jest.Mock;
  const mockConfirmReservedOrder = jest.fn(() => {});
  const mockUseConfirmReservedOrder = jest.fn(() => [mockConfirmReservedOrder]);
  mockedUseConfirmReservedOrder.mockImplementation(mockUseConfirmReservedOrder);

  const mockedUseCancelReservedOrder = useCancelReservedOrder as jest.Mock;
  const mockCancelReservedOrder = jest.fn(() => {});
  const mockUseCancelReservedOrder = jest.fn(() => [mockCancelReservedOrder]);
  mockedUseCancelReservedOrder.mockImplementation(mockUseCancelReservedOrder);

  describe('admin operations variant', () => {
    test('should call useDestroyOrder on delete order button click for execution status = PaymentPending & isDetailed = false', async () => {
      // Arrange
      const user = userEvent.setup();
      const mockOrder = {
        ...mockOrders[0],
        executionStatus: OrderExecutionStatusEnum.PaymentPending,
      };
      const expectedData = {
        orderId: mockOrder.id,
        onSubmit: expect.any(Function),
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <ActionsButtons
                order={mockOrder}
                isDetailed={false}
                refetchOrders={mockRefetchOrders}
                variant="admin_operation"
              />,
            ),
          ),
        ),
      );

      // Act
      const deleteOrderButton = screen.getByTestId('delete-order-button');
      const openOperationButton = screen.getByTestId('open-operations-page');

      await user.click(deleteOrderButton);
      const submitButton = screen.getByTestId('confirm-modal-button');

      await user.click(submitButton);

      // Assert
      expect(deleteOrderButton).toBeInTheDocument();
      expect(openOperationButton).toBeInTheDocument();
      expect(mockedUseDestroyOrder).toHaveBeenCalledWith(expectedData);

      await waitFor(() => {
        expect(mockDestroyOrder).toHaveBeenCalled();
      });
    });

    test('should call useConfirmOrderPayment on delete order button click ', async () => {
      // Arrange
      const user = userEvent.setup();
      const mockOrder = {
        ...mockOrders[0],
        executionStatus: OrderExecutionStatusEnum.PaymentPending,
      };
      const expectedData = {
        orderId: mockOrder.id,
        deleteFromCache: false,
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <ActionsButtons
                order={mockOrder}
                isDetailed
                refetchOrders={mockRefetchOrders}
                variant="admin_operation"
              />,
            ),
          ),
        ),
      );

      // Act
      const confirmOrderPaymentButton = screen.getByTestId('confirm-order-payment-button');
      await user.click(confirmOrderPaymentButton);
      const submitButton = screen.getByTestId('confirm-modal-button');

      await user.click(submitButton);

      // Assert
      expect(mockUseConfirmOrderPayment).toHaveBeenCalledWith(expectedData);

      await waitFor(() => {
        expect(mockConfirmOrderPayment).toHaveBeenCalled();
      });
    });

    test('should show 0 buttons if status != PaymentPending and isDetailed', async () => {
      // Arrange
      const mockOrder = {
        ...mockOrders[0],
        executionStatus: OrderExecutionStatusEnum.Confirmed,
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            <ActionsButtons
              order={mockOrder}
              isDetailed
              refetchOrders={mockRefetchOrders}
              variant="admin_operation"
            />,
          ),
        ),
      );

      // Act
      const deleteOrderButton = screen.queryByTestId('delete-order-button');
      const openOperationButton = screen.queryByTestId('open-operations-page');
      const confirmOrderPaymentButton = screen.queryByTestId('confirm-order-payment-button');

      // Assert
      expect(deleteOrderButton).not.toBeInTheDocument();
      expect(openOperationButton).not.toBeInTheDocument();
      expect(confirmOrderPaymentButton).not.toBeInTheDocument();
    });

    test('should show PlaceOrderButton if status is Reserved', async () => {
      // Arrange
      const mockOrder = {
        ...mockOrders[0],
        checkoutStatus: OrderCheckoutStatusEnum.Reserved,
        reservationStatus: OrderReservationStatusEnum.PendingConfirmation,
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            <ActionsButtons
              order={mockOrder}
              isDetailed
              refetchOrders={mockRefetchOrders}
              variant="admin_operation"
            />,
          ),
        ),
      );

      // Act
      const adminCancelReservedButton = screen.getByTestId('admin-cancel-reserved-button');
      const adminPlaceReservedButton = screen.getByTestId('admin-place-reserved-button');

      // Assert
      expect(adminCancelReservedButton).toBeInTheDocument();
      expect(adminPlaceReservedButton).toBeInTheDocument();
    });

    test('should call useConfirmReservedOrder on PlaceOrderButton submit', async () => {
      // Arrange
      const user = userEvent.setup();
      const mockOrder = {
        ...mockOrders[0],
        checkoutStatus: OrderCheckoutStatusEnum.Reserved,
        reservationStatus: OrderReservationStatusEnum.PendingConfirmation,
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <ActionsButtons
                order={mockOrder}
                isDetailed
                refetchOrders={mockRefetchOrders}
                variant="admin_operation"
              />,
            ),
          ),
        ),
      );

      // Act
      const adminPlaceReservedButton = screen.getByTestId('admin-place-reserved-button');
      await user.click(adminPlaceReservedButton);
      const confirmButton = screen.getByTestId('confirm-modal-button');
      await user.click(confirmButton);

      // Assert
      await waitFor(() => {
        expect(mockConfirmReservedOrder).toHaveBeenCalled();
      });
    });
  });

  describe('admin disputes variant', () => {
    test('should show only create proposal button if is detailed and canCreateProposal', () => {
      const mockCurrentOrder = {
        ...mockOrders[0],
        dispute: {
          ...mockDispute,
          canCreateProposal: mockAuthorizationResultSuccess,
        },
      };
      // Arrange
      render(
        renderWithTheme(
          renderWithApolloClient(
            <ActionsButtons order={mockCurrentOrder} isDetailed variant="admin_disputes" />,
          ),
        ),
      );

      // Act
      const openDisputePageButton = screen.queryByTestId('open-dispute-page');
      const createDisputeProposal = screen.getByTestId('create-dispute-proposal-by-admin');

      // Assert
      expect(openDisputePageButton).not.toBeInTheDocument();
      expect(createDisputeProposal).toBeInTheDocument();
    });

    test('should show button if is not detailed', () => {
      // Arrange
      render(
        renderWithTheme(
          renderWithApolloClient(
            <ActionsButtons order={mockOrders[0]} isDetailed={false} variant="admin_disputes" />,
          ),
        ),
      );

      // Act
      const openDisputePageButton = screen.queryByTestId('open-dispute-page');

      // Assert
      expect(openDisputePageButton).toBeInTheDocument();
    });
  });

  describe('documents variant', () => {
    test('should show button if isDetailed', () => {
      // Arrange
      render(
        renderWithTheme(
          renderWithApolloClient(
            <ActionsButtons order={mockOrders[0]} isDetailed variant="documents" />,
          ),
        ),
      );

      // Act
      const openDocumentsPageButton = screen.queryByTestId('open-documents-page');

      // Assert
      expect(openDocumentsPageButton).not.toBeInTheDocument();
    });

    test('should show button if is not detailed', () => {
      // Arrange
      render(
        renderWithTheme(
          renderWithApolloClient(
            <ActionsButtons
              companyId={mockCompanyId}
              order={mockOrders[0]}
              isDetailed={false}
              variant="documents"
            />,
          ),
        ),
      );

      // Act
      const openDocumentsPageButton = screen.queryByTestId('open-documents-page');

      // Assert
      expect(openDocumentsPageButton).toBeInTheDocument();
    });
  });

  describe('default variant', () => {
    test('should show button if isDetailed', () => {
      // Arrange
      render(
        renderWithTheme(
          renderWithApolloClient(
            <ActionsButtons order={mockOrders[0]} isDetailed variant="default" />,
          ),
        ),
      );

      // Act
      const openShowMoreDetailsButton = screen.queryByTestId('show-more-details');

      // Assert
      expect(openShowMoreDetailsButton).not.toBeInTheDocument();
    });

    test('should show button if is not detailed', () => {
      // Arrange
      render(
        renderWithTheme(
          renderWithApolloClient(
            <ActionsButtons
              companyId={mockCompanyId}
              order={mockOrders[0]}
              isDetailed={false}
              variant="default"
            />,
          ),
        ),
      );

      // Act
      const openShowMoreDetailsButton = screen.queryByTestId('show-more-details');

      // Assert
      expect(openShowMoreDetailsButton).toBeInTheDocument();
    });

    test('should show open documents button if executionStatus is PaymentPending and user buyer', () => {
      // Arrange
      const mockOrder = {
        ...mockOrders[0],
        executionStatus: OrderExecutionStatusEnum.PaymentPending,
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            <ActionsButtons
              companyId={mockCompanyId}
              order={mockOrder}
              isDetailed={false}
              variant="default"
              isUserBuyer
            />,
          ),
        ),
      );

      // Act
      const openAccountsPageButton = screen.getByTestId('open-accounts-page-button');

      // Assert
      expect(openAccountsPageButton).toBeInTheDocument();
    });

    test('should call useFinishOrderDelivery on submit for execution status = InTransit & isUserBuyer = true', async () => {
      // Arrange
      const user = userEvent.setup();
      const mockOrder = {
        ...mockOrders[0],
        executionStatus: OrderExecutionStatusEnum.InTransit,
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <ActionsButtons
                companyId={mockCompanyId}
                order={mockOrder}
                isDetailed={false}
                variant="default"
                isUserBuyer
              />,
            ),
          ),
        ),
      );

      // Act
      const finishOrderDeliveryButton = screen.getByTestId('finish-order-delivery-button');
      const openDisputeButton = screen.getByTestId('open-dispute-button');

      await user.click(finishOrderDeliveryButton);
      const submitButton = screen.getByTestId('confirm-modal-button');

      await user.click(submitButton);

      // Assert
      expect(openDisputeButton).toBeInTheDocument();
      expect(finishOrderDeliveryButton).toBeInTheDocument();
      await waitFor(() => {
        expect(mockFinishOrderDelivery).toHaveBeenCalled();
      });
    });

    test('should show review details button for execution status = Delivered & product or seller company has review', async () => {
      // Arrange
      const mockOrder = {
        ...mockOrders[0],
        executionStatus: OrderExecutionStatusEnum.Delivered,
        productReview: mockProductReviews[0],
      };

      // Act
      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <ActionsButtons
                companyId={mockCompanyId}
                order={mockOrder}
                isDetailed={false}
                variant="default"
                isUserBuyer
              />,
            ),
          ),
        ),
      );
      const showReviewDetailsButton = screen.getByTestId('show-review-details-button');

      // Assert
      expect(showReviewDetailsButton).toBeInTheDocument();
    });

    test('should show leave review button for execution status = Delivered & user buyer & user can leave review', async () => {
      // Arrange
      const mockOrder = {
        ...mockOrders[0],
        executionStatus: OrderExecutionStatusEnum.Delivered,
        canLeaveReview: { value: true },
      };

      // Act
      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <ActionsButtons
                companyId={mockCompanyId}
                order={mockOrder}
                isDetailed={false}
                variant="default"
                isUserBuyer
              />,
            ),
          ),
        ),
      );
      const reviewModalButton = screen.getByTestId('review-modal-button');

      // Assert
      expect(reviewModalButton).toBeInTheDocument();
    });

    test('should call useCancelDispute on submit for execution status = MedagregatorIntervened & isDetailed & user can cancel dispute', async () => {
      // Arrange
      const user = userEvent.setup();
      const mockOrder = {
        ...mockOrders[0],
        executionStatus: OrderExecutionStatusEnum.MedagregatorIntervened,
        dispute: {
          ...mockDispute,
          canCancel: mockAuthorizationResultSuccess,
        },
      };

      const expectedData = {
        onSubmit: mockRefetchOrders,
        orderId: mockOrder?.id,
        disputeId: mockOrder?.dispute?.id,
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <ActionsButtons
                companyId={mockCompanyId}
                order={mockOrder}
                isDetailed
                variant="default"
                isUserBuyer
                refetchOrders={mockRefetchOrders}
              />,
            ),
          ),
        ),
      );

      // Act
      const cancelDisputeButton = screen.getByTestId('cancel-dispute-button');

      await user.click(cancelDisputeButton);
      const submitButton = screen.getByTestId('confirm-modal-button');

      await user.click(submitButton);

      // Assert
      expect(mockUseCancelDispute).toHaveBeenCalledWith(expectedData);
      await waitFor(() => {
        expect(mockCancelDispute).toHaveBeenCalled();
      });
    });

    test('should call useReceiveReturnedShipment on submit for execution status = MedagregatorIntervened & isDetailed & user can receive returned shipment', async () => {
      // Arrange
      const user = userEvent.setup();
      const mockOrder = {
        ...mockOrders[0],
        executionStatus: OrderExecutionStatusEnum.MedagregatorIntervened,
        dispute: {
          ...mockDispute,
          canReceiveReturnedShipment: mockAuthorizationResultSuccess,
        },
      };

      const expectedData = {
        onSubmit: mockRefetchOrders,
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <ActionsButtons
                companyId={mockCompanyId}
                order={mockOrder}
                isDetailed
                variant="default"
                isUserBuyer
                refetchOrders={mockRefetchOrders}
              />,
            ),
          ),
        ),
      );

      // Act
      const receiveReturnedShipmentButton = screen.getByTestId('receive-returned-shipment-button');

      await user.click(receiveReturnedShipmentButton);
      const submitButton = screen.getByTestId('confirm-modal-button');

      await user.click(submitButton);

      // Assert
      expect(mockUseReceiveReturnedShipment).toHaveBeenCalledWith(expectedData);
      await waitFor(() => {
        expect(mockReceiveReturnedShipment).toHaveBeenCalled();
      });
    });

    test('should show create and update returned shipment buttons for execution status = MedagregatorIntervened & isDetailed & user canCreateReturnedShipment & canUpdateReturnedShipment', async () => {
      // Arrange
      const mockOrder = {
        ...mockOrders[0],
        executionStatus: OrderExecutionStatusEnum.MedagregatorIntervened,
        dispute: {
          ...mockDispute,
          returnedShipment: {
            ...mockReturnedShipment,
            canUpdate: mockAuthorizationResultSuccess,
          },
          canCreateReturnedShipment: mockAuthorizationResultSuccess,
        },
      };

      // Act
      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <ActionsButtons
                companyId={mockCompanyId}
                order={mockOrder}
                isDetailed
                variant="default"
                isUserBuyer
              />,
            ),
          ),
        ),
      );
      const showCreateReturnedShipmentButton = screen.getByTestId(
        'show-create-returned-shipment-button',
      );
      const showUpdateReturnedShipmentButton = screen.getByTestId(
        'show-update-returned-shipment-button',
      );

      // Assert
      expect(showCreateReturnedShipmentButton).toBeInTheDocument();
      expect(showUpdateReturnedShipmentButton).toBeInTheDocument();
    });
  });
});
