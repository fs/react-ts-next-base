import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { mockAdmins, mockAdminsData } from '__tests__/mocks/mockAdmins';

import Admins from 'graphql/queries/admins.graphql';

import { useAdmins } from './admins';

describe('useAdmins', () => {
  test('should return admins data', async () => {
    // Arrange
    const ids = ['1'];

    const mocks = [
      {
        request: {
          query: Admins,
          variables: {
            ids,
          },
        },
        result: {
          data: mockAdminsData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useAdmins({ ids }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.admins).toEqual(mockAdmins);
    });
  });
});
