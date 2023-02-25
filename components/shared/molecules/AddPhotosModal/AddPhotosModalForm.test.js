import React from 'react';

import { screen, render, fireEvent } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import AddPhotosModalForm from './AddPhotosModalForm';

describe('AddPhotosModalForm', () => {
  const mockTemporaryUrl = [{ id: '1', url: 'url' }];
  const mockOnClose = jest.fn();

  test('should call onClose', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(
          <AddPhotosModalForm
            temporaryUrl={mockTemporaryUrl}
            setIsOpen={mockOnClose}
            loading={false}
            testId="test"
          />,
        ),
      ),
    );

    // Act
    const submitButton = screen.getByTestId('add-photo-submit-button--test');
    fireEvent.click(submitButton);

    // Assert
    expect(submitButton).toHaveTextContent('Подтвердить');
    expect(mockOnClose).toHaveBeenCalledWith(false);
  });
});
