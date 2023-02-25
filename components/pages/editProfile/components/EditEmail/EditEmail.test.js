import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import 'jest-styled-components';
import { useUpdateUserEmail } from 'lib/apollo/hooks/actions/currentUser';
import useNotifier from 'hooks/useNotifier';

import EditEmail from '.';

jest.mock('lib/apollo/hooks/actions/currentUser');
jest.mock('hooks/useNotifier');

describe('EditEmail', () => {
  const mockCurrentEmail = 'current_email@test.com';
  const expectedEmail = 'new_email@test.com';
  const expectedPassword = 'current_password';

  const mockSetError = jest.fn();
  const mockUseNotifier = jest.fn(() => ({
    setError: mockSetError,
  }));
  useNotifier.mockImplementation(mockUseNotifier);

  const mockUpdateUserEmail = jest.fn();
  useUpdateUserEmail.mockImplementation(jest.fn(() => [mockUpdateUserEmail]));

  test('should call useUpdateUserEmail on submit', async () => {
    // Arrange
    const expectedValue = {
      currentPassword: expectedPassword,
      email: expectedEmail,
      emailMailingEnabled: true,
      emailNotificationsDisabled: true,
    };

    // Act
    render(renderWithTheme(renderWithApolloClient(<EditEmail email={mockCurrentEmail} />)));
    const emailField = screen.getByTestId('email');
    const passwordField = screen.getByTestId('email-password');
    const notificationsField = screen.getByTestId('email-notifications');
    const mailingField = screen.getByTestId('email-mailing');
    const buttonSubmit = screen.getByTestId('submit-button');

    fireEvent.change(emailField, { target: { value: expectedEmail } });
    fireEvent.change(passwordField, { target: { value: expectedPassword } });
    fireEvent.click(notificationsField);
    fireEvent.click(mailingField);

    fireEvent.click(buttonSubmit);

    // Assert
    await waitFor(() => {
      expect(mockUpdateUserEmail).toHaveBeenCalledWith(expectedValue);
    });
  });

  test('button submit should be disabled', () => {
    // Act
    render(renderWithTheme(renderWithApolloClient(<EditEmail email={mockCurrentEmail} />)));
    const buttonSubmit = screen.getByTestId('submit-button');

    // Assert
    expect(buttonSubmit).toBeDisabled();
  });
});
