import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';

import { CompanyAnalyticalAccountPage } from './CompanyAnalyticalAccountPage';

jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CompanyAnalyticalAccountPage', () => {
  const expectedCompanyId = '1';
  const query = { companyId: expectedCompanyId };

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));
  useCompanySidebar.mockImplementation(jest.fn(() => mockUseCompanySidebarData));

  test('should render correctly', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <CompanyAnalyticalAccountPage {...pageProps} query={query} />
        )),
      ),
    );
    const companyAnalyticalAccountPage = screen.getByTestId('company-analytical-account-page');

    // Assert
    expect(companyAnalyticalAccountPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [expectedCompanyId] });
    });
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockUseMyCompanies = jest.fn(() => ({
      myCompanies: mockMyCompanies,
      loading: true,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <CompanyAnalyticalAccountPage {...pageProps} query={query} />
        )),
      ),
    );
    const loader = screen.getByTestId('company-analytical-account-loader');

    // Assert
    await waitFor(() => expect(loader).toBeInTheDocument());
  });
});
