import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { BLACKLISTED, VERIFIED } from 'config/constants/status';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import { useCompanies } from 'lib/apollo/hooks/state/companies';
import { useProducts } from 'lib/apollo/hooks/state/products';
import useCurrentUser from 'hooks/useCurrentUser';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockCompanies } from '__tests__/mocks/mockCompanies';
import { mockProducts } from '__tests__/mocks/mockProducts';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import { CompanyDirectionEnum } from 'graphql/types';
import { CompanyPage } from './CompanyPage';

jest.mock('lib/apollo/hooks/state/companies');
jest.mock('lib/apollo/hooks/state/products');
jest.mock('hooks/useCurrentUser');
jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CompanyPage', () => {
  const expectedCompanyId = '1';

  const mockUseCurrentUser = jest.fn(() => ({
    loading: undefined,
    error: undefined,
    user: { id: '1', email: 'user@mail.ru' },
  }));
  useCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render correctly products tab', async () => {
    // Arrange
    const query = { companyId: expectedCompanyId, products: true };

    const mockUseCompanies = jest.fn(() => ({ companies: mockCompanies, loading: undefined }));
    useCompanies.mockImplementation(mockUseCompanies);

    const mockUseProducts = jest.fn(() => ({
      loading: undefined,
      products: mockProducts,
      pageInfo: { endCursor: 'FF', hasNextPage: true },
    }));
    useProducts.mockImplementation(mockUseProducts);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompanyPage {...pageProps} query={query} />),
      ),
    );
    const companyProductsTab = screen.getByTestId('company-products-tab');

    // Assert
    expect(companyProductsTab).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseCompanies).toHaveBeenCalledWith({
        companyIds: [expectedCompanyId],
        directions: [CompanyDirectionEnum.Seller],
        statuses: [VERIFIED, BLACKLISTED],
      });
      expect(mockUseProducts).toHaveBeenCalledWith({
        companyIds: expectedCompanyId,
        searchQuery: undefined,
      });
    });
  });

  test('should render correctly reviews tab', async () => {
    // Arrange
    const query = { companyId: expectedCompanyId, reviews: true };

    const mockUseCompanies = jest.fn(() => ({ companies: mockCompanies, loading: undefined }));
    useCompanies.mockImplementation(mockUseCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompanyPage {...pageProps} query={query} />),
      ),
    );
    const companyReviewsTab = screen.getByTestId('company-reviews-tab');

    // Assert
    expect(companyReviewsTab).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseCompanies).toHaveBeenCalledWith({
        companyIds: [expectedCompanyId],
        directions: [CompanyDirectionEnum.Seller],
        statuses: [VERIFIED, BLACKLISTED],
      });
    });
  });

  test('should show loader on loading', () => {
    // Arrange
    const query = { companyId: expectedCompanyId };

    const mockUseCompanies = jest.fn(() => ({ companies: [], loading: true }));
    useCompanies.mockImplementation(mockUseCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompanyPage {...pageProps} query={query} />),
      ),
    );
    const loader = screen.getByTestId('company-page-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });

  test('should return error page for non existing company', () => {
    // Arrange
    const query = { companyId: expectedCompanyId };

    const mockUseCompanies = jest.fn(() => ({
      companies: [],
      loading: undefined,
    }));
    useCompanies.mockImplementation(mockUseCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompanyPage {...pageProps} query={query} />),
      ),
    );
    const errorPage = screen.getByTestId('error-page-text');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });
});
