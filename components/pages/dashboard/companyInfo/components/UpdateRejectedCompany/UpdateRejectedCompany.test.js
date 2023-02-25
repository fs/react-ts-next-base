import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { useUpdateRejectedCompany } from 'lib/apollo/hooks/actions/companies';
import { useCompanyLegalForms } from 'lib/apollo/hooks/state/legalForms';

import mockCompany, { mockLegalForms } from '__tests__/mocks/mockCompany';

import { REJECTED } from 'config/constants/status';
import UpdateRejectedCompany from '.';

jest.mock('lib/apollo/hooks/actions/companies');
jest.mock('lib/apollo/hooks/state/legalForms');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CompanyInfo', () => {
  const mockRejectedCompany = {
    ...mockCompany,
    status: REJECTED,
    rejectedFields: [
      { name: 'INN', comment: 'wrong inn' },
      { name: 'OFFICIAL_NAME', comment: 'wrong officialName' },
      { name: 'UNOFFICIAL_NAME', comment: 'wrong unofficialName' },
      { name: 'DIRECTOR_FULL_NAME', comment: 'wrong directorFullName' },
      { name: 'KPP', comment: 'wrong kpp' },
    ],
  };

  const mockUseCompanyLegalForms = jest.fn(() => ({ legalForms: mockLegalForms }));
  useCompanyLegalForms.mockImplementation(mockUseCompanyLegalForms);

  const mockUpdateRejectedCompany = jest.fn();
  const mockUseUpdateRejectedCompany = jest.fn(() => [mockUpdateRejectedCompany]);
  useUpdateRejectedCompany.mockImplementation(mockUseUpdateRejectedCompany);

  test('should call useUpdateRejectedCompanyData on editing submit', async () => {
    // Arrange
    const expectedInn = '1234567999';
    const expectedOfficialName = 'official name';
    const expectedUnofficialName = 'unofficial name';
    const expectedDirectorFullName = 'current fullName';
    const expectedKpp = '123456799';
    const expectedValues = {
      inn: expectedInn,
      officialName: expectedOfficialName,
      unofficialName: expectedUnofficialName,
      directorFullName: expectedDirectorFullName,
      kpp: expectedKpp,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<UpdateRejectedCompany company={mockRejectedCompany} />),
        ),
      ),
    );
    const innField = screen.getByTestId('inn');
    const officialNameField = screen.getByTestId('officialName');
    const unofficialNameField = screen.getByTestId('unofficialName');
    const directorFullNameField = screen.getByTestId('directorFullName');
    const kppField = screen.getByTestId('kpp');

    fireEvent.change(innField, { target: { value: expectedInn } });
    fireEvent.change(officialNameField, { target: { value: expectedOfficialName } });
    fireEvent.change(unofficialNameField, { target: { value: expectedUnofficialName } });
    fireEvent.change(directorFullNameField, { target: { value: expectedDirectorFullName } });
    fireEvent.change(kppField, { target: { value: expectedKpp } });
    fireEvent.blur(kppField);

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeEnabled();
    fireEvent.click(submitButton);

    await screen.findByTestId('confirm-modal-button');
    const submitModal = screen.getByTestId('confirm-modal-button');
    fireEvent.click(submitModal);

    // Assert
    await waitFor(() => {
      expect(mockUpdateRejectedCompany).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('not rejected fields should be disabled', () => {
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<UpdateRejectedCompany company={mockRejectedCompany} />),
        ),
      ),
    );
    const legalAddressField = screen.getByTestId('legalAddress');
    const postcodeField = screen.getByTestId('postcode');
    const ogrnField = screen.getByTestId('ogrn');
    const oktmoField = screen.getByTestId('oktmo');
    const bankNameField = screen.getByTestId('bankName');
    const checkingAccountField = screen.getByTestId('checkingAccount');
    const correspondentAccountField = screen.getByTestId('correspondentAccount');
    const bicField = screen.getByTestId('bic');
    const emailField = screen.getByTestId('email');
    const phoneNumberField = screen.getByTestId('phoneNumber');

    // Assert
    expect(legalAddressField).toBeDisabled();
    expect(postcodeField).toBeDisabled();
    expect(ogrnField).toBeDisabled();
    expect(oktmoField).toBeDisabled();
    expect(bankNameField).toBeDisabled();
    expect(checkingAccountField).toBeDisabled();
    expect(correspondentAccountField).toBeDisabled();
    expect(bicField).toBeDisabled();
    expect(emailField).toBeDisabled();
    expect(phoneNumberField).toBeDisabled();
  });
});
