import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import {
  useAddCompanyToBlackList,
  useBanCompany,
  useRemoveCompanyFromBlacklist,
  useUnbanCompany,
  useUpdateCompanyLogo,
} from 'lib/apollo/hooks/actions/companies';

import { BANNED, BLACKLISTED, DELETED_BY_CLIENT } from 'config/constants/status';
import mockCompany from '__tests__/mocks/mockCompany';

import CompanyInfo from '.';

jest.mock('lib/apollo/hooks/actions/companies');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CompanyInfo', () => {
  const mockAddCompanyToBlackList = jest.fn();
  const mockUseAddCompanyToBlackList = jest.fn(() => [mockAddCompanyToBlackList]);
  useAddCompanyToBlackList.mockImplementation(mockUseAddCompanyToBlackList);

  const mockRemoveCompanyFromBlacklist = jest.fn();
  const mockUseRemoveCompanyFromBlacklist = jest.fn(() => [mockRemoveCompanyFromBlacklist]);
  useRemoveCompanyFromBlacklist.mockImplementation(mockUseRemoveCompanyFromBlacklist);

  const mockBanCompany = jest.fn();
  const mockUseBanCompany = jest.fn(() => [mockBanCompany]);
  useBanCompany.mockImplementation(mockUseBanCompany);

  const mockUnbanCompany = jest.fn();
  const mockUseUnbanCompany = jest.fn(() => [mockUnbanCompany]);
  useUnbanCompany.mockImplementation(mockUseUnbanCompany);

  const mockUpdateCompanyLogo = jest.fn();
  const mockUseUpdateCompanyLogo = jest.fn(() => [mockUpdateCompanyLogo]);
  useUpdateCompanyLogo.mockImplementation(mockUseUpdateCompanyLogo);

  const { id: companyId, unofficialName } = mockCompany;

  test('should call addCompanyToBlackList on submit', async () => {
    // Arrange
    const expectedValues = {
      companyId,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(renderWithNiceModal(<CompanyInfo company={mockCompany} />)),
      ),
    );
    const submitButton = screen.getByTestId('add-to-black-list-button');
    expect(submitButton).toHaveTextContent('Добавить в черный список');
    await user.click(submitButton);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    expect(mockUseAddCompanyToBlackList).toHaveBeenCalledWith({
      companyName: unofficialName,
      onSubmit: expect.any(Function),
    });
    await waitFor(() => {
      expect(mockAddCompanyToBlackList).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should call banCompany on submit', async () => {
    // Arrange
    const expectedReason = 'expected reason';
    const expectedValues = {
      companyId,
      deletionMessage: expectedReason,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(renderWithNiceModal(<CompanyInfo company={mockCompany} />)),
      ),
    );
    const submitButton = screen.getByTestId('ban-company-button');
    expect(submitButton).toHaveTextContent('Заблокировать');
    await user.click(submitButton);

    const reasonInput = screen.getByTestId('reason');
    await user.type(reasonInput, expectedReason);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    expect(mockUseBanCompany).toHaveBeenCalledWith({
      companyName: unofficialName,
      onSubmit: expect.any(Function),
    });
    await waitFor(() => {
      expect(mockBanCompany).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should call removeCompanyFromBlacklist on submit for company in blacklist', async () => {
    // Arrange
    const mockBlacklistedCompany = { ...mockCompany, status: BLACKLISTED };
    const expectedValues = {
      companyId,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<CompanyInfo company={mockBlacklistedCompany} />),
        ),
      ),
    );
    const submitButton = screen.getByTestId('remove-from-black-list-button');
    expect(submitButton).toHaveTextContent('Удалить из черного списка');
    await user.click(submitButton);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    expect(mockUseRemoveCompanyFromBlacklist).toHaveBeenCalledWith({
      companyName: unofficialName,
      onSubmit: expect.any(Function),
    });
    await waitFor(() => {
      expect(mockRemoveCompanyFromBlacklist).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should call unbanCompany on submit for banned company', async () => {
    // Arrange
    const mockBannedCompany = { ...mockCompany, deletionReason: BANNED };
    const expectedValues = {
      companyId,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(renderWithNiceModal(<CompanyInfo company={mockBannedCompany} />)),
      ),
    );
    const submitButton = screen.getByTestId('unban-company-button');
    expect(submitButton).toHaveTextContent('Разблокировать');
    await user.click(submitButton);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    expect(mockUseUnbanCompany).toHaveBeenCalledWith({
      onSubmit: expect.any(Function),
    });
    await waitFor(() => {
      expect(mockUnbanCompany).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should call unbanCompany on submit for deleted by client company', async () => {
    // Arrange
    const mockDeletedCompany = { ...mockCompany, deletionReason: DELETED_BY_CLIENT };
    const expectedValues = {
      companyId,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(renderWithNiceModal(<CompanyInfo company={mockDeletedCompany} />)),
      ),
    );
    const submitButton = screen.getByTestId('restore-company-button');
    expect(submitButton).toHaveTextContent('Восстановить');
    await user.click(submitButton);

    const confirmModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    expect(mockUseUnbanCompany).toHaveBeenCalledWith({
      onSubmit: expect.any(Function),
    });
    await waitFor(() => {
      expect(mockUnbanCompany).toHaveBeenCalledWith(expectedValues);
    });
  });
});
