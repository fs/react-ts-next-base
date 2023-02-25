import React from 'react';
import { ApolloError } from '@apollo/client';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import useCurrentUser from 'hooks/useCurrentUser';
import { useCompanyLegalForms } from 'lib/apollo/hooks/state/legalForms';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockLegalForms } from '__tests__/mocks/mockCompany';
import { mockUseCurrentUserRegisteredData } from '__tests__/mocks/mockCurrentUser';

import { TPageProps } from 'lib/apollo/types';
import { useOrdersSummary } from 'lib/apollo/hooks/state/orders';

import { CreateCompanyPage } from './CreateCompanyPage';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/actions/companyMember');
jest.mock('lib/apollo/hooks/state/legalForms');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/clientSideState');

const mockedUseOrdersSummary = useOrdersSummary as jest.MockedFunction<typeof useOrdersSummary>;
const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;
const mockedUseCompanyLegalForms = useCompanyLegalForms as jest.MockedFunction<
  typeof useCompanyLegalForms
>;
const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;

describe('CreateCompanyPage', () => {
  const mockUseCity = jest.fn(() => ({
    city: '',
    setCity: () => {},
    isFirstCheck: true,
  }));
  mockedUseCity.mockImplementation(mockUseCity);

  test('should render correctly', async () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    const mockUseCompanylegalForms = jest.fn(() => ({
      legalForms: mockLegalForms,
      loading: false,
      error: new ApolloError({}),
      refetch: jest.fn(),
    }));
    mockedUseCompanyLegalForms.mockImplementation(mockUseCompanylegalForms);

    const mockUserOrdersSummary = jest.fn(() => ({
      totalCount: 0,
      refetch: jest.fn(),
      loading: false,
      error: undefined,
    }));
    mockedUseOrdersSummary.mockImplementation(mockUserOrdersSummary);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <CreateCompanyPage {...pageProps} />),
      ),
    );
    const createCompanyContainer = screen.getByTestId('create-company-page');

    // Assert
    expect(createCompanyContainer).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseCurrentUser).toHaveBeenCalled();
    });
  });
});
