import React from 'react';

import { screen, render, waitFor, fireEvent } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useJoinUser } from 'lib/apollo/hooks/actions/joinUser';
import { useSendSmsCode } from 'lib/apollo/hooks/actions/auth';
import useNotifier from 'hooks/useNotifier';

import JoinUserFormContent from './JoinUserFormContent';

jest.mock('lib/apollo/hooks/actions/joinUser');
jest.mock('lib/apollo/hooks/actions/auth');
jest.mock('hooks/useNotifier');

describe('JoinUserFormContent', () => {
  const mockUseNotifier = jest.fn(() => ({
    setError: jest.fn(),
  }));
  useNotifier.mockImplementation(mockUseNotifier);

  test('should call joinUser on submit', async () => {
    // Arrange
    const firstName = 'Имя';
    const lastName = 'Фамилия';
    const middleName = 'Отчество';
    const phoneNumber = '81971234567';
    const smsCode = '11111';

    const expectedValues = {
      firstName,
      lastName,
      middleName,
      phoneNumber,
      smsCode,
    };

    const mockJoinUser = jest.fn();
    const mockUseJoinUser = jest.fn(() => [mockJoinUser]);
    useJoinUser.mockImplementation(mockUseJoinUser);

    const mockSendSmsCode = jest.fn();
    const mockUseSendSmsCode = jest.fn(() => [mockSendSmsCode]);
    useSendSmsCode.mockImplementation(mockUseSendSmsCode);

    render(renderWithTheme(renderWithApolloClient(<JoinUserFormContent />)));

    const firstNameField = screen.getByTestId('firstName');
    const lastNameField = screen.getByTestId('lastName');
    const middleNameField = screen.getByTestId('middleName');
    const phoneNumberField = screen.getByTestId('phoneNumber');
    const agreementField = screen.getByTestId('agreement');
    const submitButton = screen.getByTestId('submit-button');

    // Act
    fireEvent.change(firstNameField, { target: { value: firstName } });
    fireEvent.change(lastNameField, { target: { value: lastName } });
    fireEvent.change(phoneNumberField, { target: { value: phoneNumber } });
    fireEvent.change(middleNameField, { target: { value: middleName } });

    const phoneVerificationButton = screen.getByTestId('phoneVerification');
    fireEvent.click(phoneVerificationButton);

    const smsCodeField = await screen.findByTestId('codeInput');

    fireEvent.change(smsCodeField, { target: { value: smsCode } });

    fireEvent.click(agreementField);

    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockJoinUser).toHaveBeenCalledWith(expectedValues);
    });
  });
});
