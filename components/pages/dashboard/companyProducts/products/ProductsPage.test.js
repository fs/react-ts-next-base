import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import useCurrentUser from 'hooks/useCurrentUser';
import { useMyProducts } from 'lib/apollo/hooks/state/myProducts';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockMyProducts } from '__tests__/mocks/mockMyProducts';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';

import { productTypes } from '../constants';

import { ProductsPage } from './ProductsPage';

jest.mock('hooks/useRouter');
jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/myProducts');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('ProductsPage', () => {
  const expectedVerifiedCompanyId = '10';
  const query = { companyId: expectedVerifiedCompanyId, type: productTypes.ACTIVE };

  const mockUseCurrentUser = jest.fn(() => ({
    loading: undefined,
    error: undefined,
    user: { id: '1', email: 'user@mail.ru' },
  }));
  useCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockUseMyProducts = jest.fn(() => ({
    products: mockMyProducts,
    loading: undefined,
    refetch: jest.fn(),
  }));
  useMyProducts.mockImplementation(mockUseMyProducts);

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));
  useCompanySidebar.mockImplementation(jest.fn(() => mockUseCompanySidebarData));

  test('should call hooks on render', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <ProductsPage {...pageProps} query={query} />),
      ),
    );
    const companyProductsContainer = await screen.findByTestId('company-products-page');

    // Assert
    expect(companyProductsContainer).toBeInTheDocument();
    expect(mockUseCurrentUser).toHaveBeenCalled();
    expect(mockUseMyProducts).toHaveBeenCalledWith({
      companyIds: [expectedVerifiedCompanyId],
      searchQuery: undefined,
      deleted: false,
      template: false,
      first: 11,
      orderBy: undefined,
      draft: false,
    });
    expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [expectedVerifiedCompanyId] });
  });

  test('should return error page for non existing company', () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: [],
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <ProductsPage {...pageProps} query={query} />),
      ),
    );
    const errorPage = screen.getByTestId('error-page-text');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });
});
