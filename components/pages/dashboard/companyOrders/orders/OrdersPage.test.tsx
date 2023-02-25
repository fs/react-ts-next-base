import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import useCurrentUser from 'hooks/useCurrentUser';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrders, useOrdersSummary } from 'lib/apollo/hooks/state/orders';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';
import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { useAccount } from 'lib/apollo/hooks/state/account';

import { mockUseCurrentUserRegisteredData } from '__tests__/mocks/mockCurrentUser';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockOrders } from '__tests__/mocks/mockOrders';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';

import { TPageProps } from 'lib/apollo/types';
import { CompanyDirectionEnum, CompanyStatusEnum, OrderCheckoutStatusEnum } from 'graphql/types';

import { OrdersPage } from './OrdersPage';

jest.mock('hooks/useRouter');
jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/account');
jest.mock('lib/apollo/hooks/state/clientSideState');

const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedUseOrders = useOrders as jest.MockedFunction<typeof useOrders>;
const mockedUseMyCompanies = useMyCompanies as jest.MockedFunction<typeof useMyCompanies>;
const mockedUseOrdersSummary = useOrdersSummary as jest.MockedFunction<typeof useOrdersSummary>;
const mockedUseAccount = useAccount as jest.MockedFunction<typeof useAccount>;

describe('CreateProductPage', () => {
  const mockUseRouter = jest.fn(() => ({
    ...mockUseRouterData,
    query: { sellerId: mockMyCompanies[0].id },
  }));
  mockedUseRouter.mockImplementation(mockUseRouter);

  const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
  mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

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

  test('should render orders tab correctly', async () => {
    const expectedCompanyId = mockMyCompanies[0].id;
    const query = { companyId: expectedCompanyId, orders: 'true' };

    const expectedOrdersQuery = {
      companyId: expectedCompanyId,
      checkoutStatus: OrderCheckoutStatusEnum.Placed,
      first: 12,
      executionStatuses: undefined,
      productSearchQuery: undefined,
    };

    const mockOrdersReturnValue = {
      orders: [],
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    };

    const mockUseOrders = jest
      .fn()
      .mockReturnValueOnce(mockOrdersReturnValue)
      .mockReturnValueOnce({ ...mockOrdersReturnValue, orders: mockOrders });
    mockedUseOrders.mockImplementation(mockUseOrders);

    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies.map(company => ({
        ...company,
        direction: CompanyDirectionEnum.Buyer,
      })),
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
          <OrdersPage {...pageProps} query={query} />
        )),
      ),
    );
    const ordersPage = screen.getByTestId('company-orders-page');
    const ordersTab = screen.getByTestId('orders-tab');
    const orders = screen.getAllByTestId('order-details');

    // Assert
    expect(ordersPage).toBeInTheDocument();
    expect(ordersTab).toBeInTheDocument();
    expect(orders.length).toBe(mockOrders.length);
    await waitFor(() => {
      expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [expectedCompanyId] });
      expect(mockUseOrders).toHaveBeenCalledWith(expectedOrdersQuery);
    });
  });

  test('should show loader on loading', async () => {
    // Arrange
    const expectedCompanyId = mockMyCompanies[0].id;
    const query = { companyId: expectedCompanyId };

    const mockUseOrders = jest.fn(() => ({
      orders: mockOrders,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseOrders.mockImplementation(mockUseOrders);

    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies.map(company => ({
        ...company,
        direction: CompanyDirectionEnum.Buyer,
      })),
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
          <OrdersPage {...pageProps} query={query} />
        )),
      ),
    );
    const loader = await screen.findByTestId('company-orders-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });

  test('should show empty message for not verified company', async () => {
    // Arrange
    const expectedCompanyId = mockMyCompanies[0].id;
    const query = { companyId: expectedCompanyId };

    const mockUseOrders = jest.fn(() => ({
      orders: [],
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseOrders.mockImplementation(mockUseOrders);

    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies.map(company => ({
        ...company,
        direction: CompanyDirectionEnum.Buyer,
        status: CompanyStatusEnum.NotVerified,
      })),
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
          <OrdersPage {...pageProps} query={query} />
        )),
      ),
    );
    const emptyMessage = await screen.findByTestId('empty-message-checking-company');

    // Assert
    expect(emptyMessage).toBeInTheDocument();
  });

  test('should show reserved order with guestUserOrders', async () => {
    const expectedCompanyId = mockMyCompanies[0].id;
    const query = { companyId: expectedCompanyId, orders: 'true' };

    const mockUseOrders = jest.fn(() => ({
      orders: mockOrders,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseOrders.mockImplementation(mockUseOrders);

    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies.map(company => ({
        ...company,
        direction: CompanyDirectionEnum.Buyer,
      })),
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
          <OrdersPage {...pageProps} query={query} />
        )),
      ),
    );
    const guestOrderNotice = screen.getByTestId('guest-order-notice');

    // Assert
    expect(guestOrderNotice).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [expectedCompanyId] });
    });
  });
});
