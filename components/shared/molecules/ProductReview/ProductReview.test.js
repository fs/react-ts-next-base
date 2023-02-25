import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import { mockProductReviews } from '__tests__/mocks/mockProductReviews';

import useNotifier from 'hooks/useNotifier';
import UpdateCustomerProductReview from 'graphql/mutations/updateCustomerProductReview.graphql';

import ProductReview from './ProductReview';

jest.mock('hooks/useNotifier');
describe('CompanyReview', () => {
  const mockSetError = jest.fn();
  const mockSetSuccess = jest.fn();
  const mockUseNotifier = jest.fn(() => ({
    setError: mockSetError,
    setSuccess: mockSetSuccess,
  }));
  useNotifier.mockImplementation(mockUseNotifier);

  test('should call useUpdateCustomerCompanyReview on submit', async () => {
    global.IS_REACT_ACT_ENVIRONMENT = false;
    // Arrange
    const mockReviewId = '1';
    const expectedText = 'updated comment';

    const data = {
      reviewId: mockReviewId,
      productBody: expectedText,
    };

    const mockResult = {
      id: mockReviewId,
      productBody: expectedText,
    };

    const mocks = [
      {
        request: {
          query: UpdateCustomerProductReview,
          variables: { input: data },
        },
        result: {
          data: { updateCustomerProductReview: mockResult },
        },
        newData: jest.fn(() => ({
          data: { updateCustomerProductReview: mockResult },
        })),
      },
    ];

    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          <MockedProvider mocks={mocks} addTypename={false}>
            <ProductReview editable review={mockProductReviews[0]} />
          </MockedProvider>,
        ),
      ),
    );
    const editButton = screen.getByTestId('edit-review-button');
    await user.click(editButton);

    // Act
    const reviewInput = screen.getByTestId('update-review-input');
    await user.clear(reviewInput);
    await user.type(reviewInput, expectedText);

    const submitButton = screen.getByTestId('submit-review-update');
    await user.click(submitButton);

    const reviewBody = await screen.findByTestId('review-body');

    // Assert
    expect(reviewBody).toBeInTheDocument();
    expect(mocks[0].newData).toHaveBeenCalled();
  });
});
