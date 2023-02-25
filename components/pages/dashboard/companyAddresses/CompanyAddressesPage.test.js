import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockLocations } from '__tests__/mocks/mockLocations';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';

import { CompanyAddressesPage } from './CompanyAddressesPage';

jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/companyLocations');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CompanyAddressesPage', () => {
  const expectedCompanyId = '1';
  const query = { companyId: expectedCompanyId };

  const mockUseCompanyLocations = jest.fn(() => ({ locations: mockLocations, loading: undefined }));
  useCompanyLocations.mockImplementation(mockUseCompanyLocations);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));
  useCompanySidebar.mockImplementation(jest.fn(() => mockUseCompanySidebarData));

  test('should render correctly', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompanyAddressesPage {...pageProps} query={query} />),
      ),
    );
    const companyAddressesPageContainer = screen.getByTestId('company-addresses-page');

    // Assert
    expect(companyAddressesPageContainer).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [expectedCompanyId] });
    });
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      loading: true,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompanyAddressesPage {...pageProps} query={query} />),
      ),
    );
    const loader = screen.getByTestId('company-addresses-loader');

    // Assert
    await waitFor(() => expect(loader).toBeInTheDocument());
  });

  test('should return error page for non existing company', () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: [],
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompanyAddressesPage {...pageProps} query={query} />),
      ),
    );
    const errorPage = screen.getByTestId('error-page-text');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });
});
