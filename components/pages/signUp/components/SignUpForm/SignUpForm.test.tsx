import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useSignUp } from 'lib/apollo/hooks/actions/auth';

import SignUpForm from './SignUpForm';

jest.mock('lib/apollo/hooks/actions/auth');

const mockedUseSignUp = useSignUp as jest.Mock;

describe('SignInForm', () => {
  const mockSignUp = jest.fn();
  const mockUseSignUp = jest.fn(() => [mockSignUp]);

  beforeEach(() => {
    mockedUseSignUp.mockImplementation(mockUseSignUp);
  });

  test('should call SignIn fn after click "Submit" button', async () => {
    // Arrange
    const inputFirstNameValue = 'Name';
    const inputLastNameValue = 'LastName';
    const inputEmailValue = 'email@gmail.com';
    const inputPasswordValue = 'Password1';
    const expectedValue = {
      email: inputEmailValue,
      firstName: inputFirstNameValue,
      lastName: inputLastNameValue,
      password: inputPasswordValue,
    };

    const user = userEvent.setup();
    render(renderWithTheme(<SignUpForm />));

    const inputFirstName = screen.getByTestId('input-firstName');
    const inputLastName = screen.getByTestId('input-lastName');
    const inputEmail = screen.getByTestId('input-email');
    const inputPassword = screen.getByTestId('input-password');

    await user.type(inputFirstName, inputFirstNameValue);
    await user.type(inputLastName, inputLastNameValue);
    await user.type(inputEmail, inputEmailValue);
    await user.type(inputPassword, inputPasswordValue);

    // Act
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(expectedValue);
    });
  });
});
