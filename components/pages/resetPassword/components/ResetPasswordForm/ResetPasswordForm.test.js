import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { usePasswordRecovery } from 'lib/apollo/hooks/actions/auth';
import useNotifier from 'hooks/useNotifier';

import ResetPasswordForm from '.';

jest.mock('lib/apollo/hooks/actions/auth');
jest.mock('hooks/useNotifier');

describe('ResetPasswordForm', () => {
  const mockSetError = jest.fn();
  const mockSetSuccess = jest.fn();
  const mockUseNotifier = jest.fn(() => ({
    setError: mockSetError,
    setSuccess: mockSetSuccess,
  }));
  useNotifier.mockImplementation(mockUseNotifier);

  const expectedDetailedMessage =
    'Инструкции по восстановлению пароля были высланы, если аккаунт существует.';
  const mockRecoverPassword = jest.fn(() => Promise.resolve());
  const mockUsePasswordRecovery = jest.fn(() => [mockRecoverPassword, expectedDetailedMessage]);
  usePasswordRecovery.mockImplementation(mockUsePasswordRecovery);

  test('should call passwordRecovery mutation on submit', async () => {
    // Arrange
    const expectedEmail = 'test@test.com';
    render(renderWithTheme(<ResetPasswordForm />));
    const emailField = screen.getByTestId('email');
    const form = screen.getByTestId('submit-button');

    fireEvent.change(emailField, { target: { value: expectedEmail } });

    // Act
    fireEvent.click(form);

    // Assert
    await waitFor(() => {
      expect(mockRecoverPassword).toHaveBeenCalledWith({ email: expectedEmail });
      expect(mockSetSuccess).toHaveBeenCalledWith(expectedDetailedMessage);
    });
  });
});
