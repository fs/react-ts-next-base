import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import CreateCompanyMember from 'graphql/mutations/createCompanyMember.graphql';
import DestroyCompanyMember from 'graphql/mutations/destroyCompanyMember.graphql';
import UpdateCompanyMember from 'graphql/mutations/updateCompanyMember.graphql';
import useNotifier from 'hooks/useNotifier';
import mockCompanyMember from '__tests__/mocks/mockCompanyMember';

import {
  useCreateCompanyMember,
  useDestroyCompanyMember,
  useUpdateCompanyMember,
} from './companyMember';

jest.mock('hooks/useNotifier');

const companyMember = { id: '1', email: 'test@test.com' };
describe('CompanyMember actions', () => {
  useNotifier.mockImplementation(() => ({ setSuccess: jest.fn(), setError: jest.fn() }));

  describe('useCreateCompanyMember', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        email: 'email@email.com',
        companyIds: ['1', '2'],
      };
      const mocks = [
        {
          request: {
            query: CreateCompanyMember,
            variables: { input: data },
          },
          result: {
            data: { createCompanyMember: { ...mockCompanyMember } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateCompanyMember(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createCompanyMember).toEqual(mockCompanyMember);
      });
    });
  });

  describe('useDestroyCompanyMember', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockEmail = 'email@email.com';
      const data = {
        userId: '1',
        companyIds: ['1', '2'],
      };
      const mocks = [
        {
          request: {
            query: DestroyCompanyMember,
            variables: { input: data },
          },
          result: {
            data: { destroyCompanyMember: companyMember },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useDestroyCompanyMember({ email: mockEmail }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.destroyCompanyMember).toEqual(companyMember);
      });
    });
  });

  describe('useUpdateCompanyMember', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockEmail = 'email@email.com';
      const data = {
        userId: '1',
        companyIds: ['1', '2'],
      };
      const mocks = [
        {
          request: {
            query: UpdateCompanyMember,
            variables: { input: data },
          },
          result: {
            data: { updateCompanyMember: companyMember },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateCompanyMember({ email: mockEmail }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateCompanyMember).toEqual(companyMember);
      });
    });
  });
});
