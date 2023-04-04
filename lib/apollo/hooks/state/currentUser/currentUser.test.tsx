import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';

import { CurrentUserDocument } from 'graphql/queries/__generated__/currentUser.generated';

import { InMemoryCache } from '@apollo/client';
import { useCurrentUserHook } from './currentUser';

describe('useCurrentUser', () => {
  test('should return current profile data', async () => {
    // Arrange
    const cache = new InMemoryCache().restore({});
    cache.writeQuery({
      query: CurrentUserDocument,
      data: {
        me: mockCurrentUser,
      },
    });

    // Act
    const { result } = renderHook(() => useCurrentUserHook(), {
      wrapper: ({ children }) => <MockedProvider cache={cache}>{children}</MockedProvider>,
    });

    // Assert
    await waitFor(() => {
      expect(result.current.user).toEqual(mockCurrentUser);
    });
  });
});