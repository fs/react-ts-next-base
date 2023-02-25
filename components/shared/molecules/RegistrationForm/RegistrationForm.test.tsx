import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import RegistrationForm from './RegistrationForm';

describe('RegistrationForm', () => {
  test('if checkboxes is unchecked button should be disabled', async () => {
    // Arrange
    const mockAction = () => {};
    const mockCheckboxes = [
      {
        name: 'test',
        label: <> test </>,
      },
    ];

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <RegistrationForm action={mockAction} checkboxes={mockCheckboxes} />,
        ),
      ),
    );
    const submitButton = screen.getByTestId('submit-button');

    // Assert
    await waitFor(() => expect(submitButton).toBeDisabled());
  });
});
