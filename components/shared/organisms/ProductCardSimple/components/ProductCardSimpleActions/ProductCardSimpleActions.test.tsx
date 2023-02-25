import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { mockProduct } from '__tests__/mocks/mockProducts';

import {
  useDestroyCustomerProduct,
  useRestoreCustomerProduct,
  useAddProductToPriorityList,
  useRemoveProductFromPriorityList,
} from 'lib/apollo/hooks/actions/product';

import { StatusEnum } from 'graphql/types';
import ProductCardSimpleActions from './ProductCardSimpleActions';

jest.mock('lib/apollo/hooks/actions/product');

const mockedUseDestroyCustomerProduct = useDestroyCustomerProduct as jest.Mock;
const mockedUseRestoreCustomerProduct = useRestoreCustomerProduct as jest.Mock;
const mockedUseAddProductToPriorityList = useAddProductToPriorityList as jest.Mock;
const mockedUseRemoveProductFromPriorityList = useRemoveProductFromPriorityList as jest.Mock;

describe('ProductCardSimpleActions', () => {
  const { id: mockProductId } = mockProduct;

  const mockDestroyCustomerProduct = jest.fn(() => mockProduct);
  const mockUseDestroyCustomerProduct = jest.fn(() => [mockDestroyCustomerProduct]);
  mockedUseDestroyCustomerProduct.mockImplementation(mockUseDestroyCustomerProduct);

  const mockRestoreCustomerProduct = jest.fn(() => mockProduct);
  const mockUseRestoreCustomerProduct = jest.fn(() => [mockRestoreCustomerProduct]);
  mockedUseRestoreCustomerProduct.mockImplementation(mockUseRestoreCustomerProduct);

  const mockAddProductToPriorityList = jest.fn(() => mockProduct);
  const mockUseAddProductToPriorityList = jest.fn(() => [mockAddProductToPriorityList]);
  mockedUseAddProductToPriorityList.mockImplementation(mockUseAddProductToPriorityList);

  const mockRemoveProductFromPriorityList = jest.fn(() => mockProduct);
  const mockUseRemoveProductFromPriorityList = jest.fn(() => [mockRemoveProductFromPriorityList]);
  mockedUseRemoveProductFromPriorityList.mockImplementation(mockUseRemoveProductFromPriorityList);

  test('should show RestoreCustomerProductButton for deleted', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardSimpleActions
              productId={mockProductId}
              status={StatusEnum.Verified}
              variant="default"
              canAddToPriorityList={false}
              canRemoveFromPriorityList={false}
              deleted
            />,
          ),
        ),
      ),
    );

    // Act
    const actionButtons = screen.getByTestId('product-card-simple-actions').childNodes;
    const restoreButton = screen.getByTestId('restore-customer-product-button');

    // Assert
    expect(actionButtons.length).toBe(1);
    expect(restoreButton).toBeInTheDocument();
    expect(restoreButton).toHaveTextContent('Восстановить');
  });

  test('should call restoreCustomerProduct on RestoreCustomerProductButton click', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardSimpleActions
              productId={mockProductId}
              status={StatusEnum.Verified}
              variant="default"
              canAddToPriorityList={false}
              canRemoveFromPriorityList={false}
              deleted
            />,
          ),
        ),
      ),
    );

    // Act
    const restoreButton = screen.getByTestId('restore-customer-product-button');
    await user.click(restoreButton);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    await waitFor(() => {
      expect(mockRestoreCustomerProduct).toHaveBeenCalledWith(mockProductId);
    });
  });

  test('should show ProductDetailsButton for deleted', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardSimpleActions
              productId={mockProductId}
              status={StatusEnum.Rejected}
              variant="default"
              canAddToPriorityList={false}
              canRemoveFromPriorityList={false}
              deleted={false}
            />,
          ),
        ),
      ),
    );

    // Act
    const actionButtons = screen.getByTestId('product-card-simple-actions').childNodes;
    const productDetailsButton = screen.getByTestId('product-details-button');

    // Assert
    expect(actionButtons.length).toBe(1);
    expect(productDetailsButton).toBeInTheDocument();
    expect(productDetailsButton).toHaveTextContent('Подробнее');
  });

  test('should show ProductDetailsButton and DestroyCustomerProductButton for verified', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardSimpleActions
              productId={mockProductId}
              status={StatusEnum.Verified}
              variant="default"
              canAddToPriorityList={false}
              canRemoveFromPriorityList={false}
              deleted={false}
            />,
          ),
        ),
      ),
    );

    // Act
    const actionButtons = screen.getByTestId('product-card-simple-actions').childNodes;
    const productDetailsButton = screen.getByTestId('product-details-button');
    const destroyCustomerProductButton = screen.getByTestId('destroy-customer-product-button');

    // Assert
    expect(actionButtons.length).toBe(2);
    expect(productDetailsButton).toBeInTheDocument();
    expect(destroyCustomerProductButton).toBeInTheDocument();
    expect(productDetailsButton).toHaveTextContent('Подробнее');
  });

  test('should call destroyCustomerProduct on DestroyCustomerProductButton click', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardSimpleActions
              productId={mockProductId}
              status={StatusEnum.Verified}
              variant="default"
              canAddToPriorityList={false}
              canRemoveFromPriorityList={false}
              deleted={false}
            />,
          ),
        ),
      ),
    );

    // Act
    const destroyCustomerProductButton = screen.getByTestId('destroy-customer-product-button');
    await user.click(destroyCustomerProductButton);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    await waitFor(() => {
      expect(mockDestroyCustomerProduct).toHaveBeenCalledWith(mockProductId);
    });
  });

  test('should show ConfirmProductButton for not_verified', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardSimpleActions
              productId={mockProductId}
              status={StatusEnum.NotVerified}
              variant="default"
              canAddToPriorityList={false}
              canRemoveFromPriorityList={false}
              deleted={false}
            />,
          ),
        ),
      ),
    );

    // Act
    const actionButtons = screen.getByTestId('product-card-simple-actions').childNodes;
    const confirmProductButton = screen.getByTestId('confirm-product-button');

    // Assert
    expect(actionButtons.length).toBe(1);
    expect(confirmProductButton).toBeInTheDocument();
    expect(confirmProductButton).toHaveTextContent('Проверить товар');
  });

  test('should show AddProductToPriorityButton for not prioritized', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardSimpleActions
              productId={mockProductId}
              status={StatusEnum.NotVerified}
              variant="admin_priority"
              canAddToPriorityList
              canRemoveFromPriorityList={false}
              deleted={false}
            />,
          ),
        ),
      ),
    );

    // Act
    const actionButtons = screen.getByTestId('product-card-simple-actions').childNodes;
    const addProductToPriorityButton = screen.getByTestId('add-product-to-priority-button');

    // Assert
    expect(actionButtons.length).toBe(1);
    expect(addProductToPriorityButton).toBeInTheDocument();
    expect(addProductToPriorityButton).toHaveTextContent('Добавить');
  });

  test('should call addProductToPriorityList on AddProductToPriorityButton click', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardSimpleActions
              productId={mockProductId}
              status={StatusEnum.NotVerified}
              variant="admin_priority"
              canAddToPriorityList
              canRemoveFromPriorityList={false}
              deleted={false}
            />,
          ),
        ),
      ),
    );

    // Act
    const addProductToPriorityButton = screen.getByTestId('add-product-to-priority-button');
    await user.click(addProductToPriorityButton);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    await waitFor(() => {
      expect(mockAddProductToPriorityList).toHaveBeenCalledWith({ productId: mockProductId });
    });
  });

  test('should show RemoveProductFromPriorityButton for prioritized', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardSimpleActions
              productId={mockProductId}
              status={StatusEnum.NotVerified}
              variant="admin_priority"
              canAddToPriorityList={false}
              canRemoveFromPriorityList
              deleted={false}
            />,
          ),
        ),
      ),
    );

    // Act
    const actionButtons = screen.getByTestId('product-card-simple-actions').childNodes;
    const removeProductFromPriorityButton = screen.getByTestId(
      'remove-product-from-priority-button',
    );

    // Assert
    expect(actionButtons.length).toBe(1);
    expect(removeProductFromPriorityButton).toBeInTheDocument();
    expect(removeProductFromPriorityButton).toHaveTextContent('Убрать из приоритетных');
  });

  test('should call removeProductFromPriorityList on RemoveProductFromPriorityButton click', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ProductCardSimpleActions
              productId={mockProductId}
              status={StatusEnum.NotVerified}
              variant="admin_priority"
              canAddToPriorityList={false}
              canRemoveFromPriorityList
              deleted={false}
            />,
          ),
        ),
      ),
    );

    // Act
    const removeProductFromPriorityButton = screen.getByTestId(
      'remove-product-from-priority-button',
    );
    await user.click(removeProductFromPriorityButton);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    await waitFor(() => {
      expect(mockRemoveProductFromPriorityList).toHaveBeenCalledWith({ productId: mockProductId });
    });
  });
});
