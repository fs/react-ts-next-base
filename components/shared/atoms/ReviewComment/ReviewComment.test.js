import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import ReviewComment from './ReviewComment';

describe('ReviewComment', () => {
  const mockAction = jest.fn();
  const mockReviewBody = 'test';

  test('should open form on edit button click', async () => {
    global.IS_REACT_ACT_ENVIRONMENT = false;
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          <ReviewComment reviewBody={mockReviewBody} updateReview={mockAction} editable />,
        ),
      ),
    );
    const editButton = screen.getByTestId('edit-review-button');

    // Act
    await user.click(editButton);
    const editForm = screen.getByTestId('edit-review-form');

    // Assert
    expect(editForm).toBeInTheDocument();
  });

  test('should revert changes on reset click', async () => {
    global.IS_REACT_ACT_ENVIRONMENT = false;
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          <ReviewComment reviewBody={mockReviewBody} updateReview={mockAction} editable />,
        ),
      ),
    );

    const editButton = screen.getByTestId('edit-review-button');
    await user.click(editButton);

    const reviewInput = screen.getByTestId('update-review-input');
    await user.type(reviewInput, 'new text');

    const resetButton = screen.getByTestId('close-review-update');

    // Act
    user.click(resetButton);
    const reviewBody = await screen.findByTestId('review-body');

    // Assert
    expect(reviewBody).toBeInTheDocument();
    expect(reviewBody).toHaveTextContent(mockReviewBody);
  });

  test('should not show edit button', () => {
    render(
      renderWithApolloClient(
        renderWithTheme(<ReviewComment reviewBody={mockReviewBody} updateReview={mockAction} />),
      ),
    );

    // Act
    const editButton = screen.queryByTestId('edit-review-button');

    // Assert
    expect(editButton).not.toBeInTheDocument();
  });
});
