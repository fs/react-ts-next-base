import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import updateUser from 'graphql/mutations/updateUser.graphql';
import updateUserAvatar from 'graphql/mutations/updateUserAvatar.graphql';
import DestroyAccount from 'graphql/mutations/destroyAccount.graphql';
import updateUserPassword from 'graphql/mutations/updateUserPassword.graphql';
import updateUserEmail from 'graphql/mutations/updateUserEmail.graphql';
import updateUserPhone from 'graphql/mutations/updateUserPhone.graphql';
import UpdateUserMenuItems from 'graphql/mutations/updateUserMenuItems.graphql';
import useNotifier from 'hooks/useNotifier';
import mockCurrentUser from '__tests__/mocks/mockCurrentUser';

import {
  useUpdateUser,
  useUpdateUserAvatar,
  useDestroyUserAccount,
  useUpdateUserPassword,
  useUpdateUserEmail,
  useUpdateUserPhone,
  useUpdateUserMenuItems,
} from './currentUser';

jest.mock('hooks/useNotifier');

describe('currentUser hooks', () => {
  // Arrange
  const mockUseNotifier = jest.fn(() => ({
    setError: jest.fn(),
    setSuccess: jest.fn(),
  }));
  useNotifier.mockImplementation(mockUseNotifier);

  describe('useUpdateUser', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        email: 'test.test@test.com',
        firstName: 'Test',
        lastName: 'Test',
        middleName: 'Test',
        password: null,
        currentPassword: null,
        avatar: null,
      };
      const mocks = [
        {
          request: {
            query: updateUser,
            variables: { input: data },
          },
          result: {
            data: { updateUser: mockCurrentUser },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateUser(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateUser).toEqual(mockCurrentUser);
      });
    });
  });

  describe('useUpdateUserAvatar', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = { id: '1', metadata: { filename: 'test', mimeType: 'test', size: null } };

      const mocks = [
        {
          request: {
            query: updateUserAvatar,
            variables: {
              input: {
                avatar: data,
              },
            },
          },
          result: {
            data: { updateUserAvatar: mockCurrentUser },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateUserAvatar(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateUserAvatar).toEqual(mockCurrentUser);
      });
    });
  });

  describe('useDestroyUserAccount', () => {
    test('should mutate state', async () => {
      const mockMessage = 'success';
      // Arrange
      const mocks = [
        {
          request: {
            query: DestroyAccount,
          },
          result: {
            data: { destroyAccount: { message: mockMessage } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useDestroyUserAccount(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute());

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.destroyAccount.message).toEqual(mockMessage);
      });
    });
  });

  describe('useUpdateUserPassword', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        password: null,
        currentPassword: null,
      };
      const mocks = [
        {
          request: {
            query: updateUserPassword,
            variables: { input: data },
          },
          result: {
            data: { updateUserPassword: { me: mockCurrentUser } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateUserPassword(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateUserPassword.me).toEqual(mockCurrentUser);
      });
    });
  });

  describe('useUpdateUserEmail', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        currentPassword: null,
        email: 'test.test@test.com',
        emailNotificationsDisabled: false,
        emailMailingEnabled: false,
      };
      const mocks = [
        {
          request: {
            query: updateUserEmail,
            variables: { input: data },
          },
          result: {
            data: { updateUserEmail: { ...mockCurrentUser } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateUserEmail(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateUserEmail).toEqual(mockCurrentUser);
      });
    });
  });

  describe('useUpdateUserPhone', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        currentPassword: null,
        phoneNumber: '123456789',
        smsCode: '1234',
        phoneNotificationsDisabled: false,
        phoneMailingEnabled: false,
      };
      const mockMessage = 'success';
      const mocks = [
        {
          request: {
            query: updateUserPhone,
            variables: { input: data },
          },
          result: {
            data: { updateUserPhone: mockMessage },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateUserPhone(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateUserPhone).toEqual(mockMessage);
      });
    });
  });

  describe('useUpdateUserMenuItems', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = [];
      const mocks = [
        {
          request: {
            query: UpdateUserMenuItems,
            variables: { input: { menuItems: data } },
          },
          result: {
            data: { updateUserMenuItems: mockCurrentUser },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateUserMenuItems(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateUserMenuItems).toEqual(mockCurrentUser);
      });
    });
  });
});
