import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { useSubmitProductDeliveryStep } from 'lib/apollo/hooks/actions/product';
import { useCities } from 'lib/apollo/hooks/state/cities';
import useNotifier from 'hooks/useNotifier';

import { mockProductDeliveryConditions, mockProductDelivery } from '__tests__/mocks/mockProduct';
import { mockCities } from '__tests__/mocks/mockCities';

import { PRICES } from 'config/constants/createProductSteps';

import CreateProductOwnDelivery from '.';

jest.mock('lib/apollo/hooks/actions/product');
jest.mock('lib/apollo/hooks/state/cities');
jest.mock('hooks/useNotifier');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateProductOwnDelivery', () => {
  const mockOnSubmitStep = jest.fn();

  const mockSetError = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setError: mockSetError,
    })),
  );

  const mockUseCities = jest.fn(() => ({ cities: mockCities }));
  useCities.mockImplementation(mockUseCities);

  const mockSubmitProductDeliveryStep = jest.fn(() => mockProductDelivery);
  const mockUseSubmitProductDeliveryStep = jest.fn(() => [mockSubmitProductDeliveryStep]);
  useSubmitProductDeliveryStep.mockImplementation(mockUseSubmitProductDeliveryStep);

  test('should call submitProductDelivery on submit', async () => {
    // Arrange
    const expectedMinCost = 100;
    const expectedFreeMinDays = 10;
    const expectedFreeMaxDays = 20;
    const expectedPrice = 200;
    const expectedMinWeight = 10;
    const expectedMaxWeight = 20;
    const expectedPaidMinDays = 10;
    const expectedPaidMaxDays = 20;
    const expectedDisablePickup = true;

    const expectedValue = {
      disablePickup: expectedDisablePickup,
      productId: '1',
      productFreeDeliveries: [{ cityId: '1', minCost: 100, minDays: 10, maxDays: 20 }],
      productPaidDeliveries: [
        { cityId: '2', maxWeight: 20, minWeight: 10, price: 200, minDays: 10, maxDays: 20 },
      ],
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateProductOwnDelivery
            product={mockProductDeliveryConditions}
            onSubmitStep={mockOnSubmitStep}
          />,
        ),
      ),
    );
    const minCostField = screen.getByTestId('productFreeDeliveries.0.minCost');
    const freeMinDaysField = screen.getByTestId('productFreeDeliveries.0.minDays');
    const freeMaxDaysField = screen.getByTestId('productFreeDeliveries.0.maxDays');
    const priceField = screen.getByTestId('productPaidDeliveries.0.price');
    const minWeightField = screen.getByTestId('productPaidDeliveries.0.minWeight');
    const maxWeightField = screen.getByTestId('productPaidDeliveries.0.maxWeight');
    const paidMinDaysField = screen.getByTestId('productPaidDeliveries.0.minDays');
    const paidMaxDaysField = screen.getByTestId('productPaidDeliveries.0.maxDays');
    const disablePickupField = screen.getByTestId('disablePickup');

    const submitButton = screen.getByTestId('create-product-own-delivery-submit-button');

    // Assert
    expect(submitButton).toBeDisabled();

    // Act
    fireEvent.click(disablePickupField);

    fireEvent.change(minCostField, { target: { value: expectedMinCost } });
    fireEvent.change(freeMinDaysField, { target: { value: expectedFreeMinDays } });
    fireEvent.change(freeMaxDaysField, { target: { value: expectedFreeMaxDays } });
    fireEvent.change(priceField, { target: { value: expectedPrice } });
    fireEvent.change(minWeightField, { target: { value: expectedMinWeight } });
    fireEvent.change(maxWeightField, { target: { value: expectedMaxWeight } });
    fireEvent.change(paidMinDaysField, { target: { value: expectedPaidMinDays } });
    fireEvent.change(paidMaxDaysField, { target: { value: expectedPaidMaxDays } });

    fireEvent.click(submitButton);

    // Assert
    expect(mockUseCities).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockSubmitProductDeliveryStep).toHaveBeenCalledWith(expectedValue);
      expect(mockOnSubmitStep).toHaveBeenCalledWith(PRICES);
    });
  });

  test('should show initail values', async () => {
    // Arrange
    const { productFreeDeliveries, productPaidDeliveries } = mockProductDelivery;
    const {
      minCost: expectedMinCost,
      minDays: expectedFreeMinDays,
      maxDays: expectedFreeMaxDays,
      city: { name: expectedFreeCityName },
    } = productFreeDeliveries[0];
    const {
      price: expectedPrice,
      minWeight: expectedMinWeight,
      maxWeight: expectedMaxWeight,
      minDays: expectedPaidMinDays,
      maxDays: expectedPaidMaxDays,
      city: { name: expectedPaidCityName },
    } = productPaidDeliveries[0];

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateProductOwnDelivery
            product={mockProductDelivery}
            onSubmitStep={mockOnSubmitStep}
          />,
        ),
      ),
    );
    const freeMinCostField = screen.getByTestId('productFreeDeliveries.0.minCost');
    const freeMinDaysField = screen.getByTestId('productFreeDeliveries.0.minDays');
    const freeMaxDaysField = screen.getByTestId('productFreeDeliveries.0.maxDays');

    const paidPriceField = screen.getByTestId('productPaidDeliveries.0.price');
    const paidMinWeightField = screen.getByTestId('productPaidDeliveries.0.minWeight');
    const paidMaxWeightField = screen.getByTestId('productPaidDeliveries.0.maxWeight');
    const paidMinDaysField = screen.getByTestId('productPaidDeliveries.0.minDays');
    const paidMaxDaysField = screen.getByTestId('productPaidDeliveries.0.maxDays');

    // Assert
    expect(freeMinCostField.value).toEqual(expectedMinCost.toString());
    expect(freeMinDaysField.value).toEqual(expectedFreeMinDays.toString());
    expect(freeMaxDaysField.value).toEqual(expectedFreeMaxDays.toString());

    const freeCityField = screen.getByDisplayValue(expectedFreeCityName);
    expect(freeCityField).toBeInTheDocument();

    expect(paidPriceField.value).toEqual(expectedPrice.toString());
    expect(paidMinWeightField.value).toEqual(expectedMinWeight.toString());
    expect(paidMaxWeightField.value).toEqual(expectedMaxWeight.toString());
    expect(paidMinDaysField.value).toEqual(expectedPaidMinDays.toString());
    expect(paidMaxDaysField.value).toEqual(expectedPaidMaxDays.toString());

    const paidCityField = screen.getByDisplayValue(expectedPaidCityName);
    expect(paidCityField).toBeInTheDocument();
  });

  test('should add and remove delivery cities', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <CreateProductOwnDelivery
              product={mockProductDeliveryConditions}
              onSubmitStep={mockOnSubmitStep}
            />,
          ),
        ),
      ),
    );

    // Act
    const addFreeDeliveryButton = screen.getByTestId('add-free-delivery-button');
    fireEvent.click(addFreeDeliveryButton);
    const addPaidDeliveryButton = screen.getByTestId('add-paid-delivery-button');
    fireEvent.click(addPaidDeliveryButton);

    // Assert
    expect(screen.getByTestId('productFreeDeliveries.1.cityId')).toBeInTheDocument();
    expect(screen.getByTestId('productPaidDeliveries.1.cityId')).toBeInTheDocument();

    // Act
    const removeFreeDeliveryButton = screen.getByTestId('remove-free-delivery-button-1');
    fireEvent.click(removeFreeDeliveryButton);
    fireEvent.click(screen.getByTestId('confirm-modal-button'));

    // Assert
    await waitFor(() =>
      expect(screen.queryByTestId('productFreeDeliveries.1.cityId')).not.toBeInTheDocument(),
    );

    // Act
    const removePaidDeliveryButton = screen.getByTestId('remove-paid-delivery-button-1');
    fireEvent.click(removePaidDeliveryButton);
    fireEvent.click(screen.getByTestId('confirm-modal-button'));

    // Assert
    await waitFor(() =>
      expect(screen.queryByTestId('productPaidDeliveries.1.cityId')).not.toBeInTheDocument(),
    );
  });

  test('should hide deliveries if not set delivery', async () => {
    // Arrange

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateProductOwnDelivery
            product={mockProductDeliveryConditions}
            onSubmitStep={mockOnSubmitStep}
          />,
        ),
      ),
    );
    const freeDeliveryRadio = screen.getByTestId('freeRadio_false');
    fireEvent.click(freeDeliveryRadio);
    const paidDeliveryRadio = screen.getByTestId('paidRadio_false');
    fireEvent.click(paidDeliveryRadio);

    const addFreeDeliveryButton = screen.queryByTestId('add-free-delivery-button');
    const addPaidDeliveryButton = screen.queryByTestId('add-paid-delivery-button');
    const submitButton = screen.getByTestId('create-product-own-delivery-submit-button');

    // Assert
    expect(addFreeDeliveryButton).not.toBeInTheDocument();
    expect(addPaidDeliveryButton).not.toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });
});
