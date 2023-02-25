import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import useCurrentUser from 'hooks/useCurrentUser';
import { useCancelReservedOrder, useConfirmReservedOrder } from 'lib/apollo/hooks/actions/order';
import {
  useCreateSupportRequest,
  useCreatePublicSupportRequest,
} from 'lib/apollo/hooks/actions/support';

import { mockOrders } from '__tests__/mocks/mockOrders';
import { mockUseCurrentUserRegisteredData } from '__tests__/mocks/mockCurrentUser';

import { OrderReservationStatusEnum } from 'graphql/types';

import ReservedOrders from '.';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/actions/order');
jest.mock('lib/apollo/hooks/actions/support');

const mockedUseCancelReservedOrder = useCancelReservedOrder as jest.Mock;
const mockedUseConfirmReservedOrder = useConfirmReservedOrder as jest.Mock;
const mockedUseCreateSupportRequest = useCreateSupportRequest as jest.Mock;
const mockedUseCreatePublicSupportRequest = useCreatePublicSupportRequest as jest.Mock;

describe('ReservedOrders', () => {
  const mockCreatePublicSupportRequest = jest.fn(() => Promise.resolve());
  mockedUseCreatePublicSupportRequest.mockImplementation(
    jest.fn(() => [mockCreatePublicSupportRequest]),
  );

  const mockCreateSupportRequest = jest.fn(() => Promise.resolve());
  mockedUseCreateSupportRequest.mockImplementation(jest.fn(() => [mockCreateSupportRequest]));

  const mockCancelReservedOrder = jest.fn(() => {});
  const mockUseCancelReservedOrder = jest.fn(() => [mockCancelReservedOrder]);
  mockedUseCancelReservedOrder.mockImplementation(mockUseCancelReservedOrder);

  const mockConfirmReservedOrder = jest.fn(() => {});
  const mockUseConfirmReservedOrder = jest.fn(() => [mockConfirmReservedOrder]);
  mockedUseConfirmReservedOrder.mockImplementation(mockUseConfirmReservedOrder);

  const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;
  const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
  mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

  test('should show OrderCartDetails', async () => {
    // Arrange
    const expectedOrderId = mockOrders[0].id;
    const mockReservedOrders = mockOrders.map(order => ({
      ...order,
      reservationStatus: OrderReservationStatusEnum.PendingConfirmation,
    }));

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ReservedOrders
            isCompanyVerified={false}
            orders={mockReservedOrders}
            refetchReservedOrders={jest.fn()}
          />,
        ),
      ),
    );
    const orderCartDetailsItem = screen.getByTestId(`order-cart-details-${expectedOrderId}`);

    // Assert
    expect(orderCartDetailsItem).toBeInTheDocument();
  });

  test('should show OrderDetails', async () => {
    // Arrange
    const mockReservedOrders = mockOrders.map(order => ({
      ...order,
      reservationStatus: OrderReservationStatusEnum.Confirmed,
    }));

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ReservedOrders
            isCompanyVerified
            orders={mockReservedOrders}
            refetchReservedOrders={jest.fn()}
          />,
        ),
      ),
    );
    const orderCartDetailsItem = screen.getByTestId('order-details');

    // Assert
    expect(orderCartDetailsItem).toBeInTheDocument();
  });

  test('should show notification for not_verified company and not_confirmed order', async () => {
    // Arrange
    const expectedTitle =
      'Эта страница будет вам доступна после того, как компания пройдет проверку.';
    const expectedNotification =
      'чтобы принять одно из предложенных ниже действий по заказу. Если вы ничего не выберите, заказ будет отменен автоматически.';
    const mockReservedOrders = mockOrders.map(order => ({
      ...order,
      reservationStatus: OrderReservationStatusEnum.PendingConfirmation,
    }));

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ReservedOrders
            isCompanyVerified={false}
            orders={mockReservedOrders}
            refetchReservedOrders={jest.fn()}
          />,
        ),
      ),
    );
    const noticeTitle = screen.getByTestId('guest-order-notice-title');
    const noticeDescription = screen.getByTestId('guest-order-notice-description');

    // Assert
    expect(noticeTitle).toHaveTextContent(expectedTitle);
    expect(noticeDescription).toHaveTextContent(expectedNotification);
  });

  test('should show notification for verified company and support_requested order', async () => {
    // Arrange
    const expectedTitle = 'Поздравляем, вы зарегистрировали компанию!';
    const expectedNotification =
      'Скоро с вами свяжутся наши администраторы. По результатам разговора, администраторы оформят или удалят ваш заказ.';
    const mockReservedOrders = mockOrders.map(order => ({
      ...order,
      reservationStatus: OrderReservationStatusEnum.SupportRequested,
    }));

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ReservedOrders
            isCompanyVerified
            orders={mockReservedOrders}
            refetchReservedOrders={jest.fn()}
          />,
        ),
      ),
    );
    const noticeTitle = screen.getByTestId('guest-order-notice-title');
    const noticeDescription = screen.getByTestId('guest-order-notice-description');

    // Assert
    expect(noticeTitle).toHaveTextContent(expectedTitle);
    expect(noticeDescription).toHaveTextContent(expectedNotification);
  });

  test('should show notification for not_verified company and verified order', async () => {
    // Arrange
    const expectedTitle =
      'Эта страница будет вам доступна после того, как компания пройдет проверку.';
    const expectedNotification =
      'Заказ практически оформлен! Доступ к счетам по заказу вы получите после того, как администраторы нашего сервиса подтвердят вашу компанию.';
    const mockReservedOrders = mockOrders.map(order => ({
      ...order,
      reservationStatus: OrderReservationStatusEnum.Confirmed,
    }));

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ReservedOrders
            isCompanyVerified={false}
            orders={mockReservedOrders}
            refetchReservedOrders={jest.fn()}
          />,
        ),
      ),
    );
    const noticeTitle = screen.getByTestId('guest-order-notice-title');
    const noticeDescription = screen.getByTestId('guest-order-notice-description');

    // Assert
    expect(noticeTitle).toHaveTextContent(expectedTitle);
    expect(noticeDescription).toHaveTextContent(expectedNotification);
  });

  test('should call cancelReservedOrder', async () => {
    // Arrange
    const mockReservedOrders = mockOrders.map(order => ({
      ...order,
      reservationStatus: OrderReservationStatusEnum.PendingConfirmation,
    }));

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ReservedOrders
              isCompanyVerified={false}
              orders={mockReservedOrders}
              refetchReservedOrders={jest.fn()}
            />,
          ),
        ),
      ),
    );
    const cancelReservedOrderButton = screen.getByTestId('cancel-reserved-order-button');
    await user.click(cancelReservedOrderButton);

    const submitButton = screen.getByTestId('confirm-modal-button');
    await user.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockCancelReservedOrder).toHaveBeenCalled();
    });
  });

  test('should call confirmReservedOrder', async () => {
    // Arrange
    const mockReservedOrders = mockOrders.map(order => ({
      ...order,
      reservationStatus: OrderReservationStatusEnum.PendingConfirmation,
    }));

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ReservedOrders
              isCompanyVerified={false}
              orders={mockReservedOrders}
              refetchReservedOrders={jest.fn()}
            />,
          ),
        ),
      ),
    );
    const confirmReservedOrderButton = screen.getByTestId('confirm-reserved-order-button');
    await user.click(confirmReservedOrderButton);

    const submitButton = screen.getByTestId('confirm-modal-button');
    await user.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockConfirmReservedOrder).toHaveBeenCalled();
    });
  });

  test('should call createSupportRequest', async () => {
    // Arrange
    const expectedOrderId = mockOrders[0].id;
    const expectedMessage = 'help message';
    const expectedSubject = `Помощь в оформлении заказа №${expectedOrderId}`;
    const expectedValues = {
      subject: expectedSubject,
      message: expectedMessage,
      images: [],
      orderId: expectedOrderId,
    };
    const mockReservedOrders = mockOrders.map(order => ({
      ...order,
      reservationStatus: OrderReservationStatusEnum.PendingConfirmation,
    }));

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ReservedOrders
              isCompanyVerified={false}
              orders={mockReservedOrders}
              refetchReservedOrders={jest.fn()}
            />,
          ),
        ),
      ),
    );
    const requestSupportButton = screen.getByTestId('request-support-reserved-order-button');
    await user.click(requestSupportButton);

    const modalTitle = await screen.findByTestId('help-modal-title');

    expect(modalTitle).toBeInTheDocument();

    const messageField = screen.getByTestId('message');
    await user.type(messageField, expectedMessage);

    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockCreateSupportRequest).toHaveBeenCalledWith(expectedValues);
    });
  });
});
