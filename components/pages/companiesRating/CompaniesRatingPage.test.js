import React from 'react';
import { render, screen } from '@testing-library/react';
import useCurrentUser from 'hooks/useCurrentUser';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import { useCompanies } from 'lib/apollo/hooks/state/companies';
import useRouter from 'hooks/useRouter';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockCompanies } from '__tests__/mocks/mockCompanies';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import { RATING } from 'config/constants/orders';
import { VERIFIED } from 'config/constants/status';
import { SELLER } from 'config/constants/directions';

import { CompaniesRatingPage } from './CompaniesRatingPage';

jest.mock('hooks/useRouter');
jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/companies');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('CompaniesRatingPage', () => {
  const mockUseCurrentUser = jest.fn(() => ({
    user: mockCurrentUser,
  }));
  useCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should render CompaniesRatingPage correctly', async () => {
    const mockUseCompanies = jest.fn(() => ({
      companies: mockCompanies,
      loading: false,
      pageInfo: mockPageInfo,
    }));

    const expectedUseCompaniesParams = {
      searchQuery: undefined,
      orderBy: RATING,
      statuses: [VERIFIED],
      directions: [SELLER],
      first: 12,
    };
    useCompanies.mockImplementation(mockUseCompanies);
    // Act
    render(
      renderWithTheme(renderWithApolloClient(pageProps => <CompaniesRatingPage {...pageProps} />)),
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
      renderWithTheme(renderWithApolloClient(pageProps => <CompaniesRatingPage {...pageProps} />)),
    );
    const loader = await screen.findByTestId('loader-layout-template-content');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
