import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import useNotifier from 'hooks/useNotifier';
import BlockUser from 'graphql/mutations/blockUser.graphql';
import UnblockUser from 'graphql/mutations/unblockUser.graphql';
import { mockUsers } from '__tests__/mocks/mockUsers';
import { InMemoryCache } from '@apollo/client';
import Users from 'graphql/queries/users.graphql';
import { useBlockUser, useUnblockUser } from './users';

jest.mock('hooks/useNotifier');

describe('user hooks', () => {
  const setSuccess = jest.fn();
  useNotifier.mockImplementation(jest.fn(() => ({ setSuccess, setError: jest.fn() })));

  describe('useBlockUser', () => {
    test('should mutate state', async () => {
      // Arrange
      const userIds = ['136'];
      const mocks = userIds.map(userId => ({
        request: {
          query: BlockUser,
          variables: { input: { userId } },
        },
        result: {
          data: { blockUser: { id: userId, fullName: 'Павел' } },
        },
      }));

      const cache = new InMemoryCache().restore({});
      const edges = mockUsers.map(user => ({ cursor: user.id, node: user }));

      cache.writeQuery({
        query: Users,
        data: {
          users: {
            edges,
            pageInfo: {
              endCursor: '',
              hasNextPage: null,
            },
          },
        },
      });

      // Act
      const { result } = renderHook(() => useBlockUser(() => {}), {
        wrapper: ({ children }) => (
          <MockedProvider mocks={mocks} cache={cache}>
            {children}
          </MockedProvider>
        ),
      });

      // eslint-disable-next-line no-restricted-syntax
      for await (const userId of userIds) {
        const removedEdge = edges.find(({ node }) => node.id === userId);
        const { users } = cache.readQuery({ query: Users });
        expect(users.edges).toContainEqual(removedEdge);

        const execute = result.current[0];
        setTimeout(() => execute({ userId }));

        // Assert
        await waitFor(() => {
          expect(result.current[1].data.blockUser?.id).toEqual(userId);
        });
        const { users: changedUsers } = cache.readQuery({ query: Users });
        expect(changedUsers.edges).not.toContainEqual(removedEdge);
        expect(setSuccess).toHaveBeenCalledWith('Пользователь Павел заблокирован');
      }
    });
  });

  describe('useUnblockUser', () => {
    test('should mutate state', async () => {
      // Arrange
      const userIds = ['136'];
      const mocks = userIds.map(userId => ({
        request: {
          query: UnblockUser,
          variables: { input: { userId } },
        },
        result: {
          data: { unblockUser: { id: userId, fullName: 'Василий' } },
        },
      }));

      const cache = new InMemoryCache().restore({});
      const edges = mockUsers.map(user => ({ cursor: user.id, node: user }));

      cache.writeQuery({
        query: Users,
        data: {
          users: {
            edges,
            pageInfo: {
              endCursor: '',
              hasNextPage: null,
            },
          },
        },
      });

      // Act
      const { result } = renderHook(() => useUnblockUser(() => {}), {
        wrapper: ({ children }) => (
          <MockedProvider mocks={mocks} cache={cache}>
            {children}
          </MockedProvider>
        ),
      });

      // eslint-disable-next-line no-restricted-syntax
      for await (const userId of userIds) {
        const removedEdge = edges.find(({ node }) => node.id === userId);
        const { users } = cache.readQuery({ query: Users });
        expect(users.edges).toContainEqual(removedEdge);

        const execute = result.current[0];
        setTimeout(() => execute({ userId }));

        // Assert
        await waitFor(() => {
          expect(result.current[1].data.unblockUser?.id).toEqual(userId);
        });

        const { users: changedUsers } = cache.readQuery({ query: Users });
        expect(changedUsers.edges).not.toContainEqual(removedEdge);
        expect(setSuccess).toHaveBeenCalledWith('Пользователь Василий разблокирован');
      }
    });
  });
});
