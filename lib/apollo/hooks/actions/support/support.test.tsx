import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { CreatePublicSupportRequestDocument } from 'graphql/mutations/__generated__/createPublicSupportRequest.generated';
import { CreateSupportRequestDocument } from 'graphql/mutations/__generated__/createSupportRequest.generated';

import useNotifier from 'hooks/useNotifier';

import { publicSupportRequestMock } from '__tests__/mocks/publicSupportRequestMock';

import { useCreatePublicSupportRequest, useCreateSupportRequest } from './support';

jest.mock('hooks/useNotifier');

describe('support actions', () => {
  // Arrange
  const mockedUseNotifier = useNotifier as jest.Mock;
  mockedUseNotifier.mockImplementation(
    jest.fn(() => ({ setSuccess: jest.fn(), setError: jest.fn() })),
  );

  const mockOnSubmit = jest.fn();

  describe('useCreatePublicSupportRequest', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        email: 'test@test.com',
        subject: 'test',
        message: 'message',
        images: null,
      };
      const mocks = [
        {
          request: {
            query: CreatePublicSupportRequestDocument,
            variables: { input: data },
          },
          result: {
            data: { createPublicSupportRequest: publicSupportRequestMock },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useCreatePublicSupportRequest({ onSubmit: mockOnSubmit }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.createPublicSupportRequest).toEqual(
          publicSupportRequestMock,
        );
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });
  });

  describe('useCreateSupportRequest', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        subject: 'test',
        message: 'message',
        images: null,
      };
      const mocks = [
        {
          request: {
            query: CreateSupportRequestDocument,
            variables: { input: data },
          },
          result: {
            data: { createSupportRequest: publicSupportRequestMock },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateSupportRequest({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result?.current[1]?.data?.createSupportRequest).toEqual(publicSupportRequestMock);
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });
  });
});
