import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import useCurrentUser from 'hooks/useCurrentUser';
import { useStartPageCategories } from 'lib/apollo/hooks/state/startPageCategories';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import { SystemRoleEnum } from 'graphql/types';
import { HomePage } from './HomePage';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/startPageCategories');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

jest.mock('hooks/useRouter');
describe('HomePage', () => {
  const mockUseStartPageCategories = jest.fn(() => ({
    loading: undefined,
    error: undefined,
    categories: [],
  }));
  useStartPageCategories.mockImplementation(mockUseStartPageCategories);

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render page for guest correctly', async () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => ({
      loading: undefined,
      error: undefined,
      user: null,
    }));
    useCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(renderWithTheme(renderWithApolloClient(pageProps => <HomePage {...pageProps} />)));
    const container = await screen.findByTestId('homepage-for-guest');

    // Assert
    expect(container).toBeInTheDocument();
  });

  test('should render page for user correctly', async () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => ({
      loading: undefined,
      error: undefined,
      user: { id: '1', email: 'user@test.com', systemRole: SystemRoleEnum.Client },
      isRegisteredUser: true,
    }));
    useCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(renderWithTheme(renderWithApolloClient(pageProps => <HomePage {...pageProps} />)));
    const container = await screen.findByTestId('homepage-for-user');

    // Assert
    expect(container).toBeInTheDocument();
  });
});
