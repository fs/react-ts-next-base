import React from 'react';
import { render, screen } from '@testing-library/react';

import { TPageProps } from 'lib/apollo/types';
import { DisputeStatusEnum, OrderCheckoutStatusEnum } from 'graphql/types';

import useRouter from 'hooks/useRouter';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';
import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { AdminDisputesPage } from './AdminDisputesPage';

jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/customerOrders');
jest.mock('lib/apollo/hooks/state/clientSideState');

const mockedUseCustomerOrders = useCustomerOrders as jest.MockedFunction<typeof useCustomerOrders>;

describe('AdminDisputesPage', () => {
  const mockQuery = { searchQuery: 'searchString' };

  const mockUseCustomerOrders = jest.fn(() => ({
    customerOrders: [],
    pageInfo: mockPageInfo,
    refetch: jest.fn(),
    fetchMore: jest.fn(),
    loading: false,
    loadingMore: false,
    error: undefined,
  }));
  mockedUseCustomerOrders.mockImplementation(mockUseCustomerOrders);

  const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUseRouter = jest.fn(() => ({ ...mockUseRouterData, query: mockQuery }));
  mockedUseRouter.mockImplementation(mockUseRouter);

  const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;
  mockedUseCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render correctly', async () => {
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <AdminDisputesPage {...pageProps} />),
      ),
    );
    const adminDisputesPage = screen.getByTestId('admin-disputes-page');

    // Assert

    expect(adminDisputesPage).toBeInTheDocument();
    expect(mockUseCustomerOrders).toHaveBeenCalledWith<Parameters<typeof useCustomerOrders>>({
      checkoutStatus: OrderCheckoutStatusEnum.Placed,
      disputeStatuses: Object.values(DisputeStatusEnum),
      first: 12,
      searchQuery: mockQuery.searchQuery,
    });
  });
});
