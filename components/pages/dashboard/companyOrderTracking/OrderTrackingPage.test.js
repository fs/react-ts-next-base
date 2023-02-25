import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useCurrentUser from 'hooks/useCurrentUser';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrders } from 'lib/apollo/hooks/state/orders';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockOrders } from '__tests__/mocks/mockOrders';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';

import { PLACED } from 'config/constants/checkoutStatus';

import { OrderTrackingPage } from './OrderTrackingPage';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateProductPage', () => {
  const expectedCompanyId = '1';
  const expectedOrderId = '1';
  const query = { companyId: expectedCompanyId, orderId: expectedOrderId };

  const mockUseCurrentUser = jest.fn(() => ({
    user: mockCurrentUser,
  }));
  useCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockUseOrders = jest.fn(() => ({
    orders: mockOrders,
  }));
  useOrders.mockImplementation(mockUseOrders);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));
  useCompanySidebar.mockImplementation(jest.fn(() => mockUseCompanySidebarData));

  test('should render correctly', async () => {
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <OrderTrackingPage {...pageProps} query={query} />),
      ),
    );
    const orderTrackingPage = screen.getByTestId('order-tracking-page');

    // Assert
    expect(orderTrackingPage).toBeInTheDocument();
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
      myCompanies: mockMyCompanies,
      loading: true,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <OrderTrackingPage {...pageProps} query={query} />),
      ),
    );
    const loader = await screen.findByTestId('order-tracking-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
