import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CompanyDirectionEnum } from 'graphql/types';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useCurrentUser from 'hooks/useCurrentUser';
import { useAccount } from 'lib/apollo/hooks/state/account';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrders, useOrdersSummary } from 'lib/apollo/hooks/state/orders';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockOrders } from '__tests__/mocks/mockOrders';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockUseCurrentUserRegisteredData } from '__tests__/mocks/mockCurrentUser';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';

import { PLACED } from 'config/constants/checkoutStatus';

import { OpenDisputePage } from './OpenDisputePage';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/account');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('OpenDisputePage', () => {
  const expectedCompanyId = mockMyCompanies[0].id;
  const expectedOrderId = '1';
  const query = { companyId: expectedCompanyId, orderId: expectedOrderId };

  const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;
  const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
  mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockedUseOrders = useOrders as jest.MockedFunction<typeof useOrders>;
  const mockUseOrders = jest.fn(() => ({
    orders: mockOrders,
    pageInfo: mockPageInfo,
    refetch: jest.fn(),
    fetchMore: jest.fn(),
    loading: false,
    loadingMore: false,
    error: undefined,
  }));
  mockedUseOrders.mockImplementation(mockUseOrders);

  const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;
  mockedUseCity.mockImplementation(jest.fn(() => mockUseCityData));
  const mockedUseCompanySidebar = useCompanySidebar as jest.MockedFunction<
    typeof useCompanySidebar
  >;
  mockedUseCompanySidebar.mockImplementation(jest.fn(() => mockUseCompanySidebarData));

  const mockedUseMyCompanies = useMyCompanies as jest.MockedFunction<typeof useMyCompanies>;
  const mockDefaultUseMyCompanies = {
    myCompanies: mockMyCompanies.map(company => ({
      ...company,
      direction: CompanyDirectionEnum.Buyer,
    })),
    loading: false,
    pageInfo: mockPageInfo,
    loadingMore: false,
    refetch: jest.fn(),
    fetchMore: jest.fn(),
    error: undefined,
    noCompanies: false,
  };

  const mockedUseOrdersSummary = useOrdersSummary as jest.MockedFunction<typeof useOrdersSummary>;
  const mockUserOrdersSummary = jest.fn(() => ({
    totalCount: 0,
    refetch: jest.fn(),
    loading: false,
    error: undefined,
  }));
  mockedUseOrdersSummary.mockImplementation(mockUserOrdersSummary);

  const mockedUseAccount = useAccount as jest.MockedFunction<typeof useAccount>;
  const mockUseAccount = jest.fn(() => ({
    account: {},
    refetch: jest.fn(),
    fetchMore: jest.fn(),
    loading: false,
    error: undefined,
  }));
  mockedUseAccount.mockImplementation(mockUseAccount);

  test('should render correctly', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => mockDefaultUseMyCompanies);
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <OpenDisputePage {...pageProps} query={query} />),
      ),
    );
    const openDisputePage = await screen.findByTestId('company-open-dispute-page');

    // Assert
    expect(openDisputePage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [expectedCompanyId] });
      expect(mockUseOrders).toHaveBeenCalledWith({
        companyId: expectedCompanyId,
        checkoutStatus: PLACED,
        orderId: expectedOrderId,
      });
    });
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      ...mockDefaultUseMyCompanies,
      myCompanies: mockMyCompanies,
      loading: true,
    }));
    mockedUseMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <OpenDisputePage {...pageProps} query={query} />),
      ),
    );
    const loader = await screen.findByTestId('company-open-dispute-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
