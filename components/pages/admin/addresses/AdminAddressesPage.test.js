import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import { useCustomerCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockLocations } from '__tests__/mocks/mockLocations';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import { NOT_VERIFIED } from 'config/constants/status';

import { AdminAddressesPage } from './AdminAddressesPage';

jest.mock('lib/apollo/hooks/state/companyLocations');
jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminAddressesPage', () => {
  const mockSearchQuery = 'test name';

  const mockQuery = {
    searchQuery: mockSearchQuery,
  };

  const mockUseRouter = jest.fn(() => ({ ...mockUseRouterData, query: mockQuery }));
  useRouter.mockImplementation(mockUseRouter);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render correctly', async () => {
    // Arrange
    const expectedLength = mockLocations.length;
    const mockUseCustomerCompanyLocations = jest.fn(() => ({
      locations: mockLocations,
      loading: undefined,
      pageInfo: mockPageInfo,
    }));
    useCustomerCompanyLocations.mockImplementation(mockUseCustomerCompanyLocations);

    const expectedValues = {
      companyName: mockSearchQuery,
      first: 12,
      statuses: [NOT_VERIFIED],
    };

    // Act
    render(
      renderWithTheme(renderWithApolloClient(pageProps => <AdminAddressesPage {...pageProps} />)),
    );
    const addressesPage = screen.getByTestId('admin-addresses-page');
    const locationItems = screen.getAllByTestId('location-info-item');

    // Assert
    expect(addressesPage).toBeInTheDocument();
    expect(mockUseCustomerCompanyLocations).toHaveBeenCalledWith(expectedValues);
    expect(locationItems.length).toBe(expectedLength);
  });
});
