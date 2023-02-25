import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockProducts } from '__tests__/mocks/mockProducts';
import mockCompany from '__tests__/mocks/mockCompany';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import useRouter from 'hooks/useRouter';
import { useProducts } from 'lib/apollo/hooks/state/products';

import CompanyProducts from '.';

jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/products');

describe('CompanyProducts', () => {
  test('should call useProducts', async () => {
    // Arrange
    const mockQuery = { searchQuery: 'товар' };
    const mockUseProducts = jest.fn(() => ({
      loading: undefined,
      products: mockProducts,
      pageInfo: { endCursor: 'FF', hasNextPage: true },
      totalCount: 5,
    }));
    useProducts.mockImplementation(mockUseProducts);

    const mockUseRouter = jest.fn(() => mockUseRouterData);
    useRouter.mockImplementation(mockUseRouter);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(<CompanyProducts company={mockCompany} query={mockQuery} />),
      ),
    );
    const companyProductsTab = screen.getByTestId('company-products-tab');
    const sellableProductsCount = screen.getByTestId('sellable-products-count');

    // Assert
    expect(companyProductsTab).toBeInTheDocument();
    expect(sellableProductsCount).toHaveTextContent(
      `Количество товаров: ${mockCompany.sellableProductsCount}`,
    );
    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith({
        companyIds: mockCompany.id,
        searchQuery: mockQuery.searchQuery,
      });
    });
  });
});
