import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useSignIn } from 'lib/apollo/hooks/actions/auth';
import SignInForm from './SignInForm';

jest.mock('lib/apollo/hooks/actions/auth');

const mockedUseSignIn = useSignIn as jest.Mock;

describe('SignInForm', () => {
  const mockSignIn = jest.fn();
  const mockUseSignIn = jest.fn(() => [mockSignIn]);

  beforeEach(() => {
    mockedUseSignIn.mockImplementation(mockUseSignIn);
  });

  test('should call SignIn fn after click "Submit" button', async () => {
    // Arrange
    const inputEmailValue = 'email@gmail.com';
    const inputPasswordValue = 'password';
    const expectedValue = {
      email: inputEmailValue,
      password: inputPasswordValue,
    };

    const user = userEvent.setup();
    render(renderWithTheme(<SignInForm />));

    const inputEmail = screen.getByTestId('input-email');
    const inputPassword = screen.getByTestId('input-password');

    await user.type(inputEmail, inputEmailValue);
    await user.type(inputPassword, inputPasswordValue);

    // Act
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(expectedValue);
    });
  });
});
