import React from 'react';
import { render, screen } from '@testing-library/react';

import useRouter from 'hooks/useRouter';
import { TPageProps } from 'lib/apollo/types';
import { OrderCheckoutStatusEnum } from 'graphql/types';
import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockOrders } from '__tests__/mocks/mockOrders';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { AdminOrdersPage } from './AdminOrdersPage';

jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/customerOrders');
jest.mock('lib/apollo/hooks/state/clientSideState');

const mockedUseCustomerOrders = useCustomerOrders as jest.MockedFunction<typeof useCustomerOrders>;

describe('AdminOrdersPage', () => {
  const mockUseCustomerOrders = jest.fn(() => ({
    customerOrders: mockOrders,
    pageInfo: mockPageInfo,
    refetch: jest.fn(),
    fetchMore: jest.fn(),
    loading: false,
    loadingMore: false,
    error: undefined,
  }));
  mockedUseCustomerOrders.mockImplementation(mockUseCustomerOrders);

  const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUseRouter = jest.fn(() => mockUseRouterData);
  mockedUseRouter.mockImplementation(mockUseRouter);

  const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;
  mockedUseCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render correctly', async () => {
    // Act
    const searchQuery = 'searchString';

    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <AdminOrdersPage {...pageProps} query={{ searchQuery }} />
        )),
      ),
    );

    const adminDisputePage = screen.getByTestId('admin-orders-page');

    // Assert
    expect(adminDisputePage).toBeInTheDocument();
    expect(mockUseCustomerOrders).toHaveBeenCalledWith<Parameters<typeof useCustomerOrders>>({
      checkoutStatus: OrderCheckoutStatusEnum.Reserved,
      executionStatuses: [],
      reservationStatuses: [],
      first: 10,
      searchQuery,
    });
  });
});
