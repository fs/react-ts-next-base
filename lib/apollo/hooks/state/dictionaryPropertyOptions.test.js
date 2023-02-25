import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockDictionaryPropertyOptions } from '__tests__/mocks/mockDictionaryPropertyOptions';

import DictionaryPropertyOptions from 'graphql/queries/dictionaryPropertyOptions.graphql';

import { useDictionaryPropertyOptions } from './dictionaryPropertyOptions';

describe('useDictionaryPropertyOptions', () => {
  test('should return dictionaryPropertyOptions data', async () => {
    // Arrange
    const mockedPropertyId = '146';
    const mocks = [
      {
        request: {
          query: DictionaryPropertyOptions,
          variables: { propertyId: mockedPropertyId },
        },
        result: {
          data: { dictionaryPropertyOptions: mockDictionaryPropertyOptions[0] },
        },
      },
    ];

    // Act
    const { result } = renderHook(
      () => useDictionaryPropertyOptions({ propertyId: mockedPropertyId }),
      {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      },
    );

    // Assert
    await waitFor(() => {
      expect(result.current.dictionaryPropertyOptions).toEqual(mockDictionaryPropertyOptions[0]);
    });
  });

  test('should return error', async () => {
    // Arrange
    const mockedPropertyId = 'invalid Id';
    const error = new Error();

    const mocks = [
      {
        request: {
          query: DictionaryPropertyOptions,
          variables: { propertyId: mockedPropertyId },
        },
        error,
      },
    ];

    // Act
    const { result } = renderHook(
      () => useDictionaryPropertyOptions({ propertyId: mockedPropertyId }),
      {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      },
    );

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
