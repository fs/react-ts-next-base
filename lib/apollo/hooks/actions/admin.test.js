import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import DestroyAdmin from 'graphql/mutations/destroyAdmin.graphql';
import CreateAdmin from 'graphql/mutations/createAdmin.graphql';
import UpdateAdminAccount from 'graphql/mutations/updateAdminAccount.graphql';

import { mockAdmins } from '__tests__/mocks/mockAdmins';

import useNotifier from 'hooks/useNotifier';
import { useDestroyAdmin, useCreateAdmin, useUpdateAdminAccount } from './admin';

jest.mock('hooks/useNotifier');

describe('Admins mutations', () => {
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setError: jest.fn(),
      setSuccess: jest.fn(),
    })),
  );

  describe('useDestroyAdmin', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockUserId = '1';
      const mockResult = { message: '' };
      const mockAdminEmail = 'test@test.com';
      const data = {
        userId: mockUserId,
      };

      const mocks = [
        {
          request: {
            query: DestroyAdmin,
            variables: { input: data },
          },
          result: {
            data: { destroyAdmin: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useDestroyAdmin({ userId: mockUserId, email: mockAdminEmail }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.destroyAdmin).toEqual(mockResult);
      });
    });
  });

  describe('useCreateAdmin', () => {
    test('should mutate state', async () => {
      // Arrange
      const { firstName, lastName, middleName, email, phoneNumber } = mockAdmins[0];
      const data = {
        firstName,
        lastName,
        middleName,
        email,
        phoneNumber,
      };

      const mocks = [
        {
          request: {
            query: CreateAdmin,
            variables: { input: data },
          },
          result: {
            data: { createAdmin: mockAdmins[0] },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateAdmin({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createAdmin).toEqual(mockAdmins[0]);
      });
    });
  });

  describe('useUpdateAdminAccount', () => {
    test('should mutate state', async () => {
      // Arrange
      const { email, phoneNumber } = mockAdmins[0];
      const data = {
        email,
        phoneNumber,
        currentPassword: 'test',
      };

      const mocks = [
        {
          request: {
            query: UpdateAdminAccount,
            variables: { input: data },
          },
          result: {
            data: { updateAdminAccount: mockAdmins[0] },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateAdminAccount(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateAdminAccount).toEqual(mockAdmins[0]);
      });
    });
  });
});
