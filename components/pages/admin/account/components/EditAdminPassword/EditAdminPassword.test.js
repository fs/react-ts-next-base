import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useUpdateUserPassword } from 'lib/apollo/hooks/actions/currentUser';

import EditAdminPassword from '.';

jest.mock('lib/apollo/hooks/actions/currentUser');

describe('EditAdminPassword', () => {
  const mockUpdateUserPassword = jest.fn();
  const mockUseUpdateUserPassword = jest.fn(() => [mockUpdateUserPassword]);
  useUpdateUserPassword.mockImplementation(mockUseUpdateUserPassword);

  test('should call updateUserPassword on submit', async () => {
    // Arrange
    const expectedValue = {
      currentPassword: 'expectedPassword123',
      password: 'expectedNewPassword123',
    };

    // Act
    render(renderWithTheme(renderWithApolloClient(<EditAdminPassword />)));
    const prevPasswordField = screen.getByTestId('prevPassword');
    const newPasswordField = screen.getByTestId('newPassword');
    const newPasswordConfirmField = screen.getByTestId('newPasswordConfirm');

    const editButton = screen.getByTestId('edit-profile-button');
    const submitButton = screen.getByTestId('submit-profile-button');

    fireEvent.click(editButton);

    fireEvent.change(prevPasswordField, { target: { value: expectedValue.currentPassword } });
    fireEvent.change(newPasswordField, { target: { value: expectedValue.password } });
    fireEvent.change(newPasswordConfirmField, { target: { value: expectedValue.password } });

    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockUpdateUserPassword).toHaveBeenCalledWith(expectedValue);
    });
  });

  test('button submit should be disabled', async () => {
    // Act
    render(renderWithTheme(renderWithApolloClient(<EditAdminPassword />)));
    const editButton = screen.getByTestId('edit-profile-button');
    const submitButton = screen.getByTestId('submit-profile-button');

    // Assert
    expect(submitButton).toBeDisabled();

    fireEvent.click(editButton);

    // Assert
    expect(submitButton).toBeEnabled();
  });
});
