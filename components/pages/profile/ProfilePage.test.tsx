import { ApolloError } from '@apollo/client';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockCurrentUserData } from '__tests__/mocks/mockCurrentUser';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import { useSignOut } from 'lib/apollo/hooks/actions/auth';
import useCurrentUser from 'hooks/useCurrentUser';
import useNotifier from 'hooks/useNotifier';
import useRouter from 'hooks/useRouter';

import { TPageProps } from 'lib/apollo/types';

import { ProfilePage } from './ProfilePage';

jest.mock('hooks/useRouter');
jest.mock('hooks/useNotifier');
jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/actions/auth');

const mockedUseSignOut = useSignOut as jest.Mock;
const mockedUseNotifier = useNotifier as jest.Mock;
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;

describe('Profile page', () => {
  const mockSignOut = jest.fn();
  const mockUseSignOut = jest.fn(() => [mockSignOut]);
  mockedUseSignOut.mockImplementation(mockUseSignOut);

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  mockedUseRouter.mockImplementation(mockUseRouter);

  const mockUseNotifier = jest.fn(() => ({ setSuccess: jest.fn(), setError: jest.fn() }));
  mockedUseNotifier.mockImplementation(mockUseNotifier);

  test('should render correctly', async () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => mockCurrentUserData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <ProfilePage {...pageProps} />),
      ),
    );
    const pageContent = screen.getByTestId('profile-page');

    // Assert
    expect(pageContent).toBeInTheDocument();
  });

  test('should show loader while loading', async () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => ({ ...mockCurrentUserData, loading: true }));
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <ProfilePage {...pageProps} />),
      ),
    );
    const loadingContent = screen.getByTestId('profile-loading');

    // Assert
    expect(loadingContent).toBeInTheDocument();
  });

  test('should show error on error', async () => {
    // Arrange
    const error = new ApolloError({});
    const mockUseCurrentUser = jest.fn(() => ({ ...mockCurrentUserData, error }));
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <ProfilePage {...pageProps} />),
      ),
    );
    const errorContent = screen.getByTestId('error-page-text');

    // Assert
    expect(errorContent).toBeInTheDocument();
  });
});
