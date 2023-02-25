import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import selectEvent from 'react-select-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';
import { usePackingMaterials } from 'lib/apollo/hooks/state/packingMaterials';
import { useSubmitProductAddressStep } from 'lib/apollo/hooks/actions/product';
import { useCreateCompanyLocations } from 'lib/apollo/hooks/actions/companyLocation';
import useFetchCoordsByAddress from 'hooks/map/useFetchCoordsByAddress';
import useNotifier from 'hooks/useNotifier';

import { mockProductAddress } from '__tests__/mocks/mockProduct';
import { mockMyProducts } from '__tests__/mocks/mockMyProducts';
import { mockLocations } from '__tests__/mocks/mockLocations';
import { mockPackingMaterials } from '__tests__/mocks/mockPackingMaterials';

import { DELIVERY_CONDITIONS } from 'config/constants/createProductSteps';

import CreateProductAddress from '.';

jest.mock('lib/apollo/hooks/state/companyLocations');
jest.mock('lib/apollo/hooks/state/packingMaterials');
jest.mock('lib/apollo/hooks/actions/product');
jest.mock('lib/apollo/hooks/actions/companyLocation');
jest.mock('hooks/map/useFetchCoordsByAddress');

jest.mock('hooks/useNotifier');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateProductAddress', () => {
  const mockUseCompanyLocations = jest.fn(() => ({ locations: mockLocations, loading: undefined }));
  useCompanyLocations.mockImplementation(mockUseCompanyLocations);

  const mockUsePackingMaterials = jest.fn(() => ({
    packingMaterials: mockPackingMaterials,
    loading: undefined,
  }));
  usePackingMaterials.mockImplementation(mockUsePackingMaterials);

  const mockCreateCompanyLocation = jest.fn();
  useCreateCompanyLocations.mockImplementation(jest.fn(() => [mockCreateCompanyLocation]));

  const mockSubmitProductAddressStep = jest.fn(() => mockProductAddress);
  useSubmitProductAddressStep.mockImplementation(jest.fn(() => [mockSubmitProductAddressStep]));

  const mockCoords = ['55.75', '37.57'];
  const mockFetchCoordsByAddress = jest.fn(() => Promise.resolve());
  const mockUseFetchCoordsByAddress = jest.fn(() => [mockCoords, mockFetchCoordsByAddress]);
  useFetchCoordsByAddress.mockImplementation(mockUseFetchCoordsByAddress);

  const mockSetError = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setError: mockSetError,
    })),
  );

  test('should call submitProductAddressStep on submit', async () => {
    // Arrange
    const mockOnSubmitStep = jest.fn();
    const mockProduct = { ...mockMyProducts[0], companyLocation: null };

    const expectedCompanyId = 12;
    const expectedStatus = 'VERIFIED';
    const expectedProductId = mockProduct.id;
    const expectedAddress = mockLocations[0];
    const expectedLength = 5;
    const expectedWidth = 3;
    const expectedHeight = 4;
    const expectedNetWeigh = 12;
    const expectedGrossWeight = 15;
    const expectedPackingMaterial = mockPackingMaterials[0];

    const expectedValues = {
      productId: expectedProductId,
      companyLocationId: mockLocations[0].id,
      variants: [
        {
          id: mockProduct.variants[0].id,
          length: expectedLength,
          width: expectedWidth,
          height: expectedHeight,
          netWeight: expectedNetWeigh,
          grossWeight: expectedGrossWeight,
          packingMaterialId: expectedPackingMaterial.id,
        },
      ],
    };

    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateProductAddress
            product={mockProduct}
            onSubmitStep={mockOnSubmitStep}
            companyId={expectedCompanyId}
          />,
        ),
      ),
    );

    const lengthField = screen.getByTestId('variants.0.length');
    const widthField = screen.getByTestId('variants.0.width');
    const heightField = screen.getByTestId('variants.0.height');
    const netWeightField = screen.getByTestId('variants.0.netWeight');
    const grossWeightField = screen.getByTestId('variants.0.grossWeight');
    const submitButton = screen.getByTestId('create-product-address-submit-button');

    await selectEvent.select(screen.getByText('Выберите адрес'), expectedAddress.address);
    fireEvent.change(lengthField, { target: { value: expectedLength } });
    fireEvent.change(widthField, { target: { value: expectedWidth } });
    fireEvent.change(heightField, { target: { value: expectedHeight } });
    fireEvent.change(netWeightField, { target: { value: expectedNetWeigh } });
    fireEvent.change(grossWeightField, { target: { value: expectedGrossWeight } });
    await selectEvent.select(screen.getByText('Материал упаковки'), expectedPackingMaterial.name);

    // Act
    fireEvent.click(submitButton);

    // Assert
    expect(mockUseCompanyLocations).toHaveBeenCalledWith({
      companyId: expectedCompanyId,
      statuses: [expectedStatus],
    });
    expect(mockUsePackingMaterials).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockSubmitProductAddressStep).toHaveBeenCalledWith(expectedValues);
      expect(mockOnSubmitStep).toHaveBeenCalledWith(DELIVERY_CONDITIONS);
    });
  });
});
