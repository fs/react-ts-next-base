import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import { useUpdateUserPassword } from 'lib/apollo/hooks/actions/currentUser';
import useNotifier from 'hooks/useNotifier';

import EditPassword from '.';

jest.mock('hooks/useNotifier');
jest.mock('lib/apollo/hooks/actions/currentUser');
describe('EditPassword', () => {
  const setSuccess = jest.fn();
  const setError = jest.fn();
  const mockUseNotifier = jest.fn(() => {
    return { setError, setSuccess };
  });

  useNotifier.mockImplementation(mockUseNotifier);

  const mockUpdatePassword = jest.fn();
  const mockUseUpdatePassword = jest.fn(() => [mockUpdatePassword]);

  useUpdateUserPassword.mockImplementation(mockUseUpdatePassword);

  test('should call updatePassword on submit', async () => {
    // Arrange
    render(renderWithTheme(renderWithApolloClient(<EditPassword />)));

    const currentPasswordInput = screen.getByTestId('currentPassword');
    const newPasswordInput = screen.getByTestId('newPassword');
    const newPasswordConfirmInput = screen.getByTestId('newPasswordConfirm');
    const submitButton = screen.getByTestId('submit-button');

    // Act
    fireEvent.change(currentPasswordInput, { target: { value: 'Test123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'Example123' } });
    fireEvent.change(newPasswordConfirmInput, { target: { value: 'Example123' } });

    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith({
        currentPassword: 'Test123',
        password: 'Example123',
      });
    });
  });
});
