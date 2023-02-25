import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useCurrentUser from 'hooks/useCurrentUser';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrdersSummary } from 'lib/apollo/hooks/state/orders';
import { useAccount } from 'lib/apollo/hooks/state/account';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';
import {
  mockUseCurrentUserRegisteredData,
  mockUseCurrentUserRegisteredWithReservedGuestOrdersData,
} from '__tests__/mocks/mockCurrentUser';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';

import { TPageProps } from 'lib/apollo/types';
import { CompanyDirectionEnum } from 'graphql/types';

import { DashboardPage } from './DashboardPage';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/myEmployees');
jest.mock('lib/apollo/hooks/state/account');
jest.mock('lib/apollo/hooks/state/clientSideState');

const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;
const mockedUseMyCompanies = useMyCompanies as jest.MockedFunction<typeof useMyCompanies>;
const mockedUseOrdersSummary = useOrdersSummary as jest.MockedFunction<typeof useOrdersSummary>;
const mockedUseAccount = useAccount as jest.MockedFunction<typeof useAccount>;

describe('DashboardPage', () => {
  const query = { direction: CompanyDirectionEnum.Seller };

  const mockUserOrdersSummary = jest.fn(() => ({
    totalCount: 0,
    refetch: jest.fn(),
    loading: false,
    error: undefined,
  }));
  mockedUseOrdersSummary.mockImplementation(mockUserOrdersSummary);

  const mockUseAccount = jest.fn(() => ({
    account: {},
    refetch: jest.fn(),
    fetchMore: jest.fn(),
    loading: false,
    error: undefined,
  }));
  mockedUseAccount.mockImplementation(mockUseAccount);

  const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;
  mockedUseCity.mockImplementation(jest.fn(() => mockUseCityData));

  const mockedUseCompanySidebar = useCompanySidebar as jest.MockedFunction<
    typeof useCompanySidebar
  >;
  mockedUseCompanySidebar.mockImplementation(jest.fn(() => mockUseCompanySidebarData));

  test('should render correctly', async () => {
    // Arrange
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

    const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <DashboardPage {...pageProps} query={query} />
        )),
      ),
    );
    const dashboardPage = screen.getByTestId('dashboard-page');

    // Assert
    expect(dashboardPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseCurrentUser).toHaveBeenCalled();
      expect(mockUseMyCompanies).toHaveBeenCalledWith({
        directions: [CompanyDirectionEnum.Seller],
        first: 11,
      });
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

    const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <DashboardPage {...pageProps} query={query} />
        )),
      ),
    );
    const loader = screen.getByTestId('dashboard-page-loader');

    // Assert
    await waitFor(() => expect(loader).toBeInTheDocument());
  });

  test('should show empty message', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: [],
      noCompanies: true,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

    const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <DashboardPage {...pageProps} query={query} />
        )),
      ),
    );
    const buttonCreateFirstCompanyBuyer = screen.getByTestId('create-first-buyer-company-button');
    const buttonCreateFirstCompanySeller = screen.getByTestId('create-first-seller-company-button');

    // Assert
    await waitFor(() => {
      expect(buttonCreateFirstCompanyBuyer).toBeInTheDocument();
      expect(buttonCreateFirstCompanySeller).toBeInTheDocument();
      expect(buttonCreateFirstCompanyBuyer).toHaveTextContent('Я покупатель');
      expect(buttonCreateFirstCompanySeller).toHaveTextContent('Я продавец');
    });
  });

  test('should show empty message for user with guest orders', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: [],
      noCompanies: true,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

    const mockUseCurrentUser = jest.fn(
      () => mockUseCurrentUserRegisteredWithReservedGuestOrdersData,
    );
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <DashboardPage {...pageProps} query={query} />
        )),
      ),
    );
    const buttonCreateFirstCompany = screen.getByTestId('create-first-seller-company-button');
    const warning = screen.getByTestId('warning-remove-guest-orders');

    // Assert
    // await waitFor(() => {
    expect(buttonCreateFirstCompany).toBeInTheDocument();
    expect(warning).toBeInTheDocument();
    expect(warning).toHaveTextContent('Если вы не зарегистрируете компанию, заказ пропадет');
    // });
  });
});
