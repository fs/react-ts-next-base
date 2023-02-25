import React from 'react';
import { render, screen } from '@testing-library/react';

import useRouter from 'hooks/useRouter';
import { StatusEnum } from 'graphql/types';
import { TPageProps } from 'lib/apollo/types';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';
import { useCustomerProducts } from 'lib/apollo/hooks/state/customerProducts';

import { mockProducts } from '__tests__/mocks/mockProducts';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { AdminPriorityProductsPage } from './AdminPriorityProductsPage';

jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/customerProducts');
jest.mock('lib/apollo/hooks/state/clientSideState');

const mockedUseCustomerProducts = useCustomerProducts as jest.MockedFunction<
  typeof useCustomerProducts
>;

describe('AdminPriorityProductsPage', () => {
  const mockUseCustomeProducts = jest.fn(() => ({
    customerProducts: mockProducts,
    pageInfo: mockPageInfo,
    fetchMore: jest.fn(),
    loading: false,
    loadingMore: false,
    error: undefined,
  }));
  mockedUseCustomerProducts.mockImplementation(mockUseCustomeProducts);

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
          <AdminPriorityProductsPage {...pageProps} query={{ searchQuery }} />
        )),
      ),
    );

    const adminPriorityProductsPage = screen.getByTestId('admin-priority-products-page');

    // Assert
    expect(adminPriorityProductsPage).toBeInTheDocument();
    expect(mockUseCustomeProducts).toHaveBeenCalledWith<Parameters<typeof useCustomerProducts>>({
      searchQuery,
      first: 12,
      statuses: [StatusEnum.Verified, StatusEnum.OutOfStock],
      deleted: false,
      draft: false,
      template: false,
    });
  });
});
