import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useCurrentUser from 'hooks/useCurrentUser';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';

import { AboutUsPage } from './AboutUsPage';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AboutUsPage', () => {
  test('should render correctly', () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => ({
      loading: undefined,
      error: undefined,
      user: { id: '1', email: 'user@mail.ru' },
    }));
    useCurrentUser.mockImplementation(mockUseCurrentUser);

    useCity.mockImplementation(jest.fn(() => mockUseCityData));
    // Act
    render(renderWithTheme(renderWithApolloClient(pageProps => <AboutUsPage {...pageProps} />)));
    const container = screen.getByTestId('about-us-page');

    // Assert
    expect(container).toBeInTheDocument();
  });
});
