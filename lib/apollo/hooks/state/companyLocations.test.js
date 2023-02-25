import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockCustomerCompanyLocationsData, mockLocations } from '__tests__/mocks/mockLocations';
import { CompanyLocationsDocument } from 'graphql/queries/__generated__/companyLocations.generated';

import { VERIFIED } from 'config/constants/status';

import CustomerCompanyLocations from 'graphql/queries/customerCompanyLocations.graphql';

import { useCompanyLocations, useCustomerCompanyLocations } from './companyLocations';

describe('CompanyLocations', () => {
  describe('useCompanyLocations', () => {
    test('should return companyLocations data', async () => {
      // Arrange
      const data = { companyLocations: mockLocations };
      const companyId = '1';

      const mocks = [
        {
          request: {
            query: CompanyLocationsDocument,
            variables: {
              companyId,
            },
          },
          result: {
            data,
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCompanyLocations({ companyId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.locations).toEqual(data.companyLocations);
      });
    });

    test('should return error', async () => {
      // Arrange
      const incorrectCompanyId = 'incorrect id';

      const error = new Error();

      const mocks = [
        {
          request: {
            query: CompanyLocationsDocument,
            variables: {
              companyId: incorrectCompanyId,
            },
          },
          error,
        },
      ];

      // Act
      const { result } = renderHook(() => useCompanyLocations({ companyId: incorrectCompanyId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.error).toBeDefined();
      });
    });
  });
  describe('useCustomerCompanyLocations', () => {
    test('should return customerCompanyLocations data', async () => {
      // Arrange
      const mockVariables = {
        first: 12,
        companyName: 'testName',
        statuses: [VERIFIED],
      };

      const mocks = [
        {
          request: {
            query: CustomerCompanyLocations,
            variables: mockVariables,
          },
          result: {
            data: mockCustomerCompanyLocationsData,
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCustomerCompanyLocations(mockVariables), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.locations).toEqual(mockLocations);
      });
    });

    test('should return error', async () => {
      // Arrange
      const error = new Error();

      const mocks = [
        {
          request: {
            query: CustomerCompanyLocations,
          },
          error,
        },
      ];

      // Act
      const { result } = renderHook(() => useCustomerCompanyLocations({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.error).toEqual(error);
      });
    });
  });
});
