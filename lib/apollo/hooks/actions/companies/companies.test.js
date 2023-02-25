import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import CreateCompany from 'graphql/mutations/createCompany.graphql';
import CreateWithdrawal from 'graphql/mutations/createWithdrawal.graphql';
import DestroyCompany from 'graphql/mutations/destroyCompany.graphql';
import UpdateCompanyLogo from 'graphql/mutations/updateCompanyLogo.graphql';
import UpdateCompany from 'graphql/mutations/updateCompanyData.graphql';
import MarkCompanyAsMain from 'graphql/mutations/markCompanyAsMain.graphql';
import ConfirmCompany from 'graphql/mutations/confirmCompany.graphql';
import RejectCompany from 'graphql/mutations/rejectCompany.graphql';
import UpdateRejectedCompany from 'graphql/mutations/updateRejectedCompany.graphql';
import AddCompanyToBlackList from 'graphql/mutations/addCompanyToBlackList.graphql';
import RemoveCompanyFromBlackList from 'graphql/mutations/removeCompanyFromBlackList.graphql';
import BanCompany from 'graphql/mutations/banCompany.graphql';
import UnbanCompany from 'graphql/mutations/unbanCompany.graphql';

import useNotifier from 'hooks/useNotifier';

import mockCompany, { mockBannedCompany } from '__tests__/mocks/mockCompany';

import {
  useCreateCompany,
  useDestroyCompany,
  useUpdateCompanyLogo,
  useUpdateCompanyData,
  useMarkCompanyAsMain,
  useCreateWithdrawal,
  useConfirmCompany,
  useRejectCompany,
  useUpdateRejectedCompany,
  useRemoveCompanyFromBlacklist,
  useBanCompany,
  useAddCompanyToBlackList,
  useUnbanCompany,
} from './companies';

jest.mock('hooks/useNotifier');
jest.mock('@apollo/client', () => {
  const originalModule = jest.requireActual('@apollo/client');

  return {
    __esModule: true,
    ...originalModule,
    useMutation: jest.fn().mockImplementation((document, options) => {
      const noRefetch = { ...options, refetchQueries: [] };
      return originalModule.useMutation(document, noRefetch);
    }),
  };
});

describe('companies hooks', () => {
  useNotifier.mockImplementation(jest.fn(() => ({ setSuccess: jest.fn(), setError: jest.fn() })));

  describe('useCreateCompany', () => {
    test('should mutate state', async () => {
      // Arrange
      const expectedData = {
        bankName: 'name',
        bic: '123456789',
        checkingAccount: '12345678901234567890',
        correspondentAccount: '09876543210987654321',
        email: 'test.company@test.com',
        inn: '123456789',
        kpp: '123456789',
        legalAddress: 'test',
        legalFormId: '2',
        officialName: 'test',
        ogrn: 'test',
        oktmo: '12345678',
        phoneNumber: '1234567890',
        postcode: '123456',
        taxationSystem: 'OSN',
        unofficialName: 'test',
        logo: null,
        direction: 'SELLER',
      };
      const mocks = [
        {
          request: {
            query: CreateCompany,
            variables: { input: expectedData },
          },
          result: {
            data: { createCompany: mockCompany },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateCompany({ onSubmit: jest.fn() }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(expectedData));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createCompany).toEqual(mockCompany);
      });
    });
  });

  describe('useDestroyCompany', () => {
    test('should mutate state', async () => {
      // Arrange
      const companyId = '1';
      const mockCompanyName = 'Company name';
      const mocks = [
        {
          request: {
            query: DestroyCompany,
            variables: { input: { companyId } },
          },
          result: {
            data: { destroyCompany: { message: '' } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useDestroyCompany({ companyName: mockCompanyName }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(companyId));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.destroyCompany).toEqual({ message: '' });
      });
    });
  });

  describe('useUpdateCompanyLogo', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = { companyId: '1', logo: null };
      const mocks = [
        {
          request: {
            query: UpdateCompanyLogo,
            variables: { input: data },
          },
          result: {
            data: { updateCompanyLogo: mockCompany },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateCompanyLogo(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateCompanyLogo).toEqual(mockCompany);
      });
    });
  });

  describe('useUpdateCompany', () => {
    test('should mutate state', async () => {
      // Arrange
      const { id: companyId, email, phoneNumber } = mockCompany;
      const data = { companyId, email, phoneNumber };

      const mocks = [
        {
          request: {
            query: UpdateCompany,
            variables: { input: data },
          },
          result: {
            data: { updateCompany: mockCompany },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateCompanyData({ companyId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateCompany).toEqual(mockCompany);
      });
    });
  });

  describe('useMarkCompanyAsMain', () => {
    test('should mutate state', async () => {
      const { id: companyId } = mockCompany;

      // Arrange
      const data = { companyId };
      const mockCompanyId = { id: companyId };

      const mocks = [
        {
          request: {
            query: MarkCompanyAsMain,
            variables: { input: data },
          },
          result: {
            data: { markCompanyAsMain: { id: companyId } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useMarkCompanyAsMain(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.markCompanyAsMain).toEqual(mockCompanyId);
      });
    });
  });
  describe('useCreateWithdrawal', () => {
    test('should mutate state', async () => {
      const { id: companyId } = mockCompany;

      // Arrange
      const data = {
        companyId,
        vat: 0,
        vatType: 'TAXED',
        smsCode: 111111,
      };
      const mockWithdrawal = {
        id: companyId,
        amount: 0,
        transferType: 'WITHDRAWAL',
        vat: 0,
        vatType: 'TAXED',
      };

      const mocks = [
        {
          request: {
            query: CreateWithdrawal,
            variables: { input: data },
          },
          result: {
            data: { createWithdrawal: { ...mockWithdrawal } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateWithdrawal({ companyId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createWithdrawal).toEqual(mockWithdrawal);
      });
    });
  });

  describe('useConfirmCompany', () => {
    test('should mutate state', async () => {
      // Arrange
      const { id: companyId } = mockCompany;
      const data = { companyId };

      const mocks = [
        {
          request: {
            query: ConfirmCompany,
            variables: { input: data },
          },
          result: {
            data: { confirmCompany: mockCompany },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useConfirmCompany({ companyName: mockCompany.officialName }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.confirmCompany).toEqual(mockCompany);
      });
    });
  });

  describe('useRejectCompany', () => {
    test('should mutate state', async () => {
      // Arrange
      const { id: companyId, officialName: companyName } = mockCompany;
      const fields = [
        {
          name: 'INN',
          comment: 'test',
        },
        {
          name: 'UNOFFICIAL_NAME',
          comment: 'test',
        },
      ];
      const data = { companyId, fields };

      const mocks = [
        {
          request: {
            query: RejectCompany,
            variables: { input: data },
          },
          result: {
            data: { rejectCompany: mockCompany },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useRejectCompany({ companyName, companyId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.rejectCompany).toEqual(mockCompany);
      });
    });
  });

  describe('useUpdateRejectedCompany', () => {
    test('should mutate state', async () => {
      // Arrange
      const { id: companyId, email, phoneNumber } = mockCompany;
      const data = { companyId, email, phoneNumber };

      const mocks = [
        {
          request: {
            query: UpdateRejectedCompany,
            variables: { input: data },
          },
          result: {
            data: { updateRejectedCompany: mockCompany },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateRejectedCompany({ companyId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateRejectedCompany).toEqual(mockCompany);
      });
    });
  });

  describe('useAddCompanyToBlackList', () => {
    test('should mutate state', async () => {
      const { id: companyId } = mockCompany;

      // Arrange
      const data = { companyId };
      const mockCompanyId = { id: companyId };

      const mocks = [
        {
          request: {
            query: AddCompanyToBlackList,
            variables: { input: data },
          },
          result: {
            data: { addCompanyToBlacklist: { id: companyId } },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useAddCompanyToBlackList({ companyName: mockCompany.unofficialName }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.addCompanyToBlacklist).toEqual(mockCompanyId);
      });
    });
  });

  describe('useRemoveCompanyFromBlacklist', () => {
    test('should mutate state', async () => {
      const { id: companyId } = mockCompany;

      // Arrange
      const data = { companyId };
      const mockCompanyId = { id: companyId };

      const mocks = [
        {
          request: {
            query: RemoveCompanyFromBlackList,
            variables: { input: data },
          },
          result: {
            data: { removeCompanyFromBlacklist: { id: companyId } },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useRemoveCompanyFromBlacklist({ companyName: mockCompany.unofficialName }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.removeCompanyFromBlacklist).toEqual(mockCompanyId);
      });
    });
  });

  describe('useBanCompany', () => {
    test('should mutate state', async () => {
      const { id: companyId } = mockCompany;

      // Arrange
      const data = { companyId };
      const mockCompanyData = { message: 'reason' };

      const mocks = [
        {
          request: {
            query: BanCompany,
            variables: { input: data },
          },
          result: {
            data: { banCompany: mockCompanyData },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useBanCompany({ companyName: mockCompany.unofficialName }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.banCompany).toEqual(mockCompanyData);
      });
    });
  });

  describe('useUnbanCompany', () => {
    test('should mutate state', async () => {
      const { id: companyId } = mockBannedCompany;

      // Arrange
      const data = { companyId };
      const mockCompanyId = { id: companyId };

      const mocks = [
        {
          request: {
            query: UnbanCompany,
            variables: { input: data },
          },
          result: {
            data: { unbanCompany: { id: companyId } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUnbanCompany({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.unbanCompany).toEqual(mockCompanyId);
      });
    });
  });
});
