import React from 'react';
import { render, screen } from '@testing-library/react';

import { mockProducts } from '__tests__/mocks/mockProducts';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import { mockUseCurrentUserRegisteredData } from '__tests__/mocks/mockCurrentUser';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import useCurrentUser from 'hooks/useCurrentUser';
import { useFavoriteProducts } from 'lib/apollo/hooks/state/favoriteProducts';
import { useOrdersSummary } from 'lib/apollo/hooks/state/orders';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';
import { TPageProps } from 'lib/apollo/types';

import { FavoriteProductsPage } from './FavoriteProductsPage';

jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/favoriteProducts');
jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/clientSideState');

const mockedUseFavoriteProducts = useFavoriteProducts as jest.MockedFunction<
  typeof useFavoriteProducts
>;
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;
const mockedUseOrdersSummary = useOrdersSummary as jest.MockedFunction<typeof useOrdersSummary>;
const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;

describe('FavoriteProductsPage', () => {
  const mockUserOrdersSummary = jest.fn(() => ({
    totalCount: 0,
    refetch: jest.fn(),
    loading: false,
    error: undefined,
  }));
  mockedUseOrdersSummary.mockImplementation(mockUserOrdersSummary);

  const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
  mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  mockedUseRouter.mockImplementation(mockUseRouter);

  const mockUseCity = jest.fn(() => ({
    city: '',
    setCity: () => {},
    isFirstCheck: true,
  }));
  mockedUseCity.mockImplementation(mockUseCity);

  test('should render correctly', async () => {
    // Arrange
    const mockUseFavoriteProducts = jest.fn(() => ({
      favoriteProducts: mockProducts,
      pageInfo: { hasNextPage: false, endCursor: null },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseFavoriteProducts.mockImplementation(mockUseFavoriteProducts);

    const searchQuery = 'searchString';

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <FavoriteProductsPage {...pageProps} query={{ searchQuery }} />
        )),
      ),
    );

    const favoriteProductsPage = screen.getByTestId('favorite-products-page');
    const productsList = screen.getAllByTestId('product-card-container');

    // Assert
    expect(favoriteProductsPage).toBeInTheDocument();
    expect(productsList).toHaveLength(mockProducts.length);
    expect(mockUseFavoriteProducts).toHaveBeenCalledWith<Parameters<typeof useFavoriteProducts>>({
      first: 12,
      searchQuery,
    });
  });

  test('should show empty message for non existed', async () => {
    // Arrange
    const mockUseFavoriteProducts = jest.fn(() => ({
      favoriteProducts: [],
      pageInfo: { hasNextPage: false, endCursor: null },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseFavoriteProducts.mockImplementation(mockUseFavoriteProducts);

    const expectedMessage = 'У вас еще нет избранных товаров';

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <FavoriteProductsPage {...pageProps} />),
      ),
    );
    const emptyMessageTitle = screen.getByTestId('empty-message-title');

    // Assert
    expect(emptyMessageTitle).toHaveTextContent(expectedMessage);
    expect(mockUseFavoriteProducts).toHaveBeenCalledWith<Parameters<typeof useFavoriteProducts>>({
      first: 12,
      searchQuery: null,
    });
  });

  test('should show empty message for not found by searchQuery', async () => {
    // Arrange
    const mockUseFavoriteProducts = jest.fn(() => ({
      favoriteProducts: [],
      pageInfo: { hasNextPage: false, endCursor: null },
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      loading: false,
      loadingMore: false,
      error: undefined,
    }));
    mockedUseFavoriteProducts.mockImplementation(mockUseFavoriteProducts);

    const mockQuery = {
      searchQuery: 'search_query',
    };
    const expectedMessage = 'По вашему запросу ничего не найдено';

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => (
          <FavoriteProductsPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const emptyMessageTitle = screen.getByTestId('empty-message-title');

    // Assert
    expect(emptyMessageTitle).toHaveTextContent(expectedMessage);
    expect(mockUseFavoriteProducts).toHaveBeenCalledWith<Parameters<typeof useFavoriteProducts>>({
      first: 12,
      searchQuery: mockQuery.searchQuery,
    });
  });
});
