import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useAdmins } from 'lib/apollo/hooks/state/admins';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockAdmins } from '__tests__/mocks/mockAdmins';

import { AdminAdministratorPage } from './AdminAdministratorPage';

jest.mock('lib/apollo/hooks/state/admins');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminAdministratorPage', () => {
  const expectedAdminId = mockAdmins[0].id;
  const mockQuery = { adminId: expectedAdminId };

  test('should render correctly', async () => {
    // Arrange
    const mockUseAdmins = jest.fn(() => ({
      admins: mockAdmins,
      loading: undefined,
    }));
    useAdmins.mockImplementation(mockUseAdmins);

    useCity.mockImplementation(jest.fn(() => mockUseCityData));

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <AdminAdministratorPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const administratorPage = screen.getByTestId('administrator-page');

    // Assert
    expect(administratorPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseAdmins).toHaveBeenCalledWith({ ids: [expectedAdminId] });
    });
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockUseAdmins = jest.fn(() => ({
      admins: [],
      loading: true,
    }));
    useAdmins.mockImplementation(mockUseAdmins);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <AdminAdministratorPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const loader = screen.getByTestId('administrator-page-loader');

    // Assert
    await waitFor(() => expect(loader).toBeInTheDocument());
  });
});
