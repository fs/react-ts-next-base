import React from 'react';

import { render, screen } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockOrder, mockOrders } from '__tests__/mocks/mockOrders';

import { DisputeStatusEnum } from 'graphql/types';
import { TPageProps } from 'lib/apollo/types';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';
import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';

import { AdminCreateDisputeProposalPage } from './AdminCreateDisputeProposalPage';

jest.mock('lib/apollo/hooks/state/customerOrders');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminCreateDisputeProposalPage', () => {
  const mockOrderId = mockOrder.id;
  const mockQuery = { orderId: mockOrderId };
  const customerOrderData = {
    customerOrders: mockOrders,
    pageInfo: mockPageInfo,
    refetch: jest.fn(),
    fetchMore: jest.fn(),
    loading: false,
    loadingMore: false,
    error: undefined,
  };

  const mockedUseCustomerOrders = useCustomerOrders as jest.MockedFunction<
    typeof useCustomerOrders
  >;
  const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;
  mockedUseCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should show loading on load', () => {
    // Arrange
    const mockUseCustomerOrders = jest.fn(() => ({ ...customerOrderData, loading: true }));
    mockedUseCustomerOrders.mockImplementation(mockUseCustomerOrders);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <AdminCreateDisputeProposalPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const loader = screen.getByTestId('admin-create-proposal-page-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });

  test('should render correctly', () => {
    // Arrange
    const mockUseCustomerOrders = jest.fn(() => customerOrderData);
    mockedUseCustomerOrders.mockImplementation(mockUseCustomerOrders);
    const expectedData = {
      ids: [mockOrderId],
      disputeStatuses: [DisputeStatusEnum.MedagregatorIntervened],
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <AdminCreateDisputeProposalPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const createDisputeForm = screen.getByTestId('create-dispute-proposal-form');

    // Assert
    expect(mockUseCustomerOrders).toHaveBeenCalledWith(expectedData);
    expect(createDisputeForm).toBeInTheDocument();
  });

  test('should render error page', () => {
    // Arrange
    const mockUseCustomerOrders = jest.fn(() => ({ ...customerOrderData, customerOrders: [] }));
    mockedUseCustomerOrders.mockImplementation(mockUseCustomerOrders);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <AdminCreateDisputeProposalPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const errorPage = screen.getByTestId('error-page');
    // Assert
    expect(errorPage).toBeInTheDocument();
  });
});
