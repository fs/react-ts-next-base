import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { useCompanyRatingHistory } from 'lib/apollo/hooks/state/companyRatingHistory';

import { mockRatingHistory } from '__tests__/mocks/mockRatingHistory';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import CompanyReviews from './CompanyReviews';

jest.mock('lib/apollo/hooks/state/companyRatingHistory');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CompanyReviews', () => {
  const companyId = '1';

  const mockCompany = {
    unofficialName: undefined,
    id: companyId,
  };

  test('should call useCompanyRatingHistory', async () => {
    // Arrange
    const mockUseCompanyRatingHistory = jest.fn(() => ({
      companyRatingHistory: mockRatingHistory,
      loading: undefined,
    }));
    useCompanyRatingHistory.mockImplementation(mockUseCompanyRatingHistory);

    // Act
    render(renderWithTheme(renderWithApolloClient(<CompanyReviews company={mockCompany} />)));

    // Assert
    await waitFor(() => {
      expect(mockUseCompanyRatingHistory).toHaveBeenCalledWith({ companyId });
    });
  });
});
