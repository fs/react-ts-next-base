import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import CustomerCompanies from 'graphql/queries/customerCompanies.graphql';

import { mockCustomerCompaniesData, mockCompanies } from '__tests__/mocks/mockCompanies';

import { NOT_VERIFIED } from 'config/constants/status';

import { useCustomerCompanies } from './customerCompanies';

describe('useCustomerCompanies', () => {
  test('should return customerCompanies data', async () => {
    // Arrange
    const mockQuery = {
      deleted: false,
      statuses: [NOT_VERIFIED],
      officialName: '',
      directions: [],
      urgent: false,
      first: 16,
      after: '',
      companyId: '1',
    };

    const variables = {
      deleted: false,
      statuses: [NOT_VERIFIED],
      officialName: '',
      directions: [],
      urgent: false,
      first: 16,
      after: '',
      companyIds: ['1'],
    };

    const mocks = [
      {
        request: {
          query: CustomerCompanies,
          variables,
        },
        result: {
          data: mockCustomerCompaniesData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCustomerCompanies(mockQuery), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.customerCompanies).toEqual(mockCompanies);
    });
  });

  test('should return error', async () => {
    // Arrange
    const variables = {
      statuses: ['incorrect status'],
    };

    const error = new Error();

    const mocks = [
      {
        request: {
          query: CustomerCompanies,
          variables,
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(() => useCustomerCompanies(variables), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
