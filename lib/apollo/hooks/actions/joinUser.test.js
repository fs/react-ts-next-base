import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import JoinUser from 'graphql/mutations/joinUser.graphql';
import useNotifier from 'hooks/useNotifier';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import { useJoinUser } from './joinUser';

jest.mock('hooks/useNotifier');

describe('joinUser', () => {
  useNotifier.mockImplementation(() => ({ setSuccess: jest.fn(), setError: jest.fn() }));

  test('should mutate state', async () => {
    // Arrange
    const data = {
      firstName: 'test',
      lastName: 'test',
      middleName: 'test',
      phoneNumber: 'test',
      smsCode: 'test',
    };
    const mocks = [
      {
        request: {
          query: JoinUser,
          variables: { input: data },
        },
        result: {
          data: { joinUser: mockCurrentUser },
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useJoinUser(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    const execute = result.current[0];
    setTimeout(() => execute(data));

    // Assert
    await waitFor(() => {
      expect(result.current[1].data.joinUser).toEqual(mockCurrentUser);
    });
  });
});
