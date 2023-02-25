import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import 'jest-styled-components';
import { useUpdateUserPhone } from 'lib/apollo/hooks/actions/currentUser';
import { useSendSmsCode } from 'lib/apollo/hooks/actions/auth';
import useNotifier from 'hooks/useNotifier';

import EditPhoneNumber from '.';

jest.mock('lib/apollo/hooks/actions/currentUser');
jest.mock('lib/apollo/hooks/actions/auth');
jest.mock('hooks/useNotifier');

describe('EditPhoneNumber', () => {
  const mockCurrentPhoneNumber = '81234567890';
  const expectedPhoneNumber = '80987654321';
  const expectedPassword = 'current_password';
  const expectedSmsCode = '123321';

  const mockSetError = jest.fn();
  const mockUseNotifier = jest.fn(() => ({
    setError: mockSetError,
  }));
  useNotifier.mockImplementation(mockUseNotifier);

  const mockUpdateUserPhone = jest.fn();
  useUpdateUserPhone.mockImplementation(jest.fn(() => [mockUpdateUserPhone]));
  const mockSendSmsCode = jest.fn();
  useSendSmsCode.mockImplementation(jest.fn(() => [mockSendSmsCode]));

  test('should call useUpdateUserPhone on submit', async () => {
    // Arrange
    const expectedValue = {
      currentPassword: expectedPassword,
      phoneNumber: expectedPhoneNumber,
      smsCode: expectedSmsCode,
      phoneMailingEnabled: true,
      phoneNotificationsDisabled: true,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(<EditPhoneNumber phoneNumber={mockCurrentPhoneNumber} />),
      ),
    );
    const phoneNumberField = screen.getByTestId('phoneNumber');
    const passwordField = screen.getByTestId('phoneNumber-password');
    const smsCodeField = screen.getByTestId('verification-code-input');
    const notificationsField = screen.getByTestId('phoneNumber-notifications');
    const mailingField = screen.getByTestId('phoneNumber-mailing');
    const verificationButton = screen.getByTestId('verification-button');
    const buttonSubmit = screen.getByTestId('submit-button');

    fireEvent.change(phoneNumberField, { target: { value: expectedPhoneNumber } });
    fireEvent.change(passwordField, { target: { value: expectedPassword } });
    fireEvent.click(verificationButton);
    fireEvent.change(smsCodeField, { target: { value: expectedSmsCode } });
    fireEvent.click(notificationsField);
    fireEvent.click(mailingField);

    fireEvent.click(buttonSubmit);

    // Assert
    await waitFor(() => {
      expect(mockUpdateUserPhone).toHaveBeenCalledWith(expectedValue);
      expect(mockSendSmsCode).toHaveBeenCalledWith(expectedPhoneNumber);
    });
  });

  test('button submit should be disabled', () => {
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(<EditPhoneNumber phoneNumber={mockCurrentPhoneNumber} />),
      ),
    );
    const buttonSubmit = screen.getByTestId('submit-button');

    // Assert
    expect(buttonSubmit).toBeDisabled();
  });
});
