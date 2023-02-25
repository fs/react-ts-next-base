import React from 'react';
import { render, waitFor } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { TIMES_ORDERED } from 'config/constants/orders';

import { useProductRandomReview } from 'lib/apollo/hooks/state/products';
import { mockProductReviews } from '__tests__/mocks/mockProductReviews';

import Reviews from './Reviews';

jest.mock('lib/apollo/hooks/state/products.js');
describe('Reviews', () => {
  test('should call useProductRandomReview', async () => {
    // Arrange
    const mockUseBestReviews = jest.fn(() => ({
      loading: undefined,
      products: [{ randomReview: mockProductReviews[0] }],
    }));
    useProductRandomReview.mockImplementation(mockUseBestReviews);

    // Act
    render(renderWithTheme(renderWithApolloClient(<Reviews />)));

    // Assert
    await waitFor(() => {
      expect(mockUseBestReviews).toHaveBeenCalledWith({
        orderBy: TIMES_ORDERED,
        rating: 4,
        first: 5,
        reviewsPresence: true,
      });
    });
  });
});
