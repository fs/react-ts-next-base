import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import useCurrentUser from 'hooks/useCurrentUser';
import { useAddProductToCart, useAddProductToGuestCart } from 'lib/apollo/hooks/actions/order';
import { useCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';
import { useUserDeliveryMethods } from 'lib/apollo/hooks/state/deliveryMethods';
import useNotifier from 'hooks/useNotifier';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';
import useRouter from 'hooks/useRouter';

import { DeliveryMethodEnum, DeliveryServiceEnum } from 'graphql/types';
import { mockOrder } from '__tests__/mocks/mockOrders';
import { mockProducts } from '__tests__/mocks/mockProducts';
import mockCurrentUser, {
  mockUseCurrentWithoutGuestOrdersData,
} from '__tests__/mocks/mockCurrentUser';
import mockCompany from '__tests__/mocks/mockCompany';
import { mockLocations } from '__tests__/mocks/mockLocations';
import mockDeliveryMethods from '__tests__/mocks/mockDeliveryMethods';

import { CART } from 'config/routes';

import { deliveryMethods, deliveryServices } from 'config/constants/delivery';

import ProductCardForm from '.';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/actions/order');
jest.mock('hooks/useNotifier');
jest.mock('lib/apollo/hooks/state/companyLocations');
jest.mock('lib/apollo/hooks/state/deliveryMethods');
jest.mock('lib/apollo/hooks/state/clientSideState');
jest.mock('hooks/useRouter');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('ProductCardForm', () => {
  const mockUser = {
    ...mockCurrentUser,
    mainCompany: { ...mockCompany, direction: 'BUYER' },
  };
  const mockProduct = {
    ...mockProducts[0],
    company: { ...mockCompany, myRole: null },
    variants: [
      {
        ...mockProducts[0].variants[0],
        id: 336,
        variantProperties: [
          {
            __typename: 'DictionaryVariantProperty',
            id: '331',
            property: {
              id: '19',
              name: 'Количество слоев',
              displayName: 'Количество слоев',
              __typename: 'DictionaryProperty',
            },
            dictionaryPropertyOption: {
              id: '118',
              name: '2-слойная',
            },
          },
          {
            __typename: 'IntegerVariantProperty',
            id: '126',
            property: {
              id: '4',
              name: 'Ширина',
              displayName: 'Количество слоев',
              __typename: 'IntegerProperty',
            },
            integerValue: 33,
          },
        ],
      },
      {
        ...mockProducts[0].variants[0],
        id: 337,
        variantProperties: [
          {
            __typename: 'DictionaryVariantProperty',
            id: '332',
            property: {
              id: '19',
              name: 'Количество слоев',
              displayName: 'Количество слоев',
              __typename: 'DictionaryProperty',
            },
            dictionaryPropertyOption: {
              id: '119',
              name: '3-слойная',
            },
          },
          {
            __typename: 'IntegerVariantProperty',
            id: '127',
            property: {
              id: '4',
              name: 'Ширина',
              displayName: 'Количество слоев',
              __typename: 'IntegerProperty',
            },
            integerValue: 45,
          },
        ],
      },
    ],
  };

  const mockPushRoute = jest.fn();
  const mockUseRouter = jest.fn(() => ({
    pushRoute: mockPushRoute,
  }));
  useRouter.mockImplementation(mockUseRouter);

  const mockUseCurrentUser = jest.fn(() => ({
    user: mockUser,
    isRegisteredUser: true,
  }));
  useCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockAddProductToCart = jest.fn(() => mockOrder);
  const mockUseAddProductToCart = jest.fn(() => [mockAddProductToCart]);
  useAddProductToCart.mockImplementation(mockUseAddProductToCart);

  const mockAddProductToGuestCart = jest.fn(() => mockOrder);
  const mockUseAddProductToGuestCart = jest.fn(() => [mockAddProductToGuestCart]);
  useAddProductToGuestCart.mockImplementation(mockUseAddProductToGuestCart);

  const mockUseCompanyLocations = jest.fn(() => ({ locations: mockLocations }));
  useCompanyLocations.mockImplementation(mockUseCompanyLocations);

  const mockUseDeliveryMethods = jest.fn(() => ({ userDeliveryMethods: mockDeliveryMethods }));
  useUserDeliveryMethods.mockImplementation(mockUseDeliveryMethods);

  const mockSetSuccess = jest.fn();
  const mockSetError = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setSuccess: mockSetSuccess,
      setError: mockSetError,
    })),
  );

  useCity.mockImplementation(
    jest.fn(() => ({
      city: { id: '1', name: 'Казань' },
    })),
  );

  test('should call addProductToCart on submit', async () => {
    // Arrange
    const expectedDetailedMessage = `Товар “${mockOrder.product.name}” добавлен в корзину`;
    const {
      company: { id: sellerId },
    } = mockProduct;
    const expectedQuantity = '101';
    const expectedValues = {
      companyLocationId: mockLocations[1].id,
      deliveryMethod: deliveryMethods.COURIER,
      deliveryPointId: null,
      deliveryService: deliveryServices.SELLER,
      pickupDate: null,
      quantity: Number(expectedQuantity),
      variantId: mockProduct.variants[1].id,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardForm product={mockProduct} onSelectProperty={jest.fn()} />,
          ),
        ),
      ),
    );
    const quantityInput = screen.getByTestId('quantity');
    await user.click(screen.getByTestId('property-0-0'));
    await user.click(screen.getByTestId('property-1-0'));

    // expect
    expect(quantityInput).toBeDisabled();

    await user.click(screen.getByTestId('property-0-1'));
    await user.click(screen.getByTestId('property-1-1'));

    await user.clear(quantityInput);
    await user.type(quantityInput, expectedQuantity);

    await user.click(screen.getByTestId('select-delivery-address-modal'));
    await user.click(screen.getByTestId('delivery-address-item-1'));
    await user.click(screen.getByTestId('change-delivery-address-submit-button'));

    await user.click(screen.getByTestId('select-delivery-service-modal'));
    await user.click(screen.getByTestId('deliveryMethod_COURIER'));
    await user.click(screen.getByTestId('service_SELLER'));
    const buttonServiceSubmit = screen.getByTestId('change-delivery-service-submit-button');
    await user.click(buttonServiceSubmit);

    await waitForElementToBeRemoved(buttonServiceSubmit);

    await user.click(screen.getByTestId('product-card-submit-button'));

    // assert
    await waitFor(() => {
      expect(mockAddProductToCart).toHaveBeenCalledWith(expectedValues);
      expect(mockSetSuccess).toHaveBeenCalledWith(expectedDetailedMessage);
    });

    await user.click(screen.getByTestId('product-card-buy-now-submit-button'));

    // Assert
    expect(mockUseCompanyLocations).toHaveBeenCalled();
    expect(mockUseDeliveryMethods).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockAddProductToCart).toHaveBeenLastCalledWith(expectedValues);
      expect(mockPushRoute).toHaveBeenCalledWith({ pathname: CART, query: { sellerId } });
    });
  });

  test('should decrease and increase quantity click', async () => {
    // Arrange
    const initialQuantity = 100;
    const expectedIncreasedPrice = '808 000 руб';
    const expectedDecreasedPrice = '800 000 руб';
    const expectedIncreasedFinalPrice = '707 000 руб';
    const expectedDecreasedFinalPrice = '700 000 руб';

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductCardForm product={mockProduct} onSelectProperty={jest.fn()} />,
        ),
      ),
    );
    const quantityInput = screen.getByTestId('quantity');
    const discountPrice = screen.getByTestId('discount-price');
    const finalPrice = screen.getByTestId('final-price');
    const buttonIncrease = screen.getByTestId('quantity-increment-button');
    const buttonDecrease = screen.getByTestId('quantity-decrement-button');

    await user.click(buttonIncrease);
    // Assert
    expect(quantityInput).toHaveValue(String(initialQuantity + 1));
    expect(discountPrice).toHaveTextContent(expectedIncreasedPrice);
    expect(finalPrice).toHaveTextContent(expectedIncreasedFinalPrice);

    await user.click(buttonDecrease);
    // Assert
    expect(quantityInput).toHaveValue(String(initialQuantity));
    expect(discountPrice).toHaveTextContent(expectedDecreasedPrice);
    expect(finalPrice).toHaveTextContent(expectedDecreasedFinalPrice);
  });

  test('should call useAddProductToGuestCart on submit', async () => {
    // Arrange
    const expectedDetailedMessage = `Товар “${mockOrder.product.name}” добавлен в корзину`;

    const expectedQuantity = '101';
    const mockUseCurrentUserGuest = jest.fn(() => mockUseCurrentWithoutGuestOrdersData);
    useCurrentUser.mockImplementation(mockUseCurrentUserGuest);
    const expectedValues = {
      cityId: '1',
      deliveryMethod: DeliveryMethodEnum.Courier,
      deliveryService: DeliveryServiceEnum.Seller,
      deliveryPointId: null,
      pickupDate: null,
      quantity: Number.parseInt(expectedQuantity, 10),
      variantId: mockProduct.variants[0].id,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardForm product={mockProduct} onSelectProperty={jest.fn()} />,
          ),
        ),
      ),
    );
    const quantityInput = screen.getByTestId('quantity');

    await user.clear(quantityInput);
    await user.type(quantityInput, expectedQuantity);

    await user.click(screen.getByTestId('product-card-submit-button'));

    // assert
    await waitFor(() => {
      expect(mockAddProductToGuestCart).toHaveBeenCalledWith(expectedValues);
      expect(mockSetSuccess).toHaveBeenCalledWith(expectedDetailedMessage);
    });
  });
});
