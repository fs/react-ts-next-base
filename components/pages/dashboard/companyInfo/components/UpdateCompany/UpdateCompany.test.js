import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { useUpdateCompanyData } from 'lib/apollo/hooks/actions/companies';
import { useCompanyLegalForms } from 'lib/apollo/hooks/state/legalForms';

import { phoneFormatter } from 'helpers';
import mockCompany, { mockLegalForms } from '__tests__/mocks/mockCompany';

import UpdateCompany from '.';

jest.mock('lib/apollo/hooks/actions/companies');
jest.mock('lib/apollo/hooks/state/legalForms');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CompanyInfo', () => {
  const {
    legalForm,
    taxationSystem,
    inn,
    officialName,
    unofficialName,
    directorFullName,
    legalAddress,
    postcode,
    kpp,
    ogrn,
    oktmo,
    bankName,
    checkingAccount,
    correspondentAccount,
    bic,
    email,
    phoneNumber,
    logoUrl,
    companyConfirmationRecords,
  } = mockCompany;

  const mockUseCompanyLegalForms = jest.fn(() => ({ legalForms: mockLegalForms }));
  useCompanyLegalForms.mockImplementation(mockUseCompanyLegalForms);

  const mockUpdateCompany = jest.fn();
  const mockUseUpdateCompanyData = jest.fn(() => [mockUpdateCompany]);
  useUpdateCompanyData.mockImplementation(mockUseUpdateCompanyData);

  test('should call useUpdateCompanyData on editing submit', async () => {
    // Arrange
    const expectedValues = {
      legalFormId: mockLegalForms.find(({ id }) => id === legalForm.id).id,
      taxationSystem,
      inn,
      officialName,
      unofficialName,
      directorFullName,
      legalAddress,
      postcode,
      kpp,
      ogrn,
      oktmo,
      bankName,
      checkingAccount,
      correspondentAccount,
      bic,
      email,
      phoneNumber: phoneFormatter(phoneNumber),
      logo: null,
      logoRemoteUrl: logoUrl,
      companyConfirmationRecords: companyConfirmationRecords.map(({ attachmentUrl }) => ({
        attachmentRemoteUrl: attachmentUrl,
      })),
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(renderWithNiceModal(<UpdateCompany company={mockCompany} />)),
      ),
    );
    const officialNameField = await screen.findByTestId('officialName');
    fireEvent.blur(officialNameField);

    const submitButton = await screen.findByTestId('submit-button');
    fireEvent.click(submitButton);

    await screen.findByTestId('confirm-modal-button');
    const submitModal = screen.getByTestId('confirm-modal-button');
    fireEvent.click(submitModal);

    // Assert
    await waitFor(() => {
      expect(mockUpdateCompany).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should show initial values', async () => {
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(renderWithNiceModal(<UpdateCompany company={mockCompany} />)),
      ),
    );
    const innField = await screen.findByTestId('inn');
    const officialNameField = screen.getByTestId('officialName');
    const unofficialNameField = screen.getByTestId('unofficialName');
    const directorFullNameField = screen.getByTestId('directorFullName');
    const legalAddressField = screen.getByTestId('legalAddress');
    const postcodeField = screen.getByTestId('postcode');
    const kppField = screen.getByTestId('kpp');
    const ogrnField = screen.getByTestId('ogrn');
    const oktmoField = screen.getByTestId('oktmo');
    const bankNameField = screen.getByTestId('bankName');
    const checkingAccountField = screen.getByTestId('checkingAccount');
    const correspondentAccountField = screen.getByTestId('correspondentAccount');
    const bicField = screen.getByTestId('bic');
    const emailField = screen.getByTestId('email');
    const phoneNumberField = screen.getByTestId('phoneNumber');

    // Assert
    expect(innField.value).toBe(inn);
    expect(officialNameField.value).toBe(officialName);
    expect(unofficialNameField.value).toBe(unofficialName);
    expect(directorFullNameField.value).toBe(directorFullName);
    expect(legalAddressField.value).toBe(legalAddress);
    expect(postcodeField.value).toBe(postcode);
    expect(kppField.value).toBe(kpp);
    expect(ogrnField.value).toBe(ogrn);
    expect(oktmoField.value).toBe(oktmo);
    expect(bankNameField.value).toBe(bankName);
    expect(checkingAccountField.value).toBe(checkingAccount);
    expect(correspondentAccountField.value).toBe(correspondentAccount);
    expect(bicField.value).toBe(bic);
    expect(emailField.value).toBe(email);
    expect(phoneNumberField.value).toBe(phoneFormatter(phoneNumber));
  });

  test('should reset form on cancel button click', async () => {
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(renderWithNiceModal(<UpdateCompany company={mockCompany} />)),
      ),
    );
    const innField = await screen.findByTestId('inn');
    const officialNameField = screen.getByTestId('officialName');
    const unofficialNameField = screen.getByTestId('unofficialName');
    const directorFullNameField = screen.getByTestId('directorFullName');
    const kppField = screen.getByTestId('kpp');

    fireEvent.change(innField, { target: { value: '' } });
    fireEvent.change(officialNameField, { target: { value: '' } });
    fireEvent.change(unofficialNameField, { target: { value: '' } });
    fireEvent.change(directorFullNameField, { target: { value: '' } });
    fireEvent.change(kppField, { target: { value: '' } });
    fireEvent.blur(kppField);

    const cancelButton = await screen.findByTestId('cancel-button');
    fireEvent.click(cancelButton);

    // Assert
    expect(innField.value).toBe(inn);
    expect(officialNameField.value).toBe(officialName);
    expect(unofficialNameField.value).toBe(unofficialName);
    expect(directorFullNameField.value).toBe(directorFullName);
    expect(kppField.value).toBe(kpp);
  });
});
