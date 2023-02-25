import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { useCreateAdmin } from 'lib/apollo/hooks/actions/admin';

import { mockAdmins } from '__tests__/mocks/mockAdmins';

import CreateAdministrator from '.';

jest.mock('lib/apollo/hooks/actions/admin');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('AdminItem', () => {
  const mockCreateAdmin = jest.fn(() => Promise.resolve());
  const mockUseCreateAdmin = jest.fn(() => [mockCreateAdmin]);
  useCreateAdmin.mockImplementation(mockUseCreateAdmin);

  test('should call useCreateAdmin on create admin', async () => {
    // Arrange
    const mockAdmin = mockAdmins[1];
    const { lastName, firstName, middleName, email, phoneNumber } = mockAdmin;

    const expectedData = {
      lastName,
      firstName,
      middleName,
      email,
      phoneNumber,
    };

    // Act
    render(renderWithTheme(renderWithApolloClient(renderWithNiceModal(<CreateAdministrator />))));

    const lastNameField = screen.getByTestId('lastName');
    const firstNameField = screen.getByTestId('firstName');
    const middleNameField = screen.getByTestId('middleName');
    const emailNameField = screen.getByTestId('email');
    const phoneNumberNameField = screen.getByTestId('phoneNumber');

    fireEvent.change(lastNameField, { target: { value: lastName } });
    fireEvent.change(firstNameField, { target: { value: firstName } });
    fireEvent.change(middleNameField, { target: { value: middleName } });
    fireEvent.change(emailNameField, { target: { value: email } });
    fireEvent.change(phoneNumberNameField, { target: { value: phoneNumber } });

    const createAdminButton = screen.getByTestId('create-admin-submit-button');
    fireEvent.click(createAdminButton);

    // Assert
    expect(await screen.findByTestId('simple-modal-title')).toHaveTextContent('Приглашение админа');

    const createAdminModalSubmitButton = screen.getByTestId('confirm-modal-button');
    fireEvent.click(createAdminModalSubmitButton);

    // Assert
    await waitFor(() => {
      expect(mockCreateAdmin).toHaveBeenCalledWith(expectedData);
    });
  });
});
