import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useCurrentUser from 'hooks/useCurrentUser';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useMyProducts } from 'lib/apollo/hooks/state/myProducts';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockMyProducts } from '__tests__/mocks/mockMyProducts';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';

import { CreateProductPage } from './CreateProductPage';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/myProducts');
jest.mock('lib/apollo/hooks/state/legalForms');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateProductPage', () => {
  const expectedCompanyId = '1';
  const expectedProductId = '1';
  const query = { companyId: expectedCompanyId, productId: expectedProductId };

  const mockUseCurrentUser = jest.fn(() => ({
    user: mockCurrentUser,
  }));
  useCurrentUser.mockImplementation(mockUseCurrentUser);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));
  useCompanySidebar.mockImplementation(jest.fn(() => mockUseCompanySidebarData));

  test('should render correctly', async () => {
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    const mockUseMyProducts = jest.fn(() => ({
      products: mockMyProducts,
      loading: undefined,
    }));
    useMyProducts.mockImplementation(mockUseMyProducts);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CreateProductPage {...pageProps} query={query} />),
      ),
    );
    const createProductPage = screen.getByTestId('create-product-page');

    // Assert
    expect(createProductPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [expectedCompanyId] });
      expect(mockUseMyProducts).toHaveBeenCalledWith({
        companyIds: [expectedCompanyId],
        productIds: [expectedProductId],
      });
    });
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    const mockUseMyProducts = jest.fn(() => ({
      products: [],
      loading: true,
    }));
    useMyProducts.mockImplementation(mockUseMyProducts);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CreateProductPage {...pageProps} query={query} />),
      ),
    );
    const loader = await screen.findByTestId('create-product-page-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });

  test('should return error page for non existing company', () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: [],
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    const mockUseMyProducts = jest.fn(() => ({
      products: mockMyProducts,
      loading: false,
    }));
    useMyProducts.mockImplementation(mockUseMyProducts);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CreateProductPage {...pageProps} query={query} />),
      ),
    );
    const errorPage = screen.getByTestId('error-page-text');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });

  test('should return error page for non existing product', () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    const mockUseMyProducts = jest.fn(() => ({
      products: [],
      loading: false,
    }));
    useMyProducts.mockImplementation(mockUseMyProducts);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CreateProductPage {...pageProps} query={query} />),
      ),
    );
    const errorPage = screen.getByTestId('error-page-text');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });
});
