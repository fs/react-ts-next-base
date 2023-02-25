import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import mockUser from '__tests__/mocks/mockCurrentUser';

import { useUpdateUser } from 'lib/apollo/hooks/actions/currentUser';
import useNotifier from 'hooks/useNotifier';

import EditName from '.';

jest.mock('hooks/useNotifier');
jest.mock('lib/apollo/hooks/actions/currentUser');

describe('EditName', () => {
  const setSuccess = jest.fn();
  const setError = jest.fn();
  const mockUseNotifier = jest.fn(() => {
    return { setError, setSuccess };
  });

  useNotifier.mockImplementation(mockUseNotifier);

  const mockUpdateUser = jest.fn();
  const mockUseUpdateUser = jest.fn(() => [mockUpdateUser]);

  useUpdateUser.mockImplementation(mockUseUpdateUser);

  test('should call updateUser on submit', async () => {
    // Arrange
    render(renderWithTheme(renderWithApolloClient(<EditName user={mockUser} />)));

    const lastNameInput = screen.getByTestId('lastName');
    const firstNameInput = screen.getByTestId('firstName');
    const middleNameInput = screen.getByTestId('middleName');
    const submitButton = screen.getByTestId('submit-profile-button');

    // Act
    fireEvent.change(lastNameInput, { target: { value: 'Examplov' } });
    fireEvent.change(firstNameInput, { target: { value: 'Example' } });
    fireEvent.change(middleNameInput, { target: { value: 'Examplovich' } });

    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        firstName: 'Example',
        lastName: 'Examplov',
        middleName: 'Examplovich',
      });
    });
  });
});
