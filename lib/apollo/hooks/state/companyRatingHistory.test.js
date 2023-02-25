import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import CompanyRatingHistory from 'graphql/queries/companyRatingHistory.graphql';

import { mockRatingHistory } from '__tests__/mocks/mockRatingHistory';
import { useCompanyRatingHistory } from './companyRatingHistory';

describe('useCompanyRatingHistory', () => {
  const companyId = '1';

  test('should return companyRatingHistory data', async () => {
    // Arrange
    const variables = {
      companyId,
    };

    const mocks = [
      {
        request: {
          query: CompanyRatingHistory,
          variables,
        },
        result: {
          data: {
            companyRatingHistory: mockRatingHistory,
          },
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCompanyRatingHistory({ companyId }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.companyRatingHistory).toEqual(mockRatingHistory);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const variables = {
      companyId,
    };
    const mocks = [
      {
        request: {
          query: CompanyRatingHistory,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCompanyRatingHistory({ companyId }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
