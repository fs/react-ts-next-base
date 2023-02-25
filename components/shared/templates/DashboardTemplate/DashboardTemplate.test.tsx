import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useCurrentUser from 'hooks/useCurrentUser';
import { useOrdersSummary } from 'lib/apollo/hooks/state/orders';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import {
  mockUseCurrentInvitedUser,
  mockUseCurrentUserRegisteredData,
} from '__tests__/mocks/mockCurrentUser';

import DashboardTemplate from '.';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('Dashboard Template', () => {
  const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;
  mockedUseCity.mockImplementation(jest.fn(() => mockUseCityData));

  const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;

  const mockedUseOrdersSummary = useOrdersSummary as jest.MockedFunction<typeof useOrdersSummary>;
  const mockUserOrdersSummary = jest.fn(() => ({
    totalCount: 0,
    refetch: jest.fn(),
    loading: false,
    error: undefined,
  }));
  mockedUseOrdersSummary.mockImplementation(mockUserOrdersSummary);

  test('should show content for user with phoneNumber', () => {
    const query = {};
    const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(<DashboardTemplate query={query}> content </DashboardTemplate>),
      ),
    );
    const dashboardUserInfo = screen.getByTestId('dashboard-user-info');
    const dashboardContent = screen.getByTestId('dashboard-content');

    // Assert
    expect(dashboardUserInfo).toBeInTheDocument();
    expect(dashboardContent).toBeInTheDocument();
  });

  test('should show join user form for joined new user', () => {
    const query = {};
    const mockUseCurrentUser = jest.fn(() => mockUseCurrentInvitedUser);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(<DashboardTemplate query={query}> content </DashboardTemplate>),
      ),
    );
    const joinUserForm = screen.getByTestId('join-user-form');
    const dashboardUserInfo = screen.queryByTestId('dashboard-user-info');
    const dashboardContent = screen.queryByTestId('dashboard-content');

    // Assert
    expect(joinUserForm).toBeInTheDocument();
    expect(dashboardUserInfo).not.toBeInTheDocument();
    expect(dashboardContent).not.toBeInTheDocument();
  });
});
