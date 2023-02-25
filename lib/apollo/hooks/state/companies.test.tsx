import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockCompanies, mockCompaniesData } from '__tests__/mocks/mockCompanies';
import { mockPageInfo } from '__tests__/mocks/mockPageInfo';

import { CompanyDirectionEnum, CompanyOrderEnum, CompanyStatusEnum } from 'graphql/types';
import { CompaniesDocument } from 'graphql/queries/__generated__/companies.generated';
import { useCompanies } from './companies';

describe('useCompanies', () => {
  test('should return companies data', async () => {
    // Arrange
    const mockData = {
      companyIds: ['1'],
      searchQuery: 'test',
      statuses: [CompanyStatusEnum.Verified],
      directions: [CompanyDirectionEnum.Buyer],
      orderBy: CompanyOrderEnum.Rating,
      first: 3,
    };

    const mocks = [
      {
        request: {
          query: CompaniesDocument,
          variables: mockData,
        },
        result: {
          data: mockCompaniesData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCompanies(mockData), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.companies).toEqual(mockCompanies);
      expect(result.current.pageInfo).toEqual(mockPageInfo);
    });
  });

  test('should return error', async () => {
    // Arrange
    const incorrectCompanyId = 'incorrect id';

    const error = new Error();

    const mocks = [
      {
        request: {
          query: CompaniesDocument,
          variables: {
            companyIds: [incorrectCompanyId],
          },
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCompanies({ companyIds: [incorrectCompanyId] }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
