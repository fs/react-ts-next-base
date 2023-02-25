import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';
import AcceptTransfer from 'graphql/mutations/acceptTransfer.graphql';
import useNotifier from 'hooks/useNotifier';
import { mockTransfers } from '__tests__/mocks/mockTransfers';
import { useAcceptTransfer } from './transferAdmin';

jest.mock('hooks/useNotifier');

describe('useTransfers', () => {
  useNotifier.mockImplementation(() => ({
    setSuccess: jest.fn(),
    setError: jest.fn(),
  }));

  test('should mutate state', async () => {
    // Arrange
    const transferId = '1';
    const data = {
      transferId,
    };

    const mockedAcceptResultData = {
      acceptTransfer: mockTransfers[0],
    };

    const mocks = [
      {
        request: {
          query: AcceptTransfer,
          variables: { input: data },
        },
        result: {
          data: mockedAcceptResultData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useAcceptTransfer({ transferId }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    const execute = result.current[0];
    setTimeout(() => execute(data));

    // Assert
    await waitFor(() => {
      expect(result.current[1].data).toEqual(mockedAcceptResultData);
    });
  });
});
