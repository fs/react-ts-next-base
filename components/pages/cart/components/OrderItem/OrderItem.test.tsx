import React from 'react';
import useRouter from 'hooks/useRouter';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import {
  useReserveOrder,
  useDestroyOrder,
  usePlaceOrder,
  useAddProductToCart,
  useUpdateOrderDelivery,
  useUpdateOrderQuantity,
} from 'lib/apollo/hooks/actions/order';
import { useSendSmsCode, useSignUpFromCart } from 'lib/apollo/hooks/actions/auth';
import { useUserDeliveryMethods } from 'lib/apollo/hooks/state/deliveryMethods';

import useNotifier from 'hooks/useNotifier';
import useCurrentUser from 'hooks/useCurrentUser';

import { mockOrder } from '__tests__/mocks/mockOrders';
import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import mockDeliveryMethods from '__tests__/mocks/mockDeliveryMethods';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import { deliveryMethods, deliveryServices } from 'config/constants/delivery';

import OrderItem from './OrderItem';

jest.mock('hooks/useRouter');
jest.mock('hooks/useNotifier');
jest.mock('hooks/useCurrentUser');
jest.mock('helpers/yandexMetrikaGoal');
jest.mock('lib/apollo/hooks/actions/auth');
jest.mock('lib/apollo/hooks/actions/order');
jest.mock('lib/apollo/hooks/state/deliveryMethods');

beforeAll(() => {
  // @ts-ignore
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('OrderItem', () => {
  const mockCompanyName = 'test company';

  const mockedUseNotifier = useNotifier as jest.Mock;
  const mockSetError = jest.fn();
  mockedUseNotifier.mockImplementation(
    jest.fn(() => ({ setSuccess: jest.fn(), setError: mockSetError })),
  );

  const mockedUsePlaceOrder = usePlaceOrder as jest.Mock;
  const mockPlaceOrder = jest.fn(() => mockOrder);
  const mockUsePlaceOrder = jest.fn(() => [mockPlaceOrder]);
  mockedUsePlaceOrder.mockImplementation(mockUsePlaceOrder);

  const mockedUseAddProductToCart = useAddProductToCart as jest.Mock;
  const mockAddProductToCart = jest.fn(() => mockOrder);
  const mockUseAddProductToCart = jest.fn(() => [mockAddProductToCart]);
  mockedUseAddProductToCart.mockImplementation(mockUseAddProductToCart);

  const mockedUseDestroyOrder = useDestroyOrder as jest.Mock;
  const mockDestroyOrder = jest.fn();
  const mockUseDestroyOrder = jest.fn(() => [mockDestroyOrder]);
  mockedUseDestroyOrder.mockImplementation(mockUseDestroyOrder);

  const mockedUseUpdateOrderDelivery = useUpdateOrderDelivery as jest.Mock;
  const mockUpdateOrderDelivery = jest.fn();
  const mockUseUpdateOrderDelivery = jest.fn(() => [mockUpdateOrderDelivery]);
  mockedUseUpdateOrderDelivery.mockImplementation(mockUseUpdateOrderDelivery);

  const mockedUseUpdateOrderQuantity = useUpdateOrderQuantity as jest.Mock;
  const mockUpdateOrderQuantity = jest.fn();
  const mockUseUpdateOrderQuantity = jest.fn(() => [mockUpdateOrderQuantity]);
  mockedUseUpdateOrderQuantity.mockImplementation(mockUseUpdateOrderQuantity);

  const mockedUseSignUpFromCart = useSignUpFromCart as jest.Mock;
  const mockSignUpFromCart = jest.fn();
  const mockUseSignUpFromCart = jest.fn(() => [mockSignUpFromCart]);
  mockedUseSignUpFromCart.mockImplementation(mockUseSignUpFromCart);

  const mockedUseSendSmsCode = useSendSmsCode as jest.Mock;
  const mockSendSmsCode = jest.fn();
  const mockUseSendSmsCode = jest.fn(() => [mockSendSmsCode]);
  mockedUseSendSmsCode.mockImplementation(mockUseSendSmsCode);

  const mockedUseReserveOrder = useReserveOrder as jest.Mock;
  const mockReserveOrder = jest.fn();
  const mockUseReserveOrder = jest.fn(() => [mockReserveOrder]);
  mockedUseReserveOrder.mockImplementation(mockUseReserveOrder);

  const mockedUseCurrentUser = useCurrentUser as jest.Mock;
  const mockUseCurrentUser = jest.fn(() => ({
    user: mockCurrentUser,
    isRegisteredUser: true,
  }));
  mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUseRouter = jest.fn(() => mockUseRouterData);
  mockedUseRouter.mockImplementation(mockUseRouter);

  test('should call usePlaceOrder on submit for authorized user', async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<OrderItem order={mockOrder} companyBuyerName={mockCompanyName} />),
        ),
      ),
    );
    const submitButton = screen.getByTestId('order-item-submit-button');
    await user.click(submitButton);

    const confirmationSubmitButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmationSubmitButton);

    // Assert
    expect(submitButton).toHaveTextContent('Оформить заказ');
    await waitFor(() => {
      expect(mockPlaceOrder).toHaveBeenCalled();
    });
  });

  test('should call useDestroyOrder on destroy order', async () => {
    // Arrange
    const user = userEvent.setup();
    const { id: mockOrderId } = mockOrder;
    const mockRefetchAfterDestroy = jest.fn(() => Promise.resolve());
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <OrderItem
              order={mockOrder}
              companyBuyerName={mockCompanyName}
              refetchAfterDestroy={mockRefetchAfterDestroy}
            />,
          ),
        ),
      ),
    );
    const destroyButton = screen.getByTestId(`delete-order-${mockOrderId}`);
    await user.click(destroyButton);

    const deleteSubmitButton = screen.getByTestId('confirm-modal-button');
    await user.click(deleteSubmitButton);

    // Assert
    await waitFor(() => {
      expect(mockDestroyOrder).toHaveBeenCalled();
      expect(mockRefetchAfterDestroy).toHaveBeenCalled();
    });
  });

  test('should call useUpdateOrderDelivery onchange delivery service order', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockedUseUserDeliveryMethods = useUserDeliveryMethods as jest.Mock;
    const mockUseUserDeliveryMethods = jest.fn(() => ({
      userDeliveryMethods: mockDeliveryMethods,
    }));
    mockedUseUserDeliveryMethods.mockImplementation(mockUseUserDeliveryMethods);

    const {
      companyLocation: { id: companyLocationId },
    } = mockOrder;

    const expectedValues = {
      companyLocationId,
      deliveryMethod: deliveryMethods.COURIER,
      deliveryPointId: null,
      deliveryService: deliveryServices.SELLER,
      pickupDate: null,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<OrderItem order={mockOrder} companyBuyerName={mockCompanyName} />),
        ),
      ),
    );
    const selectDeliveryServiceButton = screen.getByTestId('select-delivery-service-modal');
    await user.click(selectDeliveryServiceButton);

    await user.click(screen.getByTestId('select-delivery-service-modal'));
    await user.click(screen.getByTestId('deliveryMethod_COURIER'));
    await user.click(screen.getByTestId('service_SELLER'));

    const buttonServiceSubmit = screen.getByTestId('change-delivery-service-submit-button');
    await user.click(buttonServiceSubmit);

    // Assert
    expect(mockUseUserDeliveryMethods).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockUpdateOrderDelivery).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should call useUpdateOrderQuantity on change quantity of product', async () => {
    // Arrange
    const user = userEvent.setup();
    const expectedValues = {
      quantity: 101,
      orderId: mockOrder?.id,
    };
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<OrderItem order={mockOrder} companyBuyerName={mockCompanyName} />),
        ),
      ),
    );
    const changePriceButton = screen.getByTestId('summaryCount-increment-button');
    user.click(changePriceButton);

    // Assert
    await waitFor(() => {
      expect(mockUpdateOrderQuantity).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should call useSignUpFromCart on submit for guest', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockUseCurrentUserForGust = jest.fn(() => ({
      user: mockCurrentUser,
      isRegisteredUser: false,
    }));
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUserForGust);
    const phoneNumber = '1234567898';
    const expectedValues = {
      email: 'test@test.test',
      password: '123456Password',
      firstName: 'test',
      lastName: 'test',
      middleName: 'test',
      phoneNumber: `+7${phoneNumber}`,
      smsCode: '1234',
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<OrderItem order={mockOrder} companyBuyerName={mockCompanyName} />),
        ),
      ),
    );
    const signUpFromCartButton = screen.getByTestId('order-item-submit-button');
    await user.click(signUpFromCartButton);

    const lastNameInput = await screen.findByTestId('lastName');
    await user.type(lastNameInput, expectedValues.lastName);

    const firstNameInput = screen.getByTestId('firstName');
    await user.type(firstNameInput, expectedValues.firstName);

    const middleNameInput = screen.getByTestId('middleName');
    await user.type(middleNameInput, expectedValues.middleName);

    const emailInput = screen.getByTestId('email');
    await user.type(emailInput, expectedValues.email);

    const phoneNumberInput = screen.getByTestId('phoneNumber');
    await user.type(phoneNumberInput, phoneNumber);

    const phoneVerificationButton = screen.getByTestId('phoneVerification');
    await user.click(phoneVerificationButton);

    const codeInput = await screen.findByTestId('codeInput');
    await user.type(codeInput, expectedValues.smsCode);

    const passwordInput = screen.getByTestId('password');
    await user.type(passwordInput, expectedValues.password);

    const agreementCheckBox = screen.getByTestId('agreement');
    await user.click(agreementCheckBox);

    const submitFormButton = screen.getByTestId('submit-button');
    await user.click(submitFormButton);

    // Assert
    expect(signUpFromCartButton).toHaveTextContent('Присоединиться');
    await waitFor(() => {
      expect(mockSignUpFromCart).toHaveBeenCalled();
    });
  });
  test('should call useReserveOrder on submit for authorized user without company', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockUseCurrentUserWithoutCompanies = jest.fn(() => ({
      user: mockCurrentUser,
      isRegisteredUser: true,
      isGuest: true,
    }));
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUserWithoutCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<OrderItem order={mockOrder} companyBuyerName={mockCompanyName} />),
        ),
      ),
    );
    const submitButton = screen.getByTestId('order-item-submit-button');
    await user.click(submitButton);

    const confirmationSubmitButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmationSubmitButton);

    // Assert
    expect(submitButton).toHaveTextContent('Продолжить');
    await waitFor(() => {
      expect(mockReserveOrder).toHaveBeenCalled();
    });
  });
});
