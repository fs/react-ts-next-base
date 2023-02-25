import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import { useCustomerCompanies } from 'lib/apollo/hooks/state/customerCompanies';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import { mockCompanies } from '__tests__/mocks/mockCompanies';

import { SELLER } from 'config/constants/directions';
import { NOT_VERIFIED } from 'config/constants/status';
import { URGENT } from './constants';

import { AdminRequestsPage } from './AdminRequestsPage';

jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/customerCompanies');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminRequestsPage', () => {
  const mockSearchQuery = 'test name';
  const mockFilter = `${SELLER},${URGENT}`;

  const mockQuery = {
    searchQuery: mockSearchQuery,
    filterBy: mockFilter,
  };

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render correctly', async () => {
    // Arrange
    const mockUseCustomerCompanies = jest.fn(() => ({
      customerCompanies: mockCompanies,
      loading: undefined,
    }));
    useCustomerCompanies.mockImplementation(mockUseCustomerCompanies);

    const expectedValues = {
      deleted: false,
      directions: [SELLER],
      officialName: mockSearchQuery,
      statuses: [NOT_VERIFIED],
      urgent: true,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminRequestsPage {...pageProps} query={mockQuery} />),
      ),
    );
    const requestsPage = screen.getByTestId('admin-requests-page');

    // Assert
    expect(requestsPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseCustomerCompanies).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockUseCustomerCompanies = jest.fn(() => ({
      customerCompanies: [],
      loading: true,
    }));
    useCustomerCompanies.mockImplementation(mockUseCustomerCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminRequestsPage {...pageProps} query={mockQuery} />),
      ),
    );
    const loader = screen.getByTestId('loader-admin-template-content');

    // Assert
    await waitFor(() => expect(loader).toBeInTheDocument());
  });
});
