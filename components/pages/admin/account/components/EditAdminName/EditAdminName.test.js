import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import mockUser from '__tests__/mocks/mockCurrentUser';

import { useUpdateUser } from 'lib/apollo/hooks/actions/currentUser';

import EditAdminName from '.';

jest.mock('lib/apollo/hooks/actions/currentUser');

describe('EditAdminName', () => {
  const mockUpdateUser = jest.fn();
  const mockUseUpdateUser = jest.fn(() => [mockUpdateUser]);

  useUpdateUser.mockImplementation(mockUseUpdateUser);

  test('should call updateUser on submit', async () => {
    // Arrange
    const expectedValue = {
      lastName: 'expectedLastName',
      firstName: 'expectedFirstName',
      middleName: 'expectedMiddleName',
    };

    // Act
    render(renderWithTheme(renderWithApolloClient(<EditAdminName user={mockUser} />)));
    const lastNameField = screen.getByTestId('lastName');
    const firstNameField = screen.getByTestId('firstName');
    const middleNameField = screen.getByTestId('middleName');

    const editButton = screen.getByTestId('edit-profile-button');
    const submitButton = screen.getByTestId('submit-profile-button');

    fireEvent.click(editButton);

    fireEvent.change(lastNameField, { target: { value: expectedValue.lastName } });
    fireEvent.change(firstNameField, { target: { value: expectedValue.firstName } });
    fireEvent.change(middleNameField, { target: { value: expectedValue.middleName } });

    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith(expectedValue);
    });
  });

  test('button submit should be disabled', async () => {
    // Act
    render(renderWithTheme(renderWithApolloClient(<EditAdminName user={mockUser} />)));
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
    const { lastName, firstName, middleName } = mockUser;

    // Act
    render(renderWithTheme(renderWithApolloClient(<EditAdminName user={mockUser} />)));
    const lastNameField = screen.getByTestId('lastName');
    const firstNameField = screen.getByTestId('firstName');
    const middleNameField = screen.getByTestId('middleName');

    // Assert
    expect(lastNameField.value).toBe(lastName);
    expect(firstNameField.value).toBe(firstName);
    expect(middleNameField.value).toBe(middleName);
  });
});
