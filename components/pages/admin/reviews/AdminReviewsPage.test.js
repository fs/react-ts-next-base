import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import { useCompaniesReviews, useProductsReviews } from 'lib/apollo/hooks/state/reviews';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import { mockProductReviews } from '__tests__/mocks/mockProductReviews';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import { mockCompaniesReviews } from '__tests__/mocks/mockCompaniesReviews';

import { CompanyReviewOrderEnum } from 'graphql/types';
import { REVIEW_TYPE } from './constants';
import { AdminReviewsPage } from './AdminReviewsPage';

jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/reviews');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminReviewsPage', () => {
  const mockUseProductsReviews = jest.fn(() => ({
    reviews: mockProductReviews,
    loading: undefined,
    pageInfo: mockPageInfo,
  }));
  useProductsReviews.mockImplementation(mockUseProductsReviews);

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);

  const mockUseCompaniesReviews = jest.fn(() => ({
    reviews: mockCompaniesReviews,
    loading: undefined,
    pageInfo: mockPageInfo,
  }));
  useCompaniesReviews.mockImplementation(mockUseCompaniesReviews);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should call useCompaniesReview as default', async () => {
    // Arrange
    const mockSearchQuery = 'test';
    const mockQuery = {
      searchQuery: mockSearchQuery,
    };
    const expectedParams = {
      companyName: mockSearchQuery,
      first: 12,
      orderBy: CompanyReviewOrderEnum.CreatedAtAsc,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminReviewsPage {...pageProps} query={mockQuery} />),
      ),
    );
    const reviews = screen.getAllByTestId('company-review-item');

    // Assert
    await waitFor(() => {
      expect(mockUseCompaniesReviews).toHaveBeenCalledWith(expectedParams);
      expect(reviews.length).toBe(mockCompaniesReviews.length);
    });
  });

  test('should call useProductsReviews', async () => {
    // Arrange
    const mockSearchQuery = 'test';
    const mockQuery = {
      searchQuery: mockSearchQuery,
      tab: REVIEW_TYPE.PRODUCT,
    };
    const expectedParams = {
      searchQuery: mockSearchQuery,
      first: 12,
      orderBy: CompanyReviewOrderEnum.CreatedAtAsc,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminReviewsPage {...pageProps} query={mockQuery} />),
      ),
    );
    const reviews = screen.getAllByTestId('product-review-item');

    // Assert
    await waitFor(() => {
      expect(mockUseProductsReviews).toHaveBeenCalledWith(expectedParams);
      expect(reviews.length).toBe(mockProductReviews.length);
    });
  });
});
