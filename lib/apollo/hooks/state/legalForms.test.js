import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import mockLegalForms from '__tests__/mocks/mockLegalForms';

import CompanyLegalForms from 'graphql/queries/companyLegalForms.graphql';

import { useCompanyLegalForms } from './legalForms';

describe('useCompanyLegalForms', () => {
  test('should return legalForms data', async () => {
    // Arrange
    const mocks = [
      {
        request: {
          query: CompanyLegalForms,
        },
        result: {
          data: { companyLegalForms: mockLegalForms },
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCompanyLegalForms(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.legalForms).toEqual(mockLegalForms);
    });
  });

  test('should return error', async () => {
    // Arrange
    const error = new Error();
    const mocks = [
      {
        request: {
          query: CompanyLegalForms,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCompanyLegalForms(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
