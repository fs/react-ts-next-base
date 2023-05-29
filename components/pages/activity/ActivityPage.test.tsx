import { ApolloError } from '@apollo/client';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockUseActivitiesData } from '__tests__/mocks/mockActivities';

import { useMeActivities } from 'lib/apollo/hooks/state/meActivity';

import { TPageProps } from 'lib/apollo/types';

import { ActivityPage } from './ActivityPage';

jest.mock('lib/apollo/hooks/state/meActivity');

const mockedUseMeActivities = useMeActivities as jest.MockedFunction<typeof useMeActivities>;

describe('Activity page', () => {
  test('should render correctly', () => {
    // Arrange
    const mockUseMeActivity = jest.fn(() => mockUseActivitiesData);
    mockedUseMeActivities.mockImplementation(mockUseMeActivity);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <ActivityPage {...pageProps} />),
      ),
    );
    const pageContent = screen.getByTestId('activity-table');

    // Assert
    expect(pageContent).toBeInTheDocument();
  });

  test('should show loader while loading', () => {
    // Arrange
    const mockUseMeActivity = jest.fn(() => ({ ...mockUseActivitiesData, loading: true }));
    mockedUseMeActivities.mockImplementation(mockUseMeActivity);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <ActivityPage {...pageProps} />),
      ),
    );
    const loadingContent = screen.getByTestId('activity-loading');

    // Assert
    expect(loadingContent).toBeInTheDocument();
  });

  test('should show error on error', async () => {
    // Arrange
    const error = new ApolloError({});
    const mockUseMeActivity = jest.fn(() => ({ ...mockUseActivitiesData, error }));
    mockedUseMeActivities.mockImplementation(mockUseMeActivity);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <ActivityPage {...pageProps} />),
      ),
    );
    const errorContent = screen.getByTestId('error-page-text');

    // Assert
    expect(errorContent).toBeInTheDocument();
  });
});
