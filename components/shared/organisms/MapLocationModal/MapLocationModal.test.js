import React from 'react';

import { screen, render, fireEvent, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useFetchCoordsByAddress from 'hooks/map/useFetchCoordsByAddress';
import useFetchAddressByCoords from 'hooks/map/useFetchAddressByCoords';
import { useFileUpload } from 'hooks/useFileUpload';
import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import useNotifier from 'hooks/useNotifier';
import { useCities } from 'lib/apollo/hooks/state/cities';

import { mockLocations } from '__tests__/mocks/mockLocations';
import mockPresignData from '__tests__/mocks/mockPresignData';
import { mockCities } from '__tests__/mocks/mockCities';
import { phoneFormatter } from 'helpers';

import MapLocationModal from '.';

jest.mock('hooks/map/useFetchAddressByCoords');
jest.mock('hooks/map/useFetchCoordsByAddress');
jest.mock('lib/apollo/hooks/actions/presignFile');
jest.mock('lib/apollo/hooks/state/cities');
jest.mock('hooks/useFileUpload');
jest.mock('hooks/useNotifier');

describe('MapLocationModal', () => {
  const mockLocation = mockLocations[0];
  const mockCoords = ['55.75', '37.57'];
  const mockAddress = {
    formatted: mockLocation.address,
    postal_code: mockLocation.postcode,
    Components: [{ kind: 'locality', name: mockLocation.city.name }],
  };
  const mockOnAddAddress = jest.fn();
  const mockShowModal = jest.fn();

  const mockFetchCoordsByAddress = jest.fn(() => Promise.resolve());
  const mockUseFetchCoordsByAddress = jest.fn(() => [mockCoords, mockFetchCoordsByAddress]);
  useFetchCoordsByAddress.mockImplementation(mockUseFetchCoordsByAddress);

  const mockFetchAddressByCoords = jest.fn(() => Promise.resolve());
  const mockUseFetchAddressByCoords = jest.fn(() => [mockAddress, mockFetchAddressByCoords]);
  useFetchAddressByCoords.mockImplementation(mockUseFetchAddressByCoords);

  const mockUseCities = () => jest.fn(() => ({ nodes: mockCities }));
  useCities.mockImplementation(mockUseCities);

  const mockSetError = jest.fn();
  const mockUseNotifier = jest.fn(() => ({
    setError: mockSetError,
  }));
  useNotifier.mockImplementation(mockUseNotifier);

  test('should submit address without license, call useFetchCoordsByAddress', async () => {
    // Arrange
    const {
      city: { id: cityId, name: cityName },
      address,
      postcode,
      phoneNumber,
      comment,
    } = mockLocation;

    const expectedValues = {
      cityId,
      address,
      phoneNumber,
      postcode,
      comment,
      companyLicenses: [],
    };

    render(
      renderWithTheme(
        renderWithApolloClient(
          <MapLocationModal
            onAddAddress={mockOnAddAddress}
            setIsShowMapModal={mockShowModal}
            location={{ city: mockLocation.city }}
          />,
        ),
      ),
    );

    const addressField = screen.getByTestId('company-location-address');
    const postcodeField = screen.getByTestId('company-location-postcode');
    const phoneNumberField = screen.getByTestId('company-location-phoneNumber');
    const commentField = screen.getByTestId('company-location-comment');

    // Act
    fireEvent.change(addressField, { target: { value: address } });
    fireEvent.change(postcodeField, { target: { value: postcode } });
    fireEvent.change(phoneNumberField, { target: { value: phoneNumber } });
    fireEvent.change(commentField, { target: { value: comment } });

    await waitFor(() => {
      expect(mockFetchCoordsByAddress).toHaveBeenCalledWith(`${cityName} ${address}`);
    });

    const submitButton = screen.getByTestId('company-location-submit-button');
    fireEvent.click(submitButton);

    // Assert
    expect(submitButton).toHaveTextContent('Подтвердить');

    await waitFor(() => {
      expect(mockOnAddAddress).toHaveBeenCalledWith(expectedValues);
      expect(mockShowModal).toHaveBeenCalledWith(false);
    });
  });

  test('should submit address with licenses, call useFetchCoordsByAddress', async () => {
    global.IS_REACT_ACT_ENVIRONMENT = false;
    // Arrange
    const {
      city: { id: cityId, name: cityName },
      address,
      postcode,
      phoneNumber,
      comment,
      companyLicenses,
    } = mockLocation;
    const { number: expectedLicenseNumber } = companyLicenses[0];

    const expectedLicensePhoto = {
      id: 'c6b449a46d5448f6fe37c97cc5ed0c14.png',
      metadata: {
        filename: 'file.png',
        mimeType: 'image/png',
        size: 36875,
      },
      storage: 'cache',
    };

    const mockPhoto = new File(['photo'], 'photo.png', { type: 'image/png' });
    const mockFileEvent = {
      target: {
        files: [mockPhoto],
      },
    };
    const expectedPresignFileValues = {
      filename: 'photo.png',
      type: 'image/png',
      size: 5,
    };

    const expectedValues = {
      cityId,
      address,
      phoneNumber,
      postcode,
      comment,
      companyLicenses: [
        {
          number: expectedLicenseNumber,
          companyLicensePhotos: [{ image: expectedLicensePhoto }],
        },
      ],
      companyLocationId: undefined,
    };
    const mockPresignFile = jest.fn(() => mockPresignData);
    usePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));

    const mockFileUpload = jest.fn(() => expectedLicensePhoto);
    useFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

    render(
      renderWithTheme(
        renderWithApolloClient(
          <MapLocationModal
            onAddAddress={mockOnAddAddress}
            setIsShowMapModal={mockShowModal}
            withLicensesInfo
            location={{ city: mockLocation.city }}
          />,
        ),
      ),
    );

    const addressField = screen.getByTestId('company-location-address');
    const postcodeField = screen.getByTestId('company-location-postcode');
    const phoneNumberField = screen.getByTestId('company-location-phoneNumber');
    const commentField = screen.getByTestId('company-location-comment');

    // Act
    fireEvent.change(addressField, { target: { value: address } });
    fireEvent.change(postcodeField, { target: { value: postcode } });
    fireEvent.change(phoneNumberField, { target: { value: phoneNumber } });
    fireEvent.change(commentField, { target: { value: comment } });

    fireEvent.click(screen.getByTestId('add-license-button'));
    const licenseNumberField = screen.getByTestId('companyLicenses.0.number');
    fireEvent.change(licenseNumberField, { target: { value: expectedLicenseNumber } });

    const buttonPhotoLicenseModal = screen.queryAllByTestId('photo-license-modal-button')[0];
    fireEvent.click(buttonPhotoLicenseModal);

    const fileInput = screen.getByTestId('load-photo-input--photo-license-modal-button');
    fireEvent.change(fileInput, mockFileEvent);

    await waitFor(() => expect(mockPresignFile).toHaveBeenCalledWith(expectedPresignFileValues));
    expect(mockFileUpload).toHaveBeenCalledWith(mockPresignData, mockPhoto);

    const submitButton = screen.getByTestId('company-location-submit-button');
    fireEvent.click(submitButton);

    // Assert
    expect(submitButton).toHaveTextContent('Подтвердить');

    await waitFor(() => {
      expect(mockOnAddAddress).toHaveBeenCalledWith(expectedValues);
      expect(mockShowModal).toHaveBeenCalledWith(false);
      expect(mockFetchCoordsByAddress).toHaveBeenCalledWith(`${cityName} ${address}`);
    });
  });

  test('should have right initialize data', async () => {
    // Arrange
    const {
      address: expectedAddress,
      postcode: expectedPostcode,
      phoneNumber: expectedPhoneNumber,
      comment: expectedComment,
      companyLicenses,
    } = mockLocation;
    const { number: mockLicenseNumber } = companyLicenses[0];

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <MapLocationModal
            setIsShowMapModal={jest.fn()}
            location={mockLocation}
            withLicensesInfo
          />,
        ),
      ),
    );
    const addressField = screen.getByTestId('company-location-address');
    const postcodeField = screen.getByTestId('company-location-postcode');
    const phoneNumberField = screen.getByTestId('company-location-phoneNumber');
    const commentField = screen.getByTestId('company-location-comment');
    const licenseNumberField = screen.getByTestId('companyLicenses.0.number');

    // Assert
    await waitFor(() => expect(addressField.value).toBe(expectedAddress));
    expect(postcodeField.value).toBe(expectedPostcode);
    expect(phoneNumberField.value).toBe(phoneFormatter(expectedPhoneNumber));
    expect(commentField.value).toBe(expectedComment);
    expect(licenseNumberField.value).toBe(mockLicenseNumber);
  });

  test('should add and remove license', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(
          <MapLocationModal
            setIsShowMapModal={jest.fn()}
            location={mockLocation}
            withLicensesInfo
          />,
        ),
      ),
    );

    // Act
    const buttonAddLicense = screen.getByTestId('add-license-button');
    fireEvent.click(buttonAddLicense);

    // Assert
    expect(screen.getByTestId('companyLicenses.1.number')).toBeInTheDocument();

    // Act
    const buttonRemoveLicense = screen.queryAllByTestId('remove-license-button')[1];
    fireEvent.click(buttonRemoveLicense);

    // Assert
    await waitFor(() => {
      expect(screen.queryByTestId('companyLicenses.1.number')).not.toBeInTheDocument();
    });
  });

  test('should call close modal on cancel button', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(<MapLocationModal setIsShowMapModal={mockShowModal} />),
      ),
    );
    const closeButton = screen.getByTestId('company-location-close-button');

    // Act
    fireEvent.click(closeButton);

    // Assert
    await waitFor(() => {
      expect(closeButton).toHaveTextContent('Отменить');
      expect(mockShowModal).toHaveBeenCalledWith(false);
    });
  });
});
