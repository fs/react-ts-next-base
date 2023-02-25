import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useCompanyRatingHistory } from 'lib/apollo/hooks/state/companyRatingHistory';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockRatingHistory } from '__tests__/mocks/mockRatingHistory';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import { CompanyRatingPage } from './CompanyRatingPage';

jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/companyRatingHistory');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CompanyRating', () => {
  const query = {
    companyId: 1,
  };

  const expectedMyCompanies = mockMyCompanies.map(company => ({
    ...company,
    lastEmployeeMembers: [
      {
        id: '1',
        user: {
          id: '1',
          email: 'email@email.com',
        },
      },
    ],
  }));

  const mockUseMyCompanies = jest.fn(() => ({
    myCompanies: expectedMyCompanies,
    loading: undefined,
  }));
  useMyCompanies.mockImplementation(mockUseMyCompanies);

  const mockUseCompanyRatingHistory = jest.fn(() => ({
    companyRatingHistory: mockRatingHistory,
    loading: undefined,
  }));
  useCompanyRatingHistory.mockImplementation(mockUseCompanyRatingHistory);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));
  useCompanySidebar.mockImplementation(jest.fn(() => mockUseCompanySidebarData));

  test('should render company rating page currently', async () => {
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompanyRatingPage {...pageProps} query={query} />),
      ),
    );
    const companyRating = screen.getByTestId('company-rating-page');

    // Assert

    expect(companyRating).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [query.companyId] });
    });
  });

  test('should called useCompanyRatingHistory', async () => {
    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <CompanyRatingPage {...pageProps} query={query} />),
      ),
    );

    // Assert
    await waitFor(() => {
      expect(mockUseCompanyRatingHistory).toHaveBeenCalledWith({ companyId: query.companyId });
    });
  });
});
