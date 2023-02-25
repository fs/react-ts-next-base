import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import useRouter from 'hooks/useRouter';
import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { AdminAnalyticalAccountPage } from './AdminAnalyticalAccountPage';

jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/customerOrders');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminAnalyticalAccountPage', () => {
  const mockQuery = { tab: 'operations', searchQuery: 'searchString' };

  const mockUseCustomerOrders = jest.fn(() => ({
    customerOrders: [],
    pageInfo: {},
  }));
  useCustomerOrders.mockImplementation(mockUseCustomerOrders);

  const mockUseRouter = jest.fn(() => ({ ...mockUseRouterData, query: mockQuery }));
  useRouter.mockImplementation(mockUseRouter);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render correctly', async () => {
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminAnalyticalAccountPage {...pageProps} />),
      ),
    );
    const adminAnalyticalAccountPage = screen.getByTestId('admin-analytical-acc-page');

    // Assert
    expect(adminAnalyticalAccountPage).toBeInTheDocument();
    expect(mockUseCustomerOrders).toHaveBeenCalledWith({
      checkoutStatus: 'PLACED',
      executionStatuses: ['PAYMENT_PENDING'],
      first: 12,
      searchQuery: mockQuery.searchQuery,
    });
  });
});
