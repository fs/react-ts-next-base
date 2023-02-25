import React from 'react';
import { render, screen } from '@testing-library/react';
import useCurrentUser from 'hooks/useCurrentUser';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import { useCompanies } from 'lib/apollo/hooks/state/companies';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import { mockCompanies } from '__tests__/mocks/mockCompanies';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import mockCurrentUser from '__tests__/mocks/mockCurrentUser';

import { RATING } from 'config/constants/orders';
import { BLACKLISTED } from 'config/constants/status';
import { CompaniesBlackListPage } from './CompaniesBlackListPage';

jest.mock('hooks/useRouter');
jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/companies');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('CompaniesBlackListPage', () => {
  const mockUseCurrentUser = jest.fn(() => ({
    user: mockCurrentUser,
  }));
  useCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render CompaniesBlackListPage correctly', async () => {
    const mockUseCompanies = jest.fn(() => ({
      companies: mockCompanies,
      loading: false,
      pageInfo: mockPageInfo,
    }));

    const expectedUseCompaniesParams = {
      searchQuery: undefined,
      orderBy: RATING,
      statuses: [BLACKLISTED],
      first: 12,
    };
    useCompanies.mockImplementation(mockUseCompanies);
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompaniesBlackListPage {...pageProps} />),
      ),
    );
    const companies = await screen.findByTestId('company-card');

    // Assert
    expect(companies).toBeInTheDocument();
    expect(mockUseCompanies).toHaveBeenCalledWith(expectedUseCompaniesParams);
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockUseCompanies = jest.fn(() => ({
      companies: mockCompanies,
      loading: true,
      pageInfo: mockPageInfo,
    }));

    useCompanies.mockImplementation(mockUseCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompaniesBlackListPage {...pageProps} />),
      ),
    );
    const loader = await screen.findByTestId('loader-layout-template-content');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
