import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { DASHBOARD_COMPANY_CREATE_PRODUCT_DRAFT } from 'config/routes';

import useNotifier from 'hooks/useNotifier';
import useRouter from 'hooks/useRouter';

import { productTypes } from '../../constants';

import ProductsList from '.';

jest.mock('hooks/useNotifier');
jest.mock('hooks/useRouter');

describe('ProductsList', () => {
  const expectedId = '1';
  const query = { id: expectedId, type: productTypes.ACTIVE };

  const mockPushRoute = jest.fn();
  const mockUseRouter = jest.fn(() => ({
    pushRoute: mockPushRoute,
  }));
  useRouter.mockImplementation(mockUseRouter);

  const mockSetSuccess = jest.fn();
  const mockSetError = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setSuccess: mockSetSuccess,
      setError: mockSetError,
    })),
  );

  test('should call useCreateProductDraft and redirect on click to create new product', async () => {
    // Arrange
    const mockCompanyId = '1';

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <ProductsList
            products={[]}
            companyId={mockCompanyId}
            query={query}
            isCompanyFullFilled
          />,
        ),
      ),
    );

    const createProductButton = screen.getByTestId('create-product-button');
    fireEvent.click(createProductButton);

    // Assert
    await waitFor(() => {
      expect(mockPushRoute).toHaveBeenCalledWith({
        pathname: DASHBOARD_COMPANY_CREATE_PRODUCT_DRAFT,
        query: {
          companyId: mockCompanyId,
        },
      });
    });
  });
});
