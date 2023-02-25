import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useAdmins } from 'lib/apollo/hooks/state/admins';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockAdmins } from '__tests__/mocks/mockAdmins';

import { AdminAdministratorsPage } from './AdminAdministratorsPage';

jest.mock('lib/apollo/hooks/state/admins');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminAdministratorsPage', () => {
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
        renderWithApolloClient(pageProps => <AdminAdministratorsPage {...pageProps} />),
      ),
    );
    const administratorPage = screen.getByTestId('administrators-page');

    // Assert
    expect(administratorPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseAdmins).toHaveBeenCalled();
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
        renderWithApolloClient(pageProps => <AdminAdministratorsPage {...pageProps} />),
      ),
    );
    const loader = screen.getByTestId('administrators-page-loader');

    // Assert
    await waitFor(() => expect(loader).toBeInTheDocument());
  });
});
