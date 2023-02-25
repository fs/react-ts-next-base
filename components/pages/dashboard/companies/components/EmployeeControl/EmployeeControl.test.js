import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useMyEmployees } from 'lib/apollo/hooks/state/myEmployees';

import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockMyEmployees } from '__tests__/mocks/mockMyEmployees';

import useNotifier from 'hooks/useNotifier';
import {
  useCreateCompanyMember,
  useDestroyCompanyMember,
  useUpdateCompanyMember,
} from 'lib/apollo/hooks/actions/companyMember';

import EmployeeControl from './EmployeeControl';

jest.mock('hooks/useNotifier');
jest.mock('lib/apollo/hooks/actions/companyMember');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/myEmployees');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('EmployeeControl', () => {
  const mockUseMyEmployees = jest.fn(() => ({
    myEmployees: mockMyEmployees,
    loading: undefined,
  }));
  useMyEmployees.mockImplementation(mockUseMyEmployees);

  const mockUseMyCompanies = jest.fn(() => ({
    myCompanies: mockMyCompanies,
    loading: undefined,
  }));
  useMyCompanies.mockImplementation(mockUseMyCompanies);

  const mockDestroyMutation = jest.fn().mockResolvedValue(undefined);
  useDestroyCompanyMember.mockImplementation(() => [mockDestroyMutation]);

  const mockUpdateCompanyMember = jest.fn();
  const mockUseUpdateCompanyMember = jest.fn(() => [mockUpdateCompanyMember]);
  useUpdateCompanyMember.mockImplementation(mockUseUpdateCompanyMember);

  const mockCreateCompanyMember = jest.fn();
  const mockUseCreateCompanyMember = jest.fn(() => [mockCreateCompanyMember]);
  useCreateCompanyMember.mockImplementation(mockUseCreateCompanyMember);

  useNotifier.mockImplementation(
    jest.fn(() => ({
      setSuccess: jest.fn(),
      setError: jest.fn(),
    })),
  );

  test('should open AddUserModal by click', async () => {
    // Arrange
    const user = userEvent.setup();
    render(renderWithTheme(renderWithApolloClient(renderWithNiceModal(<EmployeeControl />))));

    // Act
    const addMemberButton = screen.getByTestId('add-company-member-button');
    await user.click(addMemberButton);

    // Assert
    expect(screen.getByTestId('member-modal-title')).toBeInTheDocument();
  });

  test('should call createCompanyMember on submit & show confirm modal', async () => {
    // Arrange
    const expectedValues = {
      email: 'example@gmail.com',
      companyIds: ['1'],
    };

    const user = userEvent.setup();
    render(renderWithTheme(renderWithApolloClient(renderWithNiceModal(<EmployeeControl />))));

    // Act
    const addMemberButton = screen.getByTestId('add-company-member-button');
    await user.click(addMemberButton);

    const emailInput = screen.getByTestId('email');
    const emailInputConfirm = screen.getByTestId('confirmEmail');
    const checkbox = screen.getByTestId(`company-${expectedValues.companyIds[0]}`);

    await user.type(emailInput, expectedValues.email);
    await user.type(emailInputConfirm, expectedValues.email);
    await user.click(checkbox);
    await user.click(screen.getByTestId('add-user-submit-button'));

    // Assert
    await waitFor(() => {
      expect(mockCreateCompanyMember).toHaveBeenCalledWith(expectedValues);
      expect(screen.getByTestId('accept-modal-title')).toBeInTheDocument();
    });
  });

  test('should open EditUserModal by click', async () => {
    // Arrange
    const user = userEvent.setup();
    render(renderWithTheme(renderWithApolloClient(renderWithNiceModal(<EmployeeControl />))));

    // Act
    const editMemberButton = screen.getByTestId('edit-company-member-button');
    await user.click(editMemberButton);

    // Assert
    expect(screen.getByTestId('edit-member-modal-title')).toBeInTheDocument();
  });

  test('should open DeleteModal by click', async () => {
    // Arrange
    const user = userEvent.setup();
    render(renderWithTheme(renderWithApolloClient(renderWithNiceModal(<EmployeeControl />))));

    // Act
    const editMemberButton = screen.getByTestId('edit-company-member-button');
    await user.click(editMemberButton);
    const deleteMemberButton = screen.getByTestId(`delete-${mockMyEmployees[0].id}`);
    await user.click(deleteMemberButton);

    // Assert
    expect(screen.getByTestId('simple-modal-title')).toBeInTheDocument();
  });

  test('should call destroyMember mutation on delete user', async () => {
    // Arrange
    const expectedId = mockMyEmployees[0].id;

    const user = userEvent.setup();
    render(renderWithTheme(renderWithApolloClient(renderWithNiceModal(<EmployeeControl />))));

    // Act
    const editMemberButton = screen.getByTestId('edit-company-member-button');
    await user.click(editMemberButton);
    const deleteMemberButton = screen.getByTestId(`delete-${expectedId}`);
    await user.click(deleteMemberButton);

    const confirmDestroyMemberButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmDestroyMemberButton);

    // Assert
    await waitFor(() => {
      expect(mockDestroyMutation).toHaveBeenCalled();
    });
  });

  test('should open EditMemberAccess by click', async () => {
    // Arrange
    const user = userEvent.setup();
    render(renderWithTheme(renderWithApolloClient(renderWithNiceModal(<EmployeeControl />))));

    // Act
    const editMemberButton = screen.getByTestId('edit-company-member-button');
    await user.click(editMemberButton);
    const editMemberAccessButton = screen.getByTestId(`edit-${mockMyEmployees[0].id}`);
    await user.click(editMemberAccessButton);

    // Assert
    expect(screen.getByTestId('member-modal-title')).toBeInTheDocument();
  });

  test('should call updateCompanyMember on submit', async () => {
    // Arrange
    const member = mockMyEmployees[0];

    const expectedValues = {
      userId: member.id,
      companyIds: member.companyMembers.map(({ company }) => company.id),
    };

    const user = userEvent.setup();
    render(renderWithTheme(renderWithApolloClient(renderWithNiceModal(<EmployeeControl />))));

    // Act
    const editMemberButton = screen.getByTestId('edit-company-member-button');
    await user.click(editMemberButton);
    const editMemberAccessButton = screen.getByTestId(`edit-${mockMyEmployees[0].id}`);
    await user.click(editMemberAccessButton);

    await user.click(screen.getByTestId('add-user-submit-button'));

    // Assert
    await waitFor(() => {
      expect(mockUpdateCompanyMember).toHaveBeenCalledWith(expectedValues);
    });
  });
});
