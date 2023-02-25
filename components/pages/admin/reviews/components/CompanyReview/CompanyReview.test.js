import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useNotifier from 'hooks/useNotifier';
import UpdateCustomerCompanyReview from 'graphql/mutations/updateCustomerCompanyReview.graphql';

import { mockCompanyReviews } from '__tests__/mocks/mockCompanyReviews';
import { MockedProvider } from '@apollo/client/testing';
import CompanyReview from './CompanyReview';

jest.mock('hooks/useNotifier');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CompanyReview', () => {
  const mockSetError = jest.fn();
  const mockSetSuccess = jest.fn();
  const mockUseNotifier = jest.fn(() => ({
    setError: mockSetError,
    setSuccess: mockSetSuccess,
  }));
  useNotifier.mockImplementation(mockUseNotifier);

  test('should call useUpdateCustomerCompanyReview on submit', async () => {
    // Arrange
    const mockReviewId = '1';
    const expectedText = 'updated comment';

    const data = {
      reviewId: mockReviewId,
      companyBody: expectedText,
    };

    const mockResult = {
      id: mockReviewId,
      companyBody: expectedText,
    };

    const mocks = [
      {
        request: {
          query: UpdateCustomerCompanyReview,
          variables: { input: data },
        },
        result: {
          data: { updateCustomerCompanyReview: mockResult },
        },
        newData: jest.fn(() => ({
          data: { updateCustomerCompanyReview: mockResult },
        })),
      },
    ];

    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          <MockedProvider mocks={mocks} addTypename={false}>
            <CompanyReview review={mockCompanyReviews[0]} />
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
