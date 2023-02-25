import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useFetchCoordsByAddress from 'hooks/map/useFetchCoordsByAddress';
import { useCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';
import {
  useCreateCompanyLocations,
  useUpdateCompanyLocation,
  useDestroyCompanyLocation,
  useMarkCompanyLocationAsMain,
} from 'lib/apollo/hooks/actions/companyLocation';
import useNotifier from 'hooks/useNotifier';

import mockCompany from '__tests__/mocks/mockCompany';
import { mockLocations } from '__tests__/mocks/mockLocations';

import { BUYER } from 'config/constants/directions';

import Addresses from '.';

jest.mock('hooks/map/useFetchCoordsByAddress');
jest.mock('lib/apollo/hooks/actions/companyLocation');
jest.mock('lib/apollo/hooks/state/companyLocations');
jest.mock('hooks/useNotifier');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('Addresses', () => {
  const mockLocation = mockLocations[0];
  const mockCoords = ['55.75', '37.57'];

  const mockUseCompanyLocations = jest.fn(() => ({ locations: mockLocations }));
  useCompanyLocations.mockImplementation(mockUseCompanyLocations);

  const mockFetchCoordsByAddress = jest.fn(() => Promise.resolve());
  const mockUseFetchCoordsByAddress = jest.fn(() => [mockCoords, mockFetchCoordsByAddress]);
  useFetchCoordsByAddress.mockImplementation(mockUseFetchCoordsByAddress);

  const mockCreateCompanyLocations = jest.fn();
  const mockUseCreateCompanyLocations = jest.fn(() => [mockCreateCompanyLocations]);
  useCreateCompanyLocations.mockImplementation(mockUseCreateCompanyLocations);

  const mockUpdateCompanyLocation = jest.fn();
  const mockUseUpdateCompanyLocation = jest.fn(() => [mockUpdateCompanyLocation]);
  useUpdateCompanyLocation.mockImplementation(mockUseUpdateCompanyLocation);

  const mockDestroyCompanyLocation = jest.fn();
  const mockUseDestroyCompanyLocation = jest.fn(() => [mockDestroyCompanyLocation]);
  useDestroyCompanyLocation.mockImplementation(mockUseDestroyCompanyLocation);

  const mockMarkCompanyLocationAsMain = jest.fn();
  const mockUseMarkCompanyLocationAsMain = jest.fn(() => [mockMarkCompanyLocationAsMain]);
  useMarkCompanyLocationAsMain.mockImplementation(mockUseMarkCompanyLocationAsMain);

  const mockSetError = jest.fn();
  const mockUseNotifier = jest.fn(() => ({
    setError: mockSetError,
  }));
  useNotifier.mockImplementation(mockUseNotifier);

  test('should show Tutorial modal after creating first company', async () => {
    // Arrange
    const query = { isFirst: true, newCompany: true };
    const { id: mockCompanyId } = mockCompany;

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <Addresses query={query} companyId={mockCompanyId} company={mockCompany} />,
        ),
      ),
    );
    const createLocationModal = screen.getByTestId('company-location-modal-title');

    // Assert
    expect(createLocationModal).toBeInTheDocument();

    const cancelButton = screen.getByTestId('company-location-close-button');
    fireEvent.click(cancelButton);

    // Assert
    expect(mockUseCompanyLocations).toHaveBeenCalledWith({ companyId: mockCompanyId });
    await waitFor(() => {
      expect(screen.getByTestId('company-tutorial')).toBeVisible();
    });
  });

  test('should call markCompanyLocationAsMain', async () => {
    // Arrange
    const { id: mockCompanyId } = mockCompany;
    const { id: expectedLocationId } = mockLocation;

    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <Addresses
              query={{}}
              companyId={mockCompanyId}
              company={{ ...mockCompany, direction: BUYER }}
            />,
          ),
        ),
      ),
    );

    // Act
    const buttonSelectMainLocation = screen.getByTestId('select-main-location-button');
    await user.click(buttonSelectMainLocation);

    const buttonSubmitLocationMarkAsMain = screen.getByTestId('confirm-modal-button');
    await user.click(buttonSubmitLocationMarkAsMain);

    // Assert
    await waitFor(() => {
      expect(mockMarkCompanyLocationAsMain).toHaveBeenCalledWith(expectedLocationId);
    });
  });

  test('should call destroyCompanyLocation', async () => {
    // Arrange
    const { id: mockCompanyId } = mockCompany;
    const { id: expectedLocationId } = mockLocation;

    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <Addresses query={{}} companyId={mockCompanyId} company={mockCompany} />,
          ),
        ),
      ),
    );

    // Act
    const buttonDestroyLocation = screen.getAllByTestId('destroy-location-button')[0];
    await user.click(buttonDestroyLocation);

    const buttonSubmitDestroyLocation = screen.getByTestId('confirm-modal-button');
    await user.click(buttonSubmitDestroyLocation);

    // Assert
    await waitFor(() => {
      expect(mockDestroyCompanyLocation).toHaveBeenCalledWith(expectedLocationId);
    });
  });
});
