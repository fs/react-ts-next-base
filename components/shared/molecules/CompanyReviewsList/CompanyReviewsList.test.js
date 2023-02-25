import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useBuyerCompanyReviews, useSellerCompanyReviews } from 'lib/apollo/hooks/state/reviews';

import { mockCompanyReviews } from '__tests__/mocks/mockCompanyReviews';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';

import CompanyReviewsList from '.';

jest.mock('lib/apollo/hooks/state/reviews');

describe('CompanyReviewsList', () => {
  const companyId = 6;
  const sellerQuery = { sellerCompanyId: companyId, first: 12 };
  const buyerQuery = { buyerCompanyId: companyId, first: 12 };

  test('should be called useSellerCompanyReviews', async () => {
    // Arrange
    const mockUseSellerCompanyReviews = jest.fn(() => ({
      sellerCompanyReviews: mockCompanyReviews,
      pageInfo: mockPageInfo,
    }));
    useSellerCompanyReviews.mockImplementation(mockUseSellerCompanyReviews);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(<CompanyReviewsList isSeller companyId={companyId} />),
      ),
    );
    const companyReviewsListContent = screen.getByTestId('company-review-list');

    // Assert
    expect(companyReviewsListContent).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseSellerCompanyReviews).toHaveBeenCalled();
      expect(mockUseSellerCompanyReviews).toHaveBeenCalledWith(sellerQuery);
    });
  });

  test('should be called useBuyerCompanyReviews', async () => {
    // Arrange
    const mockUseBuyerCompanyReviews = jest.fn(() => ({
      buyerCompanyReviews: mockCompanyReviews,
      pageInfo: mockPageInfo,
    }));
    useBuyerCompanyReviews.mockImplementation(mockUseBuyerCompanyReviews);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(<CompanyReviewsList isSeller={false} companyId={companyId} />),
      ),
    );
    const companyReviewsListContent = screen.getByTestId('company-review-list');

    // Assert
    expect(companyReviewsListContent).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseBuyerCompanyReviews).toHaveBeenCalled();
      expect(mockUseBuyerCompanyReviews).toHaveBeenCalledWith(buyerQuery);
    });
  });
});
