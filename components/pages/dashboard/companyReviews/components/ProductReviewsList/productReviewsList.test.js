import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useBuyerProductReviews, useSellerProductReviews } from 'lib/apollo/hooks/state/reviews';

import { mockProductReviews } from '__tests__/mocks/mockProductReviews';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import ProductReviewsList from '.';

jest.mock('lib/apollo/hooks/state/reviews');

describe('ProductReviewsList', () => {
  const companyId = 6;
  const sellerQuery = { sellerCompanyId: companyId, first: 12 };
  const buyerQuery = { buyerCompanyId: companyId, first: 12 };

  test('should be called useSellerProductReviews', async () => {
    // Arrange
    const mockUseSellerProductReviews = jest.fn(() => ({
      sellerProductReviews: mockProductReviews,
      pageInfo: mockPageInfo,
    }));
    useSellerProductReviews.mockImplementation(mockUseSellerProductReviews);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(<ProductReviewsList isSeller companyId={companyId} />),
      ),
    );
    const productReviewsListContent = screen.getByTestId('product-review-list');

    // Assert
    expect(productReviewsListContent).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseSellerProductReviews).toHaveBeenCalled();
      expect(mockUseSellerProductReviews).toHaveBeenCalledWith(sellerQuery);
    });
  });

  test('should be called useBuyerProductReviews', async () => {
    // Arrange
    const mockUseBuyerProductReviews = jest.fn(() => ({
      buyerProductReviews: mockProductReviews,
      pageInfo: mockPageInfo,
    }));
    useBuyerProductReviews.mockImplementation(mockUseBuyerProductReviews);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(<ProductReviewsList isSeller={false} companyId={companyId} />),
      ),
    );
    const productReviewsListContent = screen.getByTestId('product-review-list');

    // Assert
    expect(productReviewsListContent).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseBuyerProductReviews).toHaveBeenCalled();
      expect(mockUseBuyerProductReviews).toHaveBeenCalledWith(buyerQuery);
    });
  });
});
