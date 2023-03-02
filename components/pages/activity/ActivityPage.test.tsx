import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { useActivities } from 'lib/apollo/hooks/state/activity';

import { TPageProps } from 'lib/apollo/types';
import { mockUseActivitiesData } from '__tests__/mocks/mockActivities';

import { ActivityPage } from './ActivityPage';

jest.mock('lib/apollo/hooks/state/activity');

const mockedUseActivities = useActivities as jest.MockedFunction<typeof useActivities>;

describe('Activity page', () => {
  test('should render correctly', () => {
    // Arrange
    const mockUseActivity = jest.fn(() => mockUseActivitiesData);
    mockedUseActivities.mockImplementation(mockUseActivity);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <ActivityPage {...pageProps} />),
      ),
    );
    const pageContent = screen.getByTestId('activity-table');

    // Assert
    expect(pageContent).toMatchSnapshot();
  });

  test('should show loader while loading', () => {
    // Arrange
    const mockUseActivity = jest.fn(() => ({ ...mockUseActivitiesData, loading: true }));
    mockedUseActivities.mockImplementation(mockUseActivity);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <ActivityPage {...pageProps} />),
      ),
    );
    const loadingContent = screen.getByTestId('activity-loading');

    // Assert
    expect(loadingContent).toMatchSnapshot();
  });
});
