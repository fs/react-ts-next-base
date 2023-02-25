import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import mockUser from '__tests__/mocks/mockCurrentUser';
import { phoneFormatter } from 'helpers';

import { useUpdateAdminAccount } from 'lib/apollo/hooks/actions/admin';

import EditAdminInfo from '.';

jest.mock('lib/apollo/hooks/actions/admin');

describe('EditAdminInfo', () => {
  const mockUpdateAdminAccount = jest.fn();
  const mockUseUpdateAdminAccount = jest.fn(() => [mockUpdateAdminAccount]);
  useUpdateAdminAccount.mockImplementation(mockUseUpdateAdminAccount);

  test('should call updateAdmin on submit', async () => {
    // Arrange
    const expectedValue = {
      email: 'test@test.com',
      phoneNumber: '+71234567890',
      currentPassword: 'test',
    };

    // Act
    render(renderWithTheme(renderWithApolloClient(<EditAdminInfo user={mockUser} />)));
    const emailField = screen.getByTestId('email');
    const phoneNumberField = screen.getByTestId('phoneNumber');
    const currentPasswordField = screen.getByTestId('currentPassword');

    const editButton = screen.getByTestId('edit-profile-button');
    const submitButton = screen.getByTestId('submit-profile-button');

    fireEvent.click(editButton);

    fireEvent.change(emailField, { target: { value: expectedValue.email } });
    fireEvent.change(phoneNumberField, { target: { value: expectedValue.phoneNumber } });
    fireEvent.change(currentPasswordField, { target: { value: expectedValue.currentPassword } });

    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockUpdateAdminAccount).toHaveBeenCalledWith(expectedValue);
    });
  });

  test('button submit should be disabled', async () => {
    // Act
    render(renderWithTheme(renderWithApolloClient(<EditAdminInfo user={mockUser} />)));
    const editButton = screen.getByTestId('edit-profile-button');
    const submitButton = screen.getByTestId('submit-profile-button');

    // Assert
    expect(submitButton).toBeDisabled();

    fireEvent.click(editButton);

    // Assert
    expect(submitButton).toBeEnabled();
  });

  test('should show initial value', () => {
    // Arrange
    const { email, phoneNumber } = mockUser;

    // Act
    render(renderWithTheme(renderWithApolloClient(<EditAdminInfo user={mockUser} />)));
    const emailField = screen.getByTestId('email');
    const phoneNumberField = screen.getByTestId('phoneNumber');

    // Assert
    expect(emailField.value).toBe(email);
    expect(phoneNumberField.value).toBe(phoneFormatter(phoneNumber));
  });
});
