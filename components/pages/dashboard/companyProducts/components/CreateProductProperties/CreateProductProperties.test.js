import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { useSubmitProductPropertiesStep } from 'lib/apollo/hooks/actions/product';
import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useFileUpload } from 'hooks/useFileUpload';
import useNotifier from 'hooks/useNotifier';
import { useProperties } from 'lib/apollo/hooks/state/properties';
import { useDictionaryPropertyOptions } from 'lib/apollo/hooks/state/dictionaryPropertyOptions';

import { mockUploadFile } from '__tests__/mocks/mockUploadFile';
import { mockProductBasic, mockProductProperties } from '__tests__/mocks/mockProduct';
import { mockProperties } from '__tests__/mocks/mockProperties';
import { mockDictionaryPropertyOptions } from '__tests__/mocks/mockDictionaryPropertyOptions';
import { mockCategories } from '__tests__/mocks/mockCategories';
import mockPresignData from '__tests__/mocks/mockPresignData';

import { ADDRESS } from 'config/constants/createProductSteps';

import { VariantUnitKindEnum } from 'graphql/types';
import CreateProductProperties from '.';

jest.mock('lib/apollo/hooks/actions/product');
jest.mock('lib/apollo/hooks/state/properties');
jest.mock('lib/apollo/hooks/state/dictionaryPropertyOptions');
jest.mock('hooks/useNotifier');
jest.mock('lib/apollo/hooks/actions/presignFile');
jest.mock('hooks/useFileUpload');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateProductProperties', () => {
  const mockOnSubmitStep = jest.fn();

  const mockUseProperties = jest.fn(() => ({ properties: mockProperties }));
  useProperties.mockImplementation(mockUseProperties);

  const mockUseDictionaryPropertyOptions = jest.fn(() => ({
    dictionaryPropertyOptions: mockDictionaryPropertyOptions,
  }));
  useDictionaryPropertyOptions.mockImplementation(mockUseDictionaryPropertyOptions);

  const mockSubmitProductPropertiesStep = jest.fn(() => mockProductProperties);
  const mockUseSubmitProductPropertiesStep = jest.fn(() => [mockSubmitProductPropertiesStep]);
  useSubmitProductPropertiesStep.mockImplementation(mockUseSubmitProductPropertiesStep);

  const mockSetSuccess = jest.fn();
  const mockSetError = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setSuccess: mockSetSuccess,
      setError: mockSetError,
    })),
  );
  const mockPresignFile = jest.fn(() => mockPresignData);
  usePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));
  const mockFileUpload = jest.fn(() => mockUploadFile);
  useFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

  test('should call submitProductPropertiesStep on submit', async () => {
    // Arrange
    const expectedPropertiesValue = { categoryIds: mockCategories[0].id };
    const expectedPropertyOptionsValue = { propertyId: '1' };

    const mockPhoto = new File(['photo'], 'photo.png', { type: 'image/png' });
    const mockDocument = new File(['photo'], 'photo.png', { type: 'image/png' });
    const expectedUploadedFile = {
      id: 'c6b449a46d5448f6fe37c97cc5ed0c14.png',
      metadata: {
        filename: 'file.png',
        mimeType: 'image/png',
        size: 36875,
      },
      storage: 'cache',
    };

    const expectedValue = {
      productId: mockProductBasic.id,
      variants: [
        {
          variantPhotos: [{ image: expectedUploadedFile }],
          variantCertificates: [{ attachment: expectedUploadedFile }],
          variantInstructions: [],
          variantProperties: [
            {
              propertyId: mockProperties[0].id,
              dictionaryPropertyOptionId: mockDictionaryPropertyOptions[0].id,
            },
          ],
          expirationDate: null,
          unitKind: VariantUnitKindEnum.Item,
          unitQuantity: null,
          unitQuantityKind: null,
        },
      ],
    };

    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateProductProperties product={mockProductBasic} onSubmitStep={mockOnSubmitStep} />,
        ),
      ),
    );

    // Act
    await user.click(screen.getByTestId('select-properties-modal-button'));
    await selectEvent.select(
      screen.getByText('Выберите характеристики товара'),
      mockProperties[0].displayName,
    );
    const submitPropertiesButton = screen.getByTestId('select-properties-submit-button');
    await user.click(submitPropertiesButton);

    // Act
    await selectEvent.openMenu(screen.getAllByText('Выберите вариант')[0]);
    await selectEvent.select(
      screen.getAllByText('Выберите вариант')[0],
      mockDictionaryPropertyOptions[0].name,
    );

    const expirationDateButton = screen.getByTestId('variants.0.expirationDate');
    await user.click(expirationDateButton);

    fireEvent.click(await screen.findByTestId('no-date'));
    fireEvent.click(screen.getByTestId('datepicker-button-submit'));

    const photosInput = await screen.findByTestId('add-photos-modal--variantPhotos');
    await user.click(photosInput);
    const filePhotoInput = await screen.findByTestId(
      'load-photo-input--add-photos-modal--variantPhotos',
    );
    await user.upload(filePhotoInput, mockPhoto);
    const submitPhotoUpload = await screen.findByTestId(
      'add-photo-submit-button--add-photos-modal--variantPhotos',
    );
    await user.click(submitPhotoUpload);

    const certificatesInput = screen.getByTestId('add-photos-modal--variantCertificates');
    await user.click(certificatesInput);
    const fileCertificateInput = screen.getByTestId(
      'load-photo-input--add-photos-modal--variantCertificates',
    );
    await user.upload(fileCertificateInput, mockDocument);
    await user.click(
      screen.getByTestId('add-photo-submit-button--add-photos-modal--variantCertificates'),
    );

    await waitFor(() => {
      expect(screen.queryByTestId('add-photo-loader')).not.toBeInTheDocument();
    });

    await user.click(screen.getByTestId('create-product-properties-submit-button'));

    // Assert
    expect(mockUseProperties).toHaveBeenCalledWith(expectedPropertiesValue);
    expect(mockUseDictionaryPropertyOptions).toHaveBeenCalledWith(expectedPropertyOptionsValue);
    await waitFor(() => {
      expect(mockSubmitProductPropertiesStep).toHaveBeenCalledWith(expectedValue);
      expect(mockOnSubmitStep).toHaveBeenCalledWith(ADDRESS);
    });
  });

  test('should add and remove variant', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <CreateProductProperties product={mockProductBasic} onSubmitStep={mockOnSubmitStep} />,
          ),
        ),
      ),
    );

    // Act
    await user.click(screen.getByTestId('select-properties-modal-button'));
    await selectEvent.select(
      screen.getByText('Выберите характеристики товара'),
      mockProperties[0].displayName,
    );

    const selectPropertiesButton = screen.getByTestId('select-properties-submit-button');
    await user.click(selectPropertiesButton);

    const buttonAddVariant = screen.getByTestId('add-variant-button');
    await user.click(buttonAddVariant);

    const variant = screen.queryByTestId('variant-index-1');

    // Assert
    expect(variant).toHaveTextContent('2');
    expect(variant).toBeInTheDocument();

    // Act
    await user.click(screen.getByTestId('remove-variant-1-modal-button'));

    // Assert
    expect(screen.getByTestId('simple-modal-title')).toBeInTheDocument();

    // Act
    await user.click(screen.getByTestId('confirm-modal-button'));

    // Assert
    await waitFor(() => {
      expect(variant).not.toBeInTheDocument();
    });
  });

  test('should show initial value', () => {
    // Arrange
    const { variants } = mockProductProperties;
    const [{ variantProperties }] = variants;
    const {
      dictionaryPropertyOption: { id: expectedDictionaryPropertyId },
    } = variantProperties[0];
    const { integerValue: expectedIntegerPropertyValue } = variantProperties[1];

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateProductProperties
            product={mockProductProperties}
            onSubmitStep={mockOnSubmitStep}
          />,
        ),
      ),
    );
    const variant = screen.getByTestId('variant-index-0');
    const variantDictionaryProperty = screen.getByTestId(
      `variants.0.variantProperties.0.propertyValue`,
    );
    const variantIntegerProperty = screen.getByTestId(
      `variants.0.variantProperties.1.propertyValue`,
    );

    // Assert
    expect(variant).toBeInTheDocument();
    expect(variantDictionaryProperty.value).toEqual(expectedDictionaryPropertyId);
    expect(variantIntegerProperty.value).toEqual(expectedIntegerPropertyValue.toString());
  });
});
