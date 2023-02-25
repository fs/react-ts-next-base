import { useLazyQuery } from '@apollo/client';

import mockDadataOrganization from '__tests__/mocks/mockDadataOrganization';
import mockError from '__tests__/mocks/mockError';

import DadataOrgnization from 'graphql/queries/dadataOrganization.graphql';

import { useDadataOrganization } from './dadataOrganization';

jest.mock('@apollo/client');

describe('useDadataOrganization', () => {
  const mockLoadData = jest.fn();

  test('should return dadataOrganization data', async () => {
    // Arrange
    const expectedData = {
      orgInfo: mockDadataOrganization,
      loading: false,
      error: undefined,
      called: false,
      loadDadataOrg: mockLoadData,
    };
    const mockUseLazyQuery = jest.fn(() => [
      mockLoadData,
      {
        data: {
          dadataOrganization: mockDadataOrganization,
        },
        loading: false,
        called: false,
        error: undefined,
      },
    ]);

    useLazyQuery.mockImplementation(mockUseLazyQuery);

    // Act
    const actualData = useDadataOrganization();

    // Assert
    expect(actualData).toEqual(expectedData);
    expect(mockUseLazyQuery).toHaveBeenCalledWith(DadataOrgnization, {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    });
  });

  test('should return error', () => {
    const expectedData = {
      orgInfo: null,
      loading: false,
      error: mockError,
      called: false,
      loadDadataOrg: mockLoadData,
    };

    const mockUseLazyQuery = jest.fn(() => [
      mockLoadData,
      {
        data: null,
        loading: false,
        called: false,
        error: mockError,
      },
    ]);

    useLazyQuery.mockImplementation(mockUseLazyQuery);

    // Act
    const actualData = useDadataOrganization();

    // Assert
    expect(actualData).toEqual(expectedData);
  });
});
