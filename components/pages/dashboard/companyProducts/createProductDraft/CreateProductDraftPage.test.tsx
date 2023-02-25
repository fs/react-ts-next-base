import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useCurrentUser from 'hooks/useCurrentUser';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useAccount } from 'lib/apollo/hooks/state/account';
import { useCategories } from 'lib/apollo/hooks/state/categories';
import { useOrdersSummary } from 'lib/apollo/hooks/state/orders';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCurrentUserRegisteredData } from '__tests__/mocks/mockCurrentUser';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { TPageProps } from 'lib/apollo/types';

import { CreateProductDraftPage } from './CreateProductDraftPage';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/legalForms');
jest.mock('lib/apollo/hooks/state/account');
jest.mock('lib/apollo/hooks/state/categories');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/clientSideState');

const mockedUseMyCompanies = useMyCompanies as jest.MockedFunction<typeof useMyCompanies>;
const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;
const mockedUseAccount = useAccount as jest.MockedFunction<typeof useAccount>;
const mockedUseCategories = useCategories as jest.MockedFunction<typeof useCategories>;
const mockedUseOrdersSummary = useOrdersSummary as jest.MockedFunction<typeof useOrdersSummary>;
const mockedUseCompanySidebar = useCompanySidebar as jest.MockedFunction<typeof useCompanySidebar>;
const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;

describe('CreateProductDraftPage', () => {
  const expectedCompanyId = '1';
  const expectedProductId = '1';
  const query = { companyId: expectedCompanyId, productId: expectedProductId };

  const mockUseCompanySidebar = jest.fn(() => ({
    companySidebar: true,
    toggleIsShowFinances: () => {},
  }));
  mockedUseCompanySidebar.mockImplementation(mockUseCompanySidebar);

  const mockUseCity = jest.fn(() => ({
    city: '',
    setCity: () => {},
    isFirstCheck: true,
  }));
  mockedUseCity.mockImplementation(mockUseCity);

  const mockUseAccount = jest.fn(() => ({
    account: {},
    refetch: jest.fn(),
    fetchMore: jest.fn(),
    loading: false,
    error: undefined,
  }));
  mockedUseAccount.mockImplementation(mockUseAccount);

  const mockUseCategories = jest.fn(() => ({
    categories: [],
    refetch: jest.fn(),
    loading: false,
    error: undefined,
  }));
  mockedUseCategories.mockImplementation(mockUseCategories);

  const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
  mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockUserOrdersSummary = jest.fn(() => ({
    totalCount: 0,
    refetch: jest.fn(),
    loading: false,
    error: undefined,
  }));
  mockedUseOrdersSummary.mockImplementation(mockUserOrdersSummary);

  test('should render correctly', async () => {
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      noCompanies: false,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <CreateProductDraftPage {...pageProps} query={query} />
        )),
      ),
    );
    const createProductPage = screen.getByTestId('create-product-page');

    // Assert
    expect(createProductPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [expectedCompanyId] });
    });
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      noCompanies: false,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: true,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <CreateProductDraftPage {...pageProps} query={query} />
        )),
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
      noCompanies: false,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <CreateProductDraftPage {...pageProps} query={query} />
        )),
      ),
    );
    const errorPage = screen.getByTestId('error-page-text');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });
});
