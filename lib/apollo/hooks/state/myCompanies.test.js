import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockMyCompanies, mockMyCompaniesData } from '__tests__/mocks/mockMyCompanies';

import MyCompanies from 'graphql/queries/myCompanies.graphql';

import { useMyCompanies } from './myCompanies';

describe('useMyCompanies', () => {
  const companyIds = ['1', '2'];

  test('should return myCompanies data', async () => {
    // Arrange
    const variables = {
      companyIds,
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

    const data = {
      myCompanies: {
        ...mockMyCompaniesData.myCompanies,
        edges: expectedMyCompanies.map(company => ({ cursor: '', node: company })),
      },
    };

    const mocks = [
      {
        request: {
          query: MyCompanies,
          variables,
        },
        result: {
          data,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useMyCompanies({ companyIds }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.myCompanies).toEqual(expectedMyCompanies);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const variables = {
      companyIds,
    };
    const mocks = [
      {
        request: {
          query: MyCompanies,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useMyCompanies({ companyIds }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
