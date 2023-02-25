import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useSubmitProductPricesStep } from 'lib/apollo/hooks/actions/product';
import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useFileUpload } from 'hooks/useFileUpload';
import useNotifier from 'hooks/useNotifier';

import { mockUploadFile } from '__tests__/mocks/mockUploadFile';
import { mockProductPrices } from '__tests__/mocks/mockProduct';
import mockPresignData from '__tests__/mocks/mockPresignData';

import { DISCOUNTS } from 'config/constants/createProductSteps';

import CreateProductPrices from '.';

jest.mock('lib/apollo/hooks/actions/product');
jest.mock('lib/apollo/hooks/actions/presignFile');
jest.mock('hooks/useFileUpload');
jest.mock('hooks/useNotifier');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateProductPrices', () => {
  const { vat, wholesaleLot, variants, productConfirmationRecords } = mockProductPrices;

  const mockOnSubmitStep = jest.fn();

  const mockSetError = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setError: mockSetError,
    })),
  );

  const mockPhoto = new File(['photo'], 'photo.png', { type: 'image/png' });
  const mockPresignFile = jest.fn(() => mockPresignData);
  usePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));
  const mockFileUpload = jest.fn(() => mockUploadFile);
  useFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

  const mockSubmitProductPricesStep = jest.fn(() => mockProductPrices);
  const mockUseSubmitProductPricesStep = jest.fn(() => [mockSubmitProductPricesStep]);
  useSubmitProductPricesStep.mockImplementation(mockUseSubmitProductPricesStep);

  test('should call submitProductPrices on submit', async () => {
    // Arrange
    const expectedValue = {
      productId: '1',
      vat,
      wholesaleLot,
      productConfirmationRecords: [
        ...productConfirmationRecords.map(({ attachmentUrl }) => ({
          attachmentRemoteUrl: attachmentUrl,
        })),
        { attachment: mockUploadFile },
      ],
      variants: variants.map(({ id, price, stock, minShipmentLot, wholesalePrice }) => ({
        id,
        price,
        stock,
        minShipmentLot,
        wholesalePrice,
      })),
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateProductPrices product={mockProductPrices} onSubmitStep={mockOnSubmitStep} />,
        ),
      ),
    );
    const user = userEvent.setup();
    const photoConfirmationModal = screen.getByTestId('photo-confirmation-modal-button');
    await user.click(photoConfirmationModal);
    const fileInput = screen.getByTestId(
      'load-photo-input-button--photo-confirmation-modal-button',
    );
    await user.upload(fileInput, mockPhoto);

    await user.click(
      screen.getByTestId('add-photo-submit-button--photo-confirmation-modal-button'),
    );
    user.type(screen.getByTestId('wholesaleLot'), String(wholesaleLot));
    const submitButton = screen.getByTestId('create-product-prices-submit-button');

    await user.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockSubmitProductPricesStep).toHaveBeenCalledWith(expectedValue);
      expect(mockOnSubmitStep).toHaveBeenCalledWith(DISCOUNTS);
    });
  });

  test('should show initial values', async () => {
    // Arrange
    const expectedPrice = '9 000 руб.';
    const expectedStock = '1 000 000 шт.';
    const expectedMinShipmentLot = '100 шт.';
    const expectedWholesaleLot = '100 шт.';
    const expectedWholesalePrice = '8 000 руб.';

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateProductPrices product={mockProductPrices} onSubmitStep={mockOnSubmitStep} />,
        ),
      ),
    );

    // Assert
    expect(screen.getByTestId('variants.0.price').value).toEqual(expectedPrice);
    expect(screen.getByTestId('variants.0.stock').value).toEqual(expectedStock);
    expect(screen.getByTestId('variants.0.minShipmentLot').value).toEqual(expectedMinShipmentLot);
    expect(screen.getByTestId('wholesaleLot').value).toEqual(expectedWholesaleLot);
    expect(screen.getByTestId('variants.0.wholesalePrice').value).toEqual(expectedWholesalePrice);
  });
});
