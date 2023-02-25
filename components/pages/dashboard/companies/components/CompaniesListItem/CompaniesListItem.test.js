import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useAccount } from 'lib/apollo/hooks/state/account';

import mockCompany from '__tests__/mocks/mockCompany';
import { mockAccount } from '__tests__/mocks/mockAccount';

import CompaniesListItem from '.';

jest.mock('lib/apollo/hooks/state/account');

describe('CompaniesListItem', () => {
  const mockUseAccount = jest.fn(() => ({ account: mockAccount }));
  useAccount.mockImplementation(mockUseAccount);

  test('should show company info', () => {
    // Arrange
    const {
      legalForm: { shortName },
      officialName,
      unofficialName,
    } = mockCompany;
    const expectedOfficialName = `${shortName} “${officialName}”`;
    const expectedUnofficialName = unofficialName;

    // Act
    render(renderWithTheme(renderWithApolloClient(<CompaniesListItem company={mockCompany} />)));
    const officialNameField = screen.getByTestId('official-company-name');
    const unofficialNameField = screen.getByTestId('unofficial-company-name');

    // Assert
    expect(officialNameField).toHaveTextContent(expectedOfficialName);
    expect(unofficialNameField).toHaveTextContent(expectedUnofficialName);
  });

  test('should render correctly', async () => {
    // Arrange
    const { id: companyId } = mockCompany;

    // Act
    render(renderWithTheme(renderWithApolloClient(<CompaniesListItem company={mockCompany} />)));

    // Assert
    await waitFor(() => {
      expect(mockUseAccount).toHaveBeenCalledWith({ companyId });
    });
  });
});
