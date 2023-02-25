import React from 'react';
import { render, screen } from '@testing-library/react';

import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';
import { useDisputeProposals } from 'lib/apollo/hooks/state/disputeProposals';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockOrders } from '__tests__/mocks/mockOrders';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import { DisputeStatusEnum, OrderCheckoutStatusEnum } from 'graphql/types';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import { TPageProps } from 'lib/apollo/types';

import { AdminDisputePage } from './AdminDisputePage';

jest.mock('lib/apollo/hooks/state/customerOrders');
jest.mock('lib/apollo/hooks/state/disputeProposals');
jest.mock('lib/apollo/hooks/state/clientSideState');

const mockedUseCustomerOrders = useCustomerOrders as jest.MockedFunction<typeof useCustomerOrders>;
const mockedUseDisputeProposals = useDisputeProposals as jest.MockedFunction<
  typeof useDisputeProposals
>;

describe('AdminDisputePage', () => {
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

  const mockUseDisputeProposals = jest.fn(() => ({
    disputeProposals: [],
    pageInfo: mockPageInfo,
    fetchMore: jest.fn(),
    loading: false,
    loadingMore: false,
    error: undefined,
  }));
  mockedUseDisputeProposals.mockImplementation(mockUseDisputeProposals);

  const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;
  mockedUseCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render correctly', async () => {
    // Arrange
    const mockQuery = { orderId: '1' };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <AdminDisputePage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const adminDisputePage = screen.getByTestId('admin-dispute-page');

    // Assert
    expect(adminDisputePage).toBeInTheDocument();
    expect(mockUseCustomerOrders).toHaveBeenCalledWith<Parameters<typeof useCustomerOrders>>({
      checkoutStatus: OrderCheckoutStatusEnum.Placed,
      disputeStatuses: Object.values(DisputeStatusEnum),
      ids: [mockQuery.orderId],
    });
  });
});
