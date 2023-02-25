import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useCustomerCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockLocations } from '__tests__/mocks/mockLocations';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';

import { AdminAddressPage } from './AdminAddressPage';

jest.mock('lib/apollo/hooks/state/companyLocations');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminAddressesPage', () => {
  const mockAddressAd = 1;
  const mockQuery = {
    addressId: mockAddressAd,
  };
  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render correctly', async () => {
    // Arrange
    const expectedTitle = mockLocations[0].company.officialName;
    const mockUseCustomerCompanyLocations = jest.fn(() => ({
      locations: mockLocations,
      loading: undefined,
      pageInfo: mockPageInfo,
    }));
    useCustomerCompanyLocations.mockImplementation(mockUseCustomerCompanyLocations);

    const expectedValues = {
      ids: [mockAddressAd],
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminAddressPage {...pageProps} query={mockQuery} />),
      ),
    );
    const addressesPage = screen.getByTestId('admin-address-page');
    const companyName = screen.getByTestId('address-company-title');

    // Assert
    expect(addressesPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseCustomerCompanyLocations).toHaveBeenCalledWith(expectedValues);
      expect(companyName).toHaveTextContent(expectedTitle);
    });
  });

  test('should show loader on loading', () => {
    // Arrange
    const mockUseCustomerCompanyLocations = jest.fn(() => ({
      locations: [],
      loading: true,
    }));
    useCustomerCompanyLocations.mockImplementation(mockUseCustomerCompanyLocations);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminAddressPage {...pageProps} query={mockQuery} />),
      ),
    );
    const loader = screen.getByTestId('admin-address-page-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });

  test('should show error page on not existing location', () => {
    // Arrange
    const mockUseCustomerCompanyLocations = jest.fn(() => ({
      locations: [],
      loading: undefined,
      pageInfo: mockPageInfo,
    }));
    useCustomerCompanyLocations.mockImplementation(mockUseCustomerCompanyLocations);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminAddressPage {...pageProps} query={mockQuery} />),
      ),
    );
    const errorPage = screen.getByTestId('error-page');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });
});
