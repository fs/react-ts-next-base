import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import useNotifier from 'hooks/useNotifier';
import useRouter from 'hooks/useRouter';

import { RequestPasswordRecoveryDocument } from 'graphql/mutations/__generated__/requestPasswordRecovery.generated';
import { SignInDocument } from 'graphql/mutations/__generated__/signIn.generated';
import { SignOutDocument } from 'graphql/mutations/__generated__/signOut.generated';
import { SignUpDocument } from 'graphql/mutations/__generated__/signUp.generated';
import { UpdatePasswordDocument } from 'graphql/mutations/__generated__/updatePassword.generated';

import { usePasswordRecovery, useSignIn, useSignOut, useSignUp, useUpdatePassword } from './auth';

jest.mock('hooks/useNotifier');
jest.mock('hooks/useRouter');

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedUseNotifier = useNotifier as jest.Mock;

describe('Auth actions', () => {
  const mockUseRouter = jest.fn(() => mockUseRouterData);
  mockedUseRouter.mockImplementation(mockUseRouter);

  const mockSetError = jest.fn();
  mockedUseNotifier.mockImplementation(
    jest.fn(() => ({ setSuccess: jest.fn(), setError: mockSetError })),
  );

  describe('useSignIn', () => {
    test('should mutate state & call localStorage.setItem & call pushRoute', async () => {
      // Arrange
      const data = { email: 'test', password: 'password' };
      const expectedValue = { me: mockCurrentUser, accessToken: '', refreshToken: '' };

      const mocks = [
        {
          request: {
            query: SignInDocument,
            variables: {
              input: data,
            },
          },
          result: {
            data: { signIn: expectedValue },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useSignIn(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.signIn).toEqual(expectedValue);
      });
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('useSignUp', () => {
    test('should mutate state & call localStorage.setItem & call pushRoute', async () => {
      // Arrange
      const data = {
        avatar: undefined,
        email: 'test@test.test',
        password: 'password',
        firstName: 'test',
        lastName: 'test',
      };
      const expectedValue = { me: mockCurrentUser, accessToken: '', refreshToken: '' };

      const mocks = [
        {
          request: {
            query: SignUpDocument,
            variables: {
              input: data,
            },
          },
          result: {
            data: { signUp: expectedValue },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useSignUp(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.signUp).toEqual(expectedValue);
      });
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('useSignOut', () => {
    test('should mutate state & call localStorage.setItem & call pushRoute', async () => {
      // Arrange
      const mockResponse = { message: 'success' };
      const data = {
        everywhere: false,
      };

      const mocks = [
        {
          request: {
            query: SignOutDocument,
            variables: {
              input: data,
            },
          },
          result: {
            data: { signOut: mockResponse },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useSignOut(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.signOut).toEqual(mockResponse);
      });

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('usePasswordRecovery', () => {
    test('should mutate state & return detail with correct email', async () => {
      // Arrange
      const data = {
        email: 'test@test.test',
      };

      const mockResponse = { detail: 'test', message: 'message' };
      const mocks = [
        {
          request: {
            query: RequestPasswordRecoveryDocument,
            variables: {
              input: data,
            },
          },
          result: {
            data: { requestPasswordRecovery: mockResponse },
          },
        },
      ];
      const expectedErrorMassage = undefined;

      // Act
      const { result } = renderHook(() => usePasswordRecovery(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1]).toEqual(mockResponse.detail);
        expect(result.current[2]).toEqual(expectedErrorMassage);
      });
    });

    test('should mutate state & return error with incorrect email', async () => {
      // Arrange
      const data = {
        email: 'email',
      };

      const errorMessage = 'An error occurred';
      const error = new Error(errorMessage);

      const mocks = [
        {
          request: {
            query: RequestPasswordRecoveryDocument,
            variables: {
              input: data,
            },
          },
          error,
        },
      ];

      // Act
      const { result } = renderHook(() => usePasswordRecovery(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1]).toEqual('');
        expect(result?.current[2]?.message).toEqual(errorMessage);
      });
    });
  });

  describe('useUpdatePassword', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        password: 'password',
        resetToken: 'test',
      };
      const expectedValue = { me: mockCurrentUser, accessToken: '', refreshToken: '' };

      const mocks = [
        {
          request: {
            query: UpdatePasswordDocument,
            variables: {
              input: data,
            },
          },
          result: {
            data: { updatePassword: expectedValue },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdatePassword(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.updatePassword).toEqual(expectedValue);
      });
    });
  });
});
