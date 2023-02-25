import React from 'react';
import { render, screen } from '@testing-library/react';

import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { AdminCreateAdministratorPage } from './adminCreateAdministratorPage';

jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminCreateAdministratorsPage', () => {
  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render correctly', async () => {
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminCreateAdministratorPage {...pageProps} />),
      ),
    );
    const createAdministratorPage = screen.getByTestId('create-administrators-page');

    // Assert
    expect(createAdministratorPage).toBeInTheDocument();
  });
});
