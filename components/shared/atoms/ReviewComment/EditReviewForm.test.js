import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import EditReviewForm from './EditReviewForm';

describe('EditReviewForm', () => {
  const mockAction = jest.fn();
  const mockCloseForm = jest.fn();
  const mockReviewBody = 'mock review';

  test('should have right initial values', () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(
          <EditReviewForm
            reviewBody={mockReviewBody}
            action={mockAction}
            closeForm={mockCloseForm}
          />,
        ),
      ),
    );

    // Act

    const reviewInput = screen.getByTestId('update-review-input');

    // Assert
    expect(reviewInput).toHaveTextContent(mockReviewBody);
  });

  test('should call action on submit', async () => {
    global.IS_REACT_ACT_ENVIRONMENT = false;
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          <EditReviewForm
            reviewBody={mockReviewBody}
            action={mockAction}
            closeForm={mockCloseForm}
          />,
        ),
      ),
    );

    const submitButton = screen.getByTestId('submit-review-update');

    // Act
    await user.click(submitButton);

    // Assert
    expect(mockAction).toHaveBeenCalledWith(mockReviewBody);
  });

  test('should call action closeForm on close button click', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          <EditReviewForm
            reviewBody={mockReviewBody}
            action={mockAction}
            closeForm={mockCloseForm}
          />,
        ),
      ),
    );

    const resetButton = screen.getByTestId('close-review-update');

    // Act
    await user.click(resetButton);

    // Assert
    expect(mockCloseForm).toHaveBeenCalled();
  });
});
