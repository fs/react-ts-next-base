import React from 'react';

import {
  screen,
  render,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';

import { useCreateCompany } from 'lib/apollo/hooks/actions/companies';
import { useCompanyLegalForms } from 'lib/apollo/hooks/state/legalForms';
import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useFileUpload } from 'hooks/useFileUpload';

import 'jest-styled-components';
import 'jest-canvas-mock';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockUploadFile } from '__tests__/mocks/mockUploadFile';
import mockCompany, {
  mockCompanyIndividualEntrepreneur,
  mockLegalForms,
} from '__tests__/mocks/mockCompany';
import mockPresignData from '__tests__/mocks/mockPresignData';
import { CompanyDirectionEnum } from 'graphql/types';

import { getTaxationSystem } from 'config/constants/taxationSystem';

import CreateCompanyForm from '.';

jest.mock('lib/apollo/hooks/actions/companies');
jest.mock('lib/apollo/hooks/state/legalForms');
jest.mock('lib/apollo/hooks/actions/presignFile');
jest.mock('hooks/useFileUpload');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateCompanyForm', () => {
  const mockUseCompanylegalForms = jest.fn(() => ({ legalForms: mockLegalForms }));
  useCompanyLegalForms.mockImplementation(mockUseCompanylegalForms);

  const mockCreateCompany = jest.fn();
  const mockUseCreateCompany = jest.fn(() => [mockCreateCompany]);
  useCreateCompany.mockImplementation(mockUseCreateCompany);

  const mockPresignFile = jest.fn(() => mockPresignData);
  usePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));
  const mockUploadSecondFile = { ...mockUploadFile, id: 'second_id.png' };
  const mockUploadThirdFile = { ...mockUploadFile, id: 'third_id.png' };
  const mockFileUpload = jest
    .fn()
    .mockReturnValueOnce(mockUploadFile)
    .mockReturnValueOnce(mockUploadSecondFile)
    .mockReturnValueOnce(mockUploadThirdFile);
  useFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

  const mockPhoto = new File(['image-example'], 'image-example.png', { type: 'image/png' });
  const mockVideo = new File(['video-example'], 'video-example.mp4', { type: 'video/mp4' });

  describe('fill create company form with individual entrepreneur legal form', () => {
    test('should disable KPP input if legal form is Individual entrepreneur', async () => {
      // Arrange
      const { legalForm } = mockCompanyIndividualEntrepreneur;

      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <CreateCompanyForm isFirst direction={CompanyDirectionEnum.Seller} />,
            ),
          ),
        ),
      );

      const kppField = screen.getByTestId('kpp');
      const legalFormField = screen.getByText('Выбрать организационно-правовую форму');

      // Act
      await selectEvent.select(legalFormField, legalForm.name);

      // Assert
      expect(kppField).toBeDisabled();
    });
  });

  describe('create company', () => {
    const {
      taxationSystem,
      legalForm,
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
    } = mockCompany;

    test('should call сreateCompany on submit', async () => {
      // Arrange
      const expectedPresignFileValues = {
        filename: 'image-example.png',
        type: 'image/png',
        size: 180000,
      };
      const expectedValues = {
        bankName,
        bic,
        checkingAccount,
        correspondentAccount,
        directorFullName,
        email,
        inn,
        kpp,
        legalAddress,
        legalFormId: legalForm.id,
        officialName,
        ogrn,
        oktmo,
        phoneNumber,
        postcode,
        taxationSystem,
        unofficialName,
        logo: mockUploadFile,
        companyConfirmationRecords: [
          { attachment: mockUploadSecondFile },
          { attachment: mockUploadThirdFile },
        ],
        direction: CompanyDirectionEnum.Seller,
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            renderWithNiceModal(
              <CreateCompanyForm isFirst direction={CompanyDirectionEnum.Seller} />,
            ),
          ),
        ),
      );

      const innField = screen.getByTestId('inn');
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
      const logoField = screen.getByTestId('logo-company-modal-button');
      const contractField = screen.getByTestId('contract');
      const agreementField = screen.getByTestId('agreement');
      const companyConfirmationRecordsField = screen.getByTestId(
        'add-files-modal--companyConfirmationRecords',
      );

      // Act
      await selectEvent.select(
        screen.getByText('Выбрать организационно-правовую форму'),
        legalForm.name,
      );
      await selectEvent.select(
        screen.getByText('Выбрать систему налогообложения'),
        getTaxationSystem(taxationSystem),
      );
      const user = userEvent.setup();
      await user.type(innField, inn);
      await user.type(officialNameField, officialName);
      await user.type(unofficialNameField, unofficialName);
      await user.type(directorFullNameField, directorFullName);
      await user.type(legalAddressField, legalAddress);
      await user.type(postcodeField, postcode);
      await user.type(kppField, kpp);
      await user.type(ogrnField, ogrn);
      await user.type(oktmoField, oktmo);
      await user.type(bankNameField, bankName);
      await user.type(checkingAccountField, checkingAccount);
      await user.type(correspondentAccountField, correspondentAccount);
      await user.type(bicField, bic);
      await user.type(emailField, email);
      fireEvent.change(phoneNumberField, { target: { value: phoneNumber } });
      await user.click(contractField);
      await user.click(agreementField);
      await user.click(logoField);
      await user.upload(screen.getByTestId('load-avatar-input'), mockPhoto);
      const cropImageButton = await screen.findByTestId('crop-image-button');
      await user.click(cropImageButton);

      await waitForElementToBeRemoved(cropImageButton);

      // at least one photo and one video
      await user.click(companyConfirmationRecordsField);
      await user.upload(
        screen.getByTestId('load-photo-input--add-files-modal--companyConfirmationRecords'),
        mockPhoto,
      );
      const submitSelectedFilesButton = await screen.findByTestId(
        'add-photo-submit-button--add-files-modal--companyConfirmationRecords',
      );
      await user
        .setup({ applyAccept: false })
        .upload(
          screen.getByTestId('load-photo-input--add-files-modal--companyConfirmationRecords'),
          mockVideo,
        );
      await user.click(submitSelectedFilesButton);
      await waitForElementToBeRemoved(submitSelectedFilesButton);

      await user.click(screen.getByTestId('create-company-submit-button'));

      // Assert
      expect(mockUseCreateCompany).toHaveBeenCalled();

      await waitFor(() => {
        expect(mockPresignFile).toHaveBeenCalledWith(expectedPresignFileValues);
        expect(mockFileUpload).toHaveBeenCalled();
        expect(mockCreateCompany).toHaveBeenCalledWith(expectedValues);
        expect(mockUseCompanylegalForms).toHaveBeenCalled();
      });
    });
  });
});
