import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { useCity } from 'lib/apollo/hooks/state/clientSideState';
import { useOrderSellers } from 'lib/apollo/hooks/state/orderSellers';
import { useOrdersSummary, useOrders } from 'lib/apollo/hooks/state/orders';
import useCurrentUser from 'hooks/useCurrentUser';
import useRouter from 'hooks/useRouter';

import {
  mockUseCurrentUserGuestData,
  mockUseCurrentUserRegisteredData,
} from '__tests__/mocks/mockCurrentUser';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import { mockOrders } from '__tests__/mocks/mockOrders';

import { TPageProps } from 'lib/apollo/types';
import { CartPage } from './CartPage';

jest.mock('lib/apollo/hooks/state/orderSellers');
jest.mock('lib/apollo/hooks/state/clientSideState');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('hooks/useCurrentUser');
jest.mock('hooks/useRouter');

const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;
const mockedUseOrdersSummary = useOrdersSummary as jest.MockedFunction<typeof useOrdersSummary>;
const mockedUseOrderSellers = useOrderSellers as jest.MockedFunction<typeof useOrderSellers>;
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedUseOrders = useOrders as jest.MockedFunction<typeof useOrders>;
const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;

describe('CartPage', () => {
  const mockUseRouter = jest.fn(() => ({
    ...mockUseRouterData,
    query: { sellerId: mockMyCompanies[0].id },
  }));
  mockedUseRouter.mockImplementation(mockUseRouter);

  const mockUserOrdersSummary = jest.fn(() => ({
    totalCount: 0,
    refetch: jest.fn(),
    loading: false,
    error: undefined,
  }));
  mockedUseOrdersSummary.mockImplementation(mockUserOrdersSummary);

  const mockUseOrderSellers = jest.fn(() => ({
    orderSellers: mockMyCompanies,
    loading: false,
    error: undefined,
    refetch: jest.fn(),
  }));
  mockedUseOrderSellers.mockImplementation(mockUseOrderSellers);

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

  mockedUseCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render users cart correctly', async () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <CartPage {...pageProps} />),
      ),
    );
    const companiesList = screen.getAllByTestId('user-cart-company-item');

    // Assert
    expect(companiesList).toHaveLength(2);
    companiesList.forEach((el, index) => {
      expect(el).toHaveTextContent(mockMyCompanies[index].unofficialName);
    });
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => ({
      ...mockUseCurrentUserRegisteredData,
      loading: true,
    }));
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <CartPage {...pageProps} />),
      ),
    );
    const loader = screen.getByTestId('cart-page-loader');

    // Assert
    await waitFor(() => expect(loader).toBeInTheDocument());
  });

  test('should show guest cart for guest users', () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserGuestData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithNiceModal(
          renderWithApolloClient((pageProps: TPageProps) => <CartPage {...pageProps} />),
        ),
      ),
    );
    const guestCartContainer = screen.getByTestId('guest-cart-page-container');

    // Assert
    expect(guestCartContainer).toBeInTheDocument();
  });
});
