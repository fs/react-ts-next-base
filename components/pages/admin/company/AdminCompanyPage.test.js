import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { useCustomerCompanies } from 'lib/apollo/hooks/state/customerCompanies';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockCompanies } from '__tests__/mocks/mockCompanies';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { AdminCompanyPage } from './AdminCompanyPage';

jest.mock('lib/apollo/hooks/state/customerCompanies');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminCompanyPage', () => {
  const companyId = mockCompanies[0].id;
  const mockQuery = {
    companyId,
  };
  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render correctly', async () => {
    // Arrange
    const mockUseCustomerCompanies = jest.fn(() => ({
      customerCompanies: mockCompanies,
      loading: undefined,
    }));
    useCustomerCompanies.mockImplementation(mockUseCustomerCompanies);

    const expectedValues = {
      companyId,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminCompanyPage {...pageProps} query={mockQuery} />),
      ),
    );
    const adminCompanyPage = screen.getByTestId('admin-company-page');

    // Assert
    expect(adminCompanyPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseCustomerCompanies).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should show loader on loading', () => {
    // Arrange
    const mockUseCustomerCompanies = jest.fn(() => ({
      customerCompanies: [],
      loading: true,
    }));
    useCustomerCompanies.mockImplementation(mockUseCustomerCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminCompanyPage {...pageProps} query={mockQuery} />),
      ),
    );
    const loader = screen.getByTestId('admin-company-page-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
