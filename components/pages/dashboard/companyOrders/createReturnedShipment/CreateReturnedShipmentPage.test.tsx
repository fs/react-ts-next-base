import React from 'react';
import { render, screen } from '@testing-library/react';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrders } from 'lib/apollo/hooks/state/orders';
import { useAccount } from 'lib/apollo/hooks/state/account';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockOrders, mockOrder } from '__tests__/mocks/mockOrders';
import { mockCompanies } from '__tests__/mocks/mockCompanies';
import { mockReturnedShipment } from '__tests__/mocks/mockReturnedShipment';
import {
  CompanyStatusEnum,
  OrderCheckoutStatusEnum,
  ReturnedShipmentStatusEnum,
} from 'graphql/types';
import { TPageProps } from 'lib/apollo/types';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';
import { CreateReturnedShipmentPage } from './CreateReturnedShipmentPage';

jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/account');
jest.mock('lib/apollo/hooks/state/clientSideState');

const mockedUseMyCompanies = useMyCompanies as jest.MockedFunction<typeof useMyCompanies>;
const mockedUseOrders = useOrders as jest.MockedFunction<typeof useOrders>;
const mockedUseAccount = useAccount as jest.MockedFunction<typeof useAccount>;

describe('CreateReturnedShipmentPage', () => {
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

  test('should render createReturnedShipment form correctly', async () => {
    // Arrange
    const mockCompanyId = '10';
    const mockQuery = { companyId: mockCompanyId, orderId: mockOrder.id };

    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockCompanies,
      noCompanies: false,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

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

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <CreateReturnedShipmentPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const createReturnedShipmentPage = screen.getByTestId('create-returned-shipment-page');

    // Assert
    expect(createReturnedShipmentPage).toBeInTheDocument();
    expect(mockUseMyCompanies).toHaveBeenCalledWith<Parameters<typeof useMyCompanies>>({
      companyIds: [mockCompanyId],
    });
    expect(mockUseOrders).toHaveBeenCalledWith<Parameters<typeof useOrders>>({
      companyId: mockCompanyId,
      checkoutStatus: OrderCheckoutStatusEnum.Placed,
      orderId: mockOrder.id,
    });
  });

  test('should render updateReturnedShipment for rejected returned shipment', async () => {
    // Arrange
    const mockCompanyId = '10';
    const mockQuery = { companyId: mockCompanyId, orderId: mockOrder.id };
    const mockRejectedOrder = {
      ...mockOrder,
      dispute: {
        ...mockOrder.dispute,
        returnedShipment: { ...mockReturnedShipment, status: ReturnedShipmentStatusEnum.Rejected },
      },
    };

    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockCompanies,
      noCompanies: false,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

    const mockUseOrders = jest.fn(() => ({
      orders: [mockRejectedOrder],
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseOrders.mockImplementation(mockUseOrders);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <CreateReturnedShipmentPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const rejectedReturnedShipment = screen.getByTestId('rejected-returned-shipment-comment');

    // Assert
    expect(rejectedReturnedShipment).toBeInTheDocument();
    expect(mockUseMyCompanies).toHaveBeenCalledWith<Parameters<typeof useMyCompanies>>({
      companyIds: [mockCompanyId],
    });
    expect(mockUseOrders).toHaveBeenCalledWith<Parameters<typeof useOrders>>({
      companyId: mockCompanyId,
      checkoutStatus: OrderCheckoutStatusEnum.Placed,
      orderId: mockOrder.id,
    });
  });

  test('should show empty message for not verified company', async () => {
    // Arrange
    const mockCompanyId = '10';
    const mockQuery = { companyId: mockCompanyId, orderId: mockOrder.id };
    const notVerifiedCompany = { ...mockCompanies[0], status: CompanyStatusEnum.NotVerified };

    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: [notVerifiedCompany],
      noCompanies: false,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

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

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <CreateReturnedShipmentPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const emptyMessage = screen.getByTestId('empty-message-checking-company');

    // Assert
    expect(emptyMessage).toBeInTheDocument();
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockCompanyId = '10';
    const mockQuery = { companyId: mockCompanyId, orderId: mockOrder.id };

    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockCompanies,
      noCompanies: false,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

    const mockUseOrders = jest.fn(() => ({
      orders: mockOrders,
      pageInfo: { endCursor: null, hasNextPage: false },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: true,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseOrders.mockImplementation(mockUseOrders);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <CreateReturnedShipmentPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const loader = screen.getByTestId('create-returned-shipment-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
