import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import {
  useSubmitProductDiscountsStep,
  useCreateProductTemplate,
} from 'lib/apollo/hooks/actions/product';
import useNotifier from 'hooks/useNotifier';
import useRouter from 'hooks/useRouter';

import { mockProductPrices, mockProductDiscounts } from '__tests__/mocks/mockProduct';

import { DASHBOARD_COMPANY_PRODUCTS } from 'config/routes';
import { SUM } from 'config/constants/discount';

import CreateProductDiscounts from '.';
import { productTypes } from '../../constants';

jest.mock('lib/apollo/hooks/actions/product');
jest.mock('hooks/useNotifier');
jest.mock('hooks/useRouter');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateProductDiscount', () => {
  const {
    id: expectedProductId,
    company: { id: expectedCompanyId },
    periodDiscounts: mockPeriodDiscounts,
    weeklyDiscounts: mockWeeklyDiscounts,
    variants: mockVariants,
  } = mockProductDiscounts;

  const mockQuery = { companyId: expectedCompanyId, productId: expectedProductId };

  const mockPushRoute = jest.fn();
  const mockUseRouter = jest.fn(() => ({
    pushRoute: mockPushRoute,
  }));
  useRouter.mockImplementation(mockUseRouter);

  const mockCreateProductTemplate = jest.fn(() => mockProductDiscounts);
  const mockUseCreateProductTemplate = jest.fn(() => [mockCreateProductTemplate]);
  useCreateProductTemplate.mockImplementation(mockUseCreateProductTemplate);

  const mockSubmitProductDiscountsStep = jest.fn(() => mockProductDiscounts);
  const mockUseSubmitProductDiscountsStep = jest.fn(() => [mockSubmitProductDiscountsStep]);
  useSubmitProductDiscountsStep.mockImplementation(mockUseSubmitProductDiscountsStep);

  const mockSetSuccess = jest.fn();
  const mockSetError = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setSuccess: mockSetSuccess,
      setError: mockSetError,
    })),
  );

  describe('should call submitProductDiscountsStep on submit', () => {
    test('with single discounts', async () => {
      // Arrange
      const { amount: weeklyAmount, weekday } = mockWeeklyDiscounts[0];
      const { amount: periodAmount, startDate, endDate } = mockPeriodDiscounts[0];

      const expectedValues = {
        discountMethod: SUM,
        discountsForVariant: false,
        periodDiscounts: [{ amount: periodAmount, startDate, endDate }],
        productId: expectedProductId,
        variants: [],
        weeklyDiscounts: [{ amount: weeklyAmount, weekday }],
      };

      // Act
      render(
        renderWithTheme(
          renderWithApolloClient(
            <CreateProductDiscounts product={mockProductPrices} query={mockQuery} />,
          ),
        ),
      );
      fireEvent.click(screen.getByTestId('radio_singleDiscount'));

      const weeklyDiscountsAmount = screen.getByTestId('weeklyDiscounts.0.amount');
      const periodDiscountsAmount = screen.getByTestId('periodDiscounts.0.amount');

      fireEvent.change(weeklyDiscountsAmount, { target: { value: weeklyAmount } });
      await selectEvent.select(screen.getByText('День недели'), 'Четверг');
      fireEvent.change(periodDiscountsAmount, { target: { value: periodAmount } });

      const submitButton = screen.getByTestId('create-product-discounts-submit-button');
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(mockSubmitProductDiscountsStep).toHaveBeenCalledWith(expectedValues);
        expect(mockPushRoute).toHaveBeenCalledWith({
          pathname: DASHBOARD_COMPANY_PRODUCTS,
          query: {
            companyId: expectedCompanyId,
            productId: expectedProductId,
            type: productTypes.ACTIVE,
          },
        });
      });
    });

    test('with variants discounts', async () => {
      // Arrange
      const { id: variantId } = mockVariants[0];
      const { amount: weeklyAmount, weekday } = mockVariants[0].weeklyDiscounts[0];
      const { amount: periodAmount, startDate, endDate } = mockVariants[0].periodDiscounts[0];

      const expectedValues = {
        discountMethod: SUM,
        discountsForVariant: true,
        periodDiscounts: [],
        productId: expectedProductId,
        variants: [
          {
            id: variantId,
            periodDiscounts: [{ amount: periodAmount, startDate, endDate }],
            weeklyDiscounts: [{ amount: weeklyAmount, weekday }],
          },
        ],
        weeklyDiscounts: [],
      };

      // Act
      render(
        renderWithTheme(
          renderWithApolloClient(
            <CreateProductDiscounts product={mockProductPrices} query={mockQuery} />,
          ),
        ),
      );

      const weeklyDiscountsAmount = screen.getByTestId('variants_weeklyDiscounts.0.amount');
      const periodDiscountsAmount = screen.getByTestId('variants_periodDiscounts.0.amount');

      fireEvent.change(weeklyDiscountsAmount, { target: { value: weeklyAmount } });

      fireEvent.change(periodDiscountsAmount, { target: { value: periodAmount } });

      const submitButton = screen.getByTestId('create-product-discounts-submit-button');
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(mockSubmitProductDiscountsStep).toHaveBeenCalledWith(expectedValues);
        expect(mockPushRoute).toHaveBeenCalledWith({
          pathname: DASHBOARD_COMPANY_PRODUCTS,
          query: {
            companyId: expectedCompanyId,
            productId: expectedProductId,
            type: productTypes.ACTIVE,
          },
        });
      });
    });

    test('without discounts', async () => {
      // Arrange
      const expectedValues = {
        discountMethod: SUM,
        discountsForVariant: false,
        periodDiscounts: [],
        productId: expectedProductId,
        variants: [],
        weeklyDiscounts: [],
      };

      // Act
      render(
        renderWithTheme(
          renderWithApolloClient(
            <CreateProductDiscounts product={mockProductPrices} query={mockQuery} />,
          ),
        ),
      );
      fireEvent.click(screen.getByTestId('radio_noDiscount'));

      const submitButton = screen.getByTestId('create-product-discounts-submit-button');
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(mockSubmitProductDiscountsStep).toHaveBeenCalledWith(expectedValues);
        expect(mockPushRoute).toHaveBeenCalledWith({
          pathname: DASHBOARD_COMPANY_PRODUCTS,
          query: {
            companyId: expectedCompanyId,
            productId: expectedProductId,
            type: productTypes.ACTIVE,
          },
        });
      });
    });
  });

  test('should call CreateProductTemplate', async () => {
    // Arrange
    const expectedValues = {
      discountMethod: SUM,
      discountsForVariant: false,
      periodDiscounts: [],
      productId: expectedProductId,
      variants: [],
      weeklyDiscounts: [],
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateProductDiscounts product={mockProductPrices} query={mockQuery} />,
        ),
      ),
    );
    fireEvent.click(screen.getByTestId('radio_noDiscount'));

    const submitButton = screen.getByTestId('create-product-template-button');
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockCreateProductTemplate).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should add and remove weeklyDiscounts and periodDiscounts', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <CreateProductDiscounts product={mockProductPrices} query={mockQuery} />,
          ),
        ),
      ),
    );
    fireEvent.click(screen.getByTestId('radio_singleDiscount'));

    // Act
    const buttonAddWeeklyDiscount = screen.getByTestId('add-weeklyDiscounts-button');
    const buttonAddPeriodDiscount = screen.getByTestId('add-periodDiscounts-button');

    fireEvent.click(buttonAddWeeklyDiscount);
    fireEvent.click(buttonAddPeriodDiscount);

    // Assert
    expect(screen.queryAllByTestId('weeklyDiscounts.1.amount').length).toBe(1);
    expect(screen.queryAllByTestId('periodDiscounts.1.amount').length).toBe(1);

    // Act
    await user.click(screen.getByTestId('remove-weeklyDiscounts-1'));
    fireEvent.click(screen.getByTestId('confirm-modal-button'));

    await user.click(screen.getByTestId('remove-periodDiscounts-1'));
    fireEvent.click(screen.getByTestId('confirm-modal-button'));

    // Assert
    await waitFor(() => {
      expect(screen.queryAllByTestId('weeklyDiscounts.1.amount').length).toBe(0);
      expect(screen.queryAllByTestId('periodDiscounts.1.amount').length).toBe(0);
    });
  });
});
