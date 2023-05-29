import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import { mockPresignData } from '__tests__/mocks/mockPresignData';

import { PresignDataDocument } from 'graphql/mutations/__generated__/presignData.generated';

import { usePresignFile } from './presignFile';

describe('usePresignFile', () => {
  test('should mutate state', async () => {
    // Arrange
    const data = {
      type: 'test',
      filename: 'test',
    };
    const mocks = [
      {
        request: {
          query: PresignDataDocument,
          variables: { input: data },
        },
        result: {
          data: { presignData: mockPresignData },
        },
      },
    ];

    // Act
    const { result } = renderHook(() => usePresignFile(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    const execute = result.current[0];
    setTimeout(() => execute(data));

    // Assert
    await waitFor(() => {
      expect(result?.current[1]?.data?.presignData).toEqual(mockPresignData);
    });
  });
});
