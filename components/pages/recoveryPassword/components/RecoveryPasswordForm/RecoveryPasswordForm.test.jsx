import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import usePasswordRecovery from 'lib/apollo/hooks/actions/usePasswordRecovery';

import RecoveryPasswordForm from './RecoveryPasswordForm';

jest.mock('lib/apollo/hooks/actions/usePasswordRecovery');

describe('RecoveryPasswordForm', () => {
  let recoveryPassword;
  let detailMessage;
  let loading;

  beforeEach(() => {
    recoveryPassword = jest.fn();
    detailMessage = '';
    loading = false;
    usePasswordRecovery.mockImplementation(() => [recoveryPassword, detailMessage, loading]);
  });

  test('should call RecoveryPassword fn after click "Submit" button', async () => {
    // Arrange
    const inputEmailValue = 'email@gmail.com';

    // Act
    render(renderWithTheme(<RecoveryPasswordForm />));

    const inputEmail = screen.getByTestId('input-email');
    fireEvent.change(inputEmail, { target: { value: inputEmailValue } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(recoveryPassword).toHaveBeenCalled();
    });
  });

  test('should show loader if is loading', () => {
    // Arrange
    detailMessage = undefined;
    loading = true;

    usePasswordRecovery.mockImplementation(() => [recoveryPassword, detailMessage, loading]);
    render(renderWithTheme(<RecoveryPasswordForm />));

    const inputEmailValue = 'email@gmail.com';

    const inputEmail = screen.getByTestId('input-email');

    // Act
    fireEvent.change(inputEmail, { target: { value: inputEmailValue } });
    fireEvent.click(screen.getByTestId('submit-button'));

    // Assert
    expect(screen.getByTestId('recovery-password-loader')).toBeInTheDocument();
  });
});