import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { mockProduct } from '__tests__/mocks/mockProducts';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import { mockUseNotifierData } from '__tests__/mocks/mockUseNotifierData';

import { StatusEnum } from 'graphql/types';
import { productTypes } from 'components/pages/dashboard/companyProducts/constants';
import { DASHBOARD_COMPANY_CREATE_PRODUCT, DASHBOARD_COMPANY_PRODUCTS } from 'config/routes';

import useRouter from 'hooks/useRouter';
import useNotifier from 'hooks/useNotifier';
import {
  useAddProductToFavorites,
  useRemoveProductFromFavorites,
  useDestroyProduct,
  useRenewProduct,
  useRestoreProduct,
  useCreateProductFromTemplate,
} from 'lib/apollo/hooks/actions/product';

import ActionButtons from './ActionButtons';

jest.mock('lib/apollo/hooks/actions/product');
jest.mock('hooks/useNotifier');
jest.mock('hooks/useRouter');

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedUseNotifier = useNotifier as jest.MockedFunction<typeof useNotifier>;
const mockedUseAddProductToFavorites = useAddProductToFavorites as jest.Mock;
const mockedUseRemoveProductFromFavorites = useRemoveProductFromFavorites as jest.Mock;
const mockedUseDestroyProduct = useDestroyProduct as jest.Mock;
const mockedUseRenewProduct = useRenewProduct as jest.Mock;
const mockedUseRestoreProduct = useRestoreProduct as jest.Mock;
const mockedUseCreateProductFromTemplate = useCreateProductFromTemplate as jest.Mock;

describe('ActionButtons', () => {
  const expectedProductId = '1';
  const expectedCompanyId = '2';
  const mockRefetchProducts = jest.fn();

  const mockPushRoute = jest.fn();
  const mockUseRouter = jest.fn(() => ({
    ...mockUseRouterData,
    query: { companyId: expectedCompanyId },
    pushRoute: mockPushRoute,
  }));
  mockedUseRouter.mockImplementation(mockUseRouter);

  mockedUseNotifier.mockImplementation(jest.fn(() => mockUseNotifierData));

  const mockRenewProduct = jest.fn();
  const mockUseRenewProduct = jest.fn(() => [mockRenewProduct]);
  mockedUseRenewProduct.mockImplementation(mockUseRenewProduct);

  const mockAddProductToFavorites = jest.fn();
  const mockUseAddProductToFavorites = jest.fn(() => [mockAddProductToFavorites]);
  mockedUseAddProductToFavorites.mockImplementation(mockUseAddProductToFavorites);

  const mockRemoveProductFromFavorites = jest.fn();
  const mockUseRemoveProductFromFavorites = jest.fn(() => [mockRemoveProductFromFavorites]);
  mockedUseRemoveProductFromFavorites.mockImplementation(mockUseRemoveProductFromFavorites);

  const mockDestroyProduct = jest.fn();
  const mockUseDestroyProduct = jest.fn(() => [mockDestroyProduct]);
  mockedUseDestroyProduct.mockImplementation(mockUseDestroyProduct);

  const mockRestoreProduct = jest.fn();
  const mockUseRestoreProduct = jest.fn(() => [mockRestoreProduct]);
  mockedUseRestoreProduct.mockImplementation(mockUseRestoreProduct);

  const mockCreateProductFromTemplate = jest.fn(() => mockProduct);
  const mockUseCreateProductFromTemplate = jest.fn(() => [mockCreateProductFromTemplate]);
  mockedUseCreateProductFromTemplate.mockImplementation(mockUseCreateProductFromTemplate);

  test('should show only RestoreProductButton for deleted', async () => {
    // Arrange
    const mockCompanyProduct = { ...mockProduct, deleted: true };

    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ActionButtons
              product={mockCompanyProduct}
              variant="company"
              view="tile"
              isUserBuyer
              isFavoriteModalShown
              refetchProducts={mockRefetchProducts}
            />,
          ),
        ),
      ),
    );

    // Act
    const actionButtons = screen.getByTestId('product-actions-wrapper').childNodes;
    const restoreButton = screen.getByTestId('restore-product-button');

    // Assert
    expect(actionButtons.length).toBe(1);
    expect(restoreButton).toBeInTheDocument();
    expect(restoreButton).toHaveTextContent('Восстановить');
  });

  test('should call restoreProduct on RestoreProductButton click', async () => {
    // Arrange
    const mockCompanyProduct = { ...mockProduct, deleted: true };

    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ActionButtons
              product={mockCompanyProduct}
              variant="company"
              view="tile"
              isUserBuyer
              isFavoriteModalShown
              refetchProducts={mockRefetchProducts}
            />,
          ),
        ),
      ),
    );

    // Act
    const restoreButton = screen.getByTestId('restore-product-button');
    await user.click(restoreButton);

    const confirmRemoveProductButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmRemoveProductButton);

    // Assert
    await waitFor(() => {
      expect(mockRestoreProduct).toHaveBeenCalledWith(expectedProductId);
      expect(mockPushRoute).toHaveBeenCalledWith({
        pathname: DASHBOARD_COMPANY_PRODUCTS,
        query: {
          companyId: expectedCompanyId,
          type: productTypes.ACTIVE,
        },
      });
    });
  });

  test('should show only RemoveProductButton and UseTemplateButton for template', async () => {
    // Arrange
    const mockCompanyProduct = { ...mockProduct, template: true };

    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ActionButtons
              product={mockCompanyProduct}
              variant="company"
              view="tile"
              isUserBuyer
              isFavoriteModalShown
              refetchProducts={mockRefetchProducts}
            />,
          ),
        ),
      ),
    );

    // Act
    const actionButtons = screen.getByTestId('product-actions-wrapper').childNodes;
    const removeButton = screen.getByTestId('remove-product-button');
    const useTemplateButton = screen.getByTestId('use-template-button');

    // Assert
    expect(actionButtons.length).toBe(3);
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveTextContent('');
    expect(useTemplateButton).toBeInTheDocument();
    expect(useTemplateButton).toHaveTextContent('Использовать');
  });

  test('should call createProductFromTemplate on UseTemplateButton click', async () => {
    // Arrange
    const mockCompanyProduct = { ...mockProduct, template: true };

    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ActionButtons
              product={mockCompanyProduct}
              variant="company"
              view="tile"
              isUserBuyer
              isFavoriteModalShown
              refetchProducts={mockRefetchProducts}
            />,
          ),
        ),
      ),
    );

    // Act
    const useTemplateButton = screen.getByTestId('use-template-button');
    await user.click(useTemplateButton);

    // Assert
    await waitFor(() => {
      expect(mockCreateProductFromTemplate).toHaveBeenCalled();
      expect(mockPushRoute).toHaveBeenCalledWith({
        pathname: DASHBOARD_COMPANY_CREATE_PRODUCT,
        query: {
          companyId: expectedCompanyId,
          productId: expectedProductId,
        },
      });
    });
  });

  test('should show only RemoveProductButton and RenewProductButton for status === OutOfStock', async () => {
    // Arrange
    const mockCompanyProduct = { ...mockProduct, status: StatusEnum.OutOfStock };

    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ActionButtons
              product={mockCompanyProduct}
              variant="company"
              view="tile"
              isUserBuyer
              isFavoriteModalShown
              refetchProducts={mockRefetchProducts}
            />,
          ),
        ),
      ),
    );

    // Act
    const actionButtons = screen.getByTestId('product-actions-wrapper').childNodes;
    const removeButton = screen.getByTestId('remove-product-button');
    const renewButton = screen.getByTestId('renew-product-button');

    // Assert
    expect(actionButtons.length).toBe(2);
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveTextContent('Удалить');
    expect(renewButton).toBeInTheDocument();
    expect(renewButton).toHaveTextContent('Обновить');
  });

  test('should call renewProduct on RenewProductButton click', async () => {
    // Arrange
    const mockCompanyProduct = { ...mockProduct, status: StatusEnum.OutOfStock, draft: false };

    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ActionButtons
              product={mockCompanyProduct}
              variant="company"
              view="tile"
              isUserBuyer
              isFavoriteModalShown
              refetchProducts={mockRefetchProducts}
            />,
          ),
        ),
      ),
    );

    // Act
    const renewButton = screen.getByTestId('renew-product-button');
    await user.click(renewButton);

    // Assert
    expect(mockRenewProduct).toHaveBeenCalledWith(expectedProductId);
  });

  test('should only redirect on RenewProductButton click', async () => {
    // Arrange
    const mockCompanyProduct = { ...mockProduct, status: StatusEnum.OutOfStock, draft: true };

    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ActionButtons
              product={mockCompanyProduct}
              variant="company"
              view="tile"
              isUserBuyer
              isFavoriteModalShown
              refetchProducts={mockRefetchProducts}
            />,
          ),
        ),
      ),
    );

    const renewButton = screen.getByTestId('renew-product-button');

    // Act
    await user.click(renewButton);

    // Assert

    expect(mockRenewProduct).not.toBeCalled();
    expect(mockPushRoute).toHaveBeenCalledWith({
      pathname: DASHBOARD_COMPANY_CREATE_PRODUCT,
      query: {
        companyId: expectedCompanyId,
        productId: expectedProductId,
      },
    });
  });

  test('should show only RemoveProductButton and EditProductButton for draft', async () => {
    // Arrange
    const mockCompanyProduct = { ...mockProduct, draft: true };

    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <ActionButtons
              product={mockCompanyProduct}
              variant="company"
              view="tile"
              isUserBuyer
              isFavoriteModalShown
              refetchProducts={mockRefetchProducts}
            />,
          ),
        ),
      ),
    );

    // Act
    const actionButtons = screen.getByTestId('product-actions-wrapper').childNodes;
    const removeButton = screen.getByTestId('remove-product-button');
    const editButton = screen.getByTestId('edit-product-button');

    // Assert
    expect(actionButtons.length).toBe(2);
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveTextContent('Удалить');
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent('Редактировать');
  });
});
