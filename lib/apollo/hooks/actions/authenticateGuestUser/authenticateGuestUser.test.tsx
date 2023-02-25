import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import { AuthenticateGuestUserDocument } from 'graphql/mutations/__generated__/authenticateGuestUser.generated';

import useNotifier from 'hooks/useNotifier';
import useRouter from 'hooks/useRouter';
import { useAuthenticateGuestUser } from './authenticateGuestUser';

jest.mock('hooks/useNotifier');
jest.mock('hooks/useRouter');

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('Auth guest actions', () => {
  const mockUseRouter = jest.fn(() => mockUseRouterData);
  mockedUseRouter.mockImplementation(mockUseRouter);

  const mockedUseNotifier = useNotifier as jest.Mock;
  const mockSetError = jest.fn();
  mockedUseNotifier.mockImplementation(
    jest.fn(() => ({ setSuccess: jest.fn(), setError: mockSetError })),
  );

  describe('useAuthenticateGuestUser', () => {
    test('should mutate state & call localStorage.setItem', async () => {
      // Arrange
      const mocks = [
        {
          request: {
            query: AuthenticateGuestUserDocument,
          },
          result: {
            data: { authenticateGuestUser: { me: { ...mockCurrentUser } } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useAuthenticateGuestUser(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute());

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.authenticateGuestUser).toEqual({
          me: { ...mockCurrentUser },
        });
      });
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });
});
