import React from 'react';
import { useFormikContext } from 'formik';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import mockCompany from '__tests__/mocks/mockCompany';
import { mockVariants } from '__tests__/mocks/mockVariants';
import { mockProduct } from '__tests__/mocks/mockProducts';
import mockCurrentUser, {
  mockUseCurrentUserGuestData,
  mockUseCurrentWithGuestOrdersData,
  mockUseCurrentWithReservedGuestOrdersData,
} from '__tests__/mocks/mockCurrentUser';

import { BUYER, SELLER } from 'config/constants/directions';
import { NOT_VERIFIED, VERIFIED } from 'config/constants/status';

import useCurrentUser from 'hooks/useCurrentUser';
import ProductCardActions from '.';

jest.mock('formik');
jest.mock('hooks/useCurrentUser');

describe('ProductCardActions', () => {
  const mockFormikContext = jest.fn(() => ({
    isSubmitting: false,
    setFieldValue: jest.fn(),
    values: {},
  }));
  useFormikContext.mockImplementation(mockFormikContext);

  test('should show warning for not-verified buyer', async () => {
    // Arrange
    const expectedWarning =
      'Ваша основная компания находится на проверке, поэтому вы не можете купить товар.';
    const mockProductItem = { ...mockProduct, company: { ...mockCompany, myRole: null } };
    const mockUser = jest.fn(() => ({
      user: {
        ...mockCurrentUser,
        mainCompany: { ...mockCompany, direction: BUYER, status: NOT_VERIFIED },
      },
    }));

    useCurrentUser.mockImplementation(mockUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductCardActions product={mockProductItem} remainingVariants={mockVariants} />,
        ),
      ),
    );
    const warningNotVerified = screen.getByTestId('warning-user-not-verified-buyer');

    // Assert
    expect(warningNotVerified).toBeInTheDocument();
    expect(warningNotVerified).toHaveTextContent(expectedWarning);
  });

  test('should show action buttons for verified buyer', async () => {
    // Arrange
    const mockProductItem = { ...mockProduct, company: { ...mockCompany, myRole: null } };
    const mockUser = jest.fn(() => ({
      user: {
        ...mockCurrentUser,
        mainCompany: { ...mockCompany, direction: BUYER, status: VERIFIED },
      },
    }));

    useCurrentUser.mockImplementation(mockUser);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductCardActions product={mockProductItem} remainingVariants={mockVariants} />,
        ),
      ),
    );
    const buttonBuyNow = screen.getByTestId('product-card-buy-now-submit-button');
    const buttonAddToCart = screen.getByTestId('product-card-submit-button');

    // Assert
    expect(buttonBuyNow).toBeInTheDocument();
    expect(buttonAddToCart).toBeInTheDocument();
  });

  test('should show warning for guest with guest orders', async () => {
    // Arrange
    const expectedWarning =
      'В вашей корзине уже есть товар. Авторизуйтесь и создайте компанию, чтобы покупать неограниченное количество товаров.';
    const mockProductItem = { ...mockProduct, company: { ...mockCompany, myRole: null } };
    const mockUser = jest.fn(() => mockUseCurrentUserGuestData);

    useCurrentUser.mockImplementation(mockUser);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductCardActions product={mockProductItem} remainingVariants={mockVariants} />,
        ),
      ),
    );
    const warningGuestWithGuestOrders = screen.getByTestId('warning-guest-has-guest-orders');

    // Assert
    expect(warningGuestWithGuestOrders).toBeInTheDocument();
    expect(warningGuestWithGuestOrders).toHaveTextContent(expectedWarning);
  });

  test('should show warning for client with reserved guest orders without buyer company', async () => {
    // Arrange
    const expectedWarning = 'Создайте компанию “Покупателя“, чтобы покупать больше товаров';
    const mockProductItem = { ...mockProduct, company: { ...mockCompany, myRole: null } };
    const mockUser = jest.fn(() => mockUseCurrentWithReservedGuestOrdersData);

    useCurrentUser.mockImplementation(mockUser);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductCardActions product={mockProductItem} remainingVariants={mockVariants} />,
        ),
      ),
    );
    const warningGuestWithGuestOrders = screen.getByTestId(
      'warning-client-has-reserved-guest-orders',
    );

    // Assert
    expect(warningGuestWithGuestOrders).toBeInTheDocument();
    expect(warningGuestWithGuestOrders).toHaveTextContent(expectedWarning);
  });

  test('should show warning for client with guest orders without buyer company', async () => {
    // Arrange
    const expectedWarning =
      'Создайте компанию “Покупателя“, чтобы добавлять в корзину больше 1 товара и совершать покупки';
    const mockProductItem = { ...mockProduct, company: { ...mockCompany, myRole: null } };
    const mockUser = jest.fn(() => mockUseCurrentWithGuestOrdersData);

    useCurrentUser.mockImplementation(mockUser);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductCardActions product={mockProductItem} remainingVariants={mockVariants} />,
        ),
      ),
    );
    const warningGuestWithGuestOrders = screen.getByTestId('warning-client-has-guest-orders');

    // Assert
    expect(warningGuestWithGuestOrders).toBeInTheDocument();
    expect(warningGuestWithGuestOrders).toHaveTextContent(expectedWarning);
  });

  test('should show restoreButton for deleted product', async () => {
    // Arrange
    const mockProductItem = { ...mockProduct, deleted: true };
    const mockUser = jest.fn(() => ({
      user: mockCurrentUser,
      isRegisteredUser: true,
    }));

    useCurrentUser.mockImplementation(mockUser);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductCardActions product={mockProductItem} remainingVariants={mockVariants} />,
        ),
      ),
    );
    const restoreButton = screen.getByTestId('restore-product-button');

    // Assert
    expect(restoreButton).toBeInTheDocument();
    expect(restoreButton).toHaveTextContent('Восстановить');
  });

  test('should show removeProduct and useTemplate buttons for template', async () => {
    // Arrange
    const mockProductItem = { ...mockProduct, template: true };
    const mockUser = jest.fn(() => ({
      user: mockCurrentUser,
      isRegisteredUser: true,
    }));

    useCurrentUser.mockImplementation(mockUser);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductCardActions product={mockProductItem} remainingVariants={mockVariants} />,
        ),
      ),
    );
    const removeButton = screen.getByTestId('remove-product-button');
    const useTemplateButton = screen.getByTestId('use-template-button');

    // Assert
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveTextContent('');
    expect(useTemplateButton).toBeInTheDocument();
    expect(useTemplateButton).toHaveTextContent('Использовать');
  });

  test('should show warning for seller', async () => {
    // Arrange
    const expectedWarning =
      'Вы смотрите товар в режиме “Продавец”.Перейдите в компанию “Покупатель” или зарегистрируйте компанию “Покупатель” чтобы купить товар.';
    const mockProductItem = { ...mockProduct, company: { ...mockCompany, myRole: null } };
    const mockUser = jest.fn(() => ({
      user: {
        ...mockCurrentUser,
        mainCompany: { ...mockCompany, direction: SELLER, status: VERIFIED },
      },
      isRegisteredUser: true,
    }));

    useCurrentUser.mockImplementation(mockUser);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductCardActions product={mockProductItem} remainingVariants={mockVariants} />,
        ),
      ),
    );
    const warningUserSeller = screen.getByTestId('warning-user-seller');

    // Assert
    expect(warningUserSeller).toBeInTheDocument();
    expect(warningUserSeller).toHaveTextContent(expectedWarning);
  });

  test('should show warning for product-owner buyer', async () => {
    // Arrange
    const expectedWarning =
      'Этот товар принадлежит вашей компании, поэтому вы не можете его купить.';
    const mockProductItem = {
      ...mockProduct,
      company: { ...mockCompany, myRole: { id: '1', name: 'owner' } },
    };
    const mockUser = jest.fn(() => ({
      user: {
        ...mockCurrentUser,
        mainCompany: { ...mockCompany, direction: BUYER, status: VERIFIED },
      },
      isRegisteredUser: true,
    }));

    useCurrentUser.mockImplementation(mockUser);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductCardActions product={mockProductItem} remainingVariants={mockVariants} />,
        ),
      ),
    );
    const warningUserProductOwner = screen.getByTestId('warning-product-owner');

    // Assert
    expect(warningUserProductOwner).toBeInTheDocument();
    expect(warningUserProductOwner).toHaveTextContent(expectedWarning);
  });
});
