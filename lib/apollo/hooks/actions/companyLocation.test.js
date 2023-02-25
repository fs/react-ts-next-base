import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import AcceptCompanyLocation from 'graphql/mutations/acceptCompanyLocation.graphql';
import RejectCompanyLocation from 'graphql/mutations/rejectCompanyLocation.graphql';
import UpdateCompanyLocation from 'graphql/mutations/updateCompanyLocation.graphql';
import CreateCompanyLocations from 'graphql/mutations/createCompanyLocations.graphql';
import DestroyCompanyLocation from 'graphql/mutations/destroyCompanyLocation.graphql';
import MarkCompanyLocationAsMain from 'graphql/mutations/markCompanyLocationAsMain.graphql';
import DestroyCustomerCompanyLocation from 'graphql/mutations/destroyCustomerCompanyLocation.graphql';

import { mockLocations } from '__tests__/mocks/mockLocations';

import useNotifier from 'hooks/useNotifier';

import {
  useCreateCompanyLocations,
  useDestroyCompanyLocation,
  useUpdateCompanyLocation,
  useMarkCompanyLocationAsMain,
  useAcceptCompanyLocation,
  useRejectCompanyLocation,
  useDestroyCustomerCompanyLocation,
} from './companyLocation';

jest.mock('hooks/useNotifier');

describe('CompanyLocation mutations', () => {
  const mockSetSuccess = jest.fn();
  const mockSetError = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setSuccess: mockSetSuccess,
      setError: mockSetError,
    })),
  );

  describe('useCreateCompanyLocations', () => {
    test('should  mutate state', async () => {
      // Arrange
      const {
        city: { id: cityId },
        address,
        phoneNumber,
        comment,
        postcode,
        companyLicenses,
      } = mockLocations[0];
      const expectedCompanyLocations = [
        {
          cityId,
          comment,
          phoneNumber,
          postcode,
          address,
          companyLicenses,
        },
      ];
      const expectedCompanyId = '1';

      const data = {
        companyId: expectedCompanyId,
        companyLocations: expectedCompanyLocations,
      };

      const mocks = [
        {
          request: {
            query: CreateCompanyLocations,
            variables: { input: data },
          },
          result: {
            data: { createCompanyLocations: mockLocations },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useCreateCompanyLocations({ companyId: expectedCompanyId }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createCompanyLocations).toEqual(mockLocations);
      });
    });
  });

  describe('useUpdateCompanyLocation', () => {
    test('should  mutate state', async () => {
      // Arrange
      const {
        city: { id: cityId },
        address,
        phoneNumber,
        comment,
        postcode,
        companyLicenses,
      } = mockLocations[0];
      const expectedCompanyLocationId = '29';

      const data = {
        companyLocationId: expectedCompanyLocationId,
        cityId,
        address,
        postcode,
        phoneNumber,
        comment,
        companyLicenses,
      };

      const mocks = [
        {
          request: {
            query: UpdateCompanyLocation,
            variables: { input: data },
          },
          result: {
            data: { updateCompanyLocation: mockLocations[0] },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateCompanyLocation(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateCompanyLocation).toEqual(mockLocations[0]);
      });
    });
  });

  describe('useDestroyCompanyLocation', () => {
    test('should  mutate state', async () => {
      // Arrange
      const expectedCompanyLocationId = '29';

      const data = {
        companyLocationId: expectedCompanyLocationId,
      };

      const expectedDestroyCompanyLocation = { id: expectedCompanyLocationId };

      const mocks = [
        {
          request: {
            query: DestroyCompanyLocation,
            variables: { input: data },
          },
          result: {
            data: { destroyCompanyLocation: expectedDestroyCompanyLocation },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useDestroyCompanyLocation(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(expectedCompanyLocationId));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.destroyCompanyLocation).toEqual(
          expectedDestroyCompanyLocation,
        );
      });
    });
  });

  describe('useMarkCompanyLocationAsMain', () => {
    test('should  mutate state', async () => {
      // Arrange
      const expectedCompanyLocationId = '29';

      const data = {
        companyLocationId: expectedCompanyLocationId,
      };

      const expectedMarkCompanyLocationAsMain = { id: expectedCompanyLocationId };

      const mocks = [
        {
          request: {
            query: MarkCompanyLocationAsMain,
            variables: { input: data },
          },
          result: {
            data: { markCompanyLocationAsMain: expectedMarkCompanyLocationAsMain },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useMarkCompanyLocationAsMain(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(expectedCompanyLocationId));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.markCompanyLocationAsMain).toEqual(
          expectedMarkCompanyLocationAsMain,
        );
      });
    });
  });

  describe('useAcceptCompanyLocation', () => {
    test('should  mutate state', async () => {
      // Arrange
      const expectedCompanyLocationId = 1;
      const mockOnSubmit = jest.fn();

      const data = {
        companyLocationId: expectedCompanyLocationId,
      };

      const expectedAcceptCompanyLocationData = { id: expectedCompanyLocationId };

      const mocks = [
        {
          request: {
            query: AcceptCompanyLocation,
            variables: { input: data },
          },
          result: {
            data: { acceptCompanyLocation: expectedAcceptCompanyLocationData },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useAcceptCompanyLocation({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(expectedCompanyLocationId));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.acceptCompanyLocation).toEqual(
          expectedAcceptCompanyLocationData,
        );
      });

      expect(mockSetSuccess).toHaveBeenCalledWith('Адрес успешно подтвержден.');
    });
  });

  describe('useRejectCompanyLocation', () => {
    test('should  mutate state', async () => {
      // Arrange
      const expectedCompanyLocationId = 1;
      const mockRejectionReason = 'rejectionReason';
      const mockOnSubmit = jest.fn();

      const data = {
        companyLocationId: expectedCompanyLocationId,
        rejectionReason: mockRejectionReason,
      };

      const expectedRejectCompanyLocationData = { id: expectedCompanyLocationId };

      const mocks = [
        {
          request: {
            query: RejectCompanyLocation,
            variables: { input: data },
          },
          result: {
            data: { rejectCompanyLocation: expectedRejectCompanyLocationData },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useRejectCompanyLocation({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() =>
        execute({
          companyLocationId: expectedCompanyLocationId,
          rejectionReason: mockRejectionReason,
        }),
      );

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.rejectCompanyLocation).toEqual(
          expectedRejectCompanyLocationData,
        );
      });
      // Assert

      expect(mockSetSuccess).toHaveBeenCalledWith(
        'Запрос на внесение изменений успешно отправлен.',
      );
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe('useDestroyCustomerCompanyLocation', () => {
    test('should  mutate state', async () => {
      // Arrange
      const expectedCompanyLocationId = 1;
      const mockOnSubmit = jest.fn();

      const data = {
        companyLocationId: expectedCompanyLocationId,
      };

      const expectedDestroyCustomerCompanyLocationData = { id: expectedCompanyLocationId };

      const mocks = [
        {
          request: {
            query: DestroyCustomerCompanyLocation,
            variables: { input: data },
          },
          result: {
            data: { destroyCustomerCompanyLocation: expectedDestroyCustomerCompanyLocationData },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useDestroyCustomerCompanyLocation({ onSubmit: mockOnSubmit }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(expectedCompanyLocationId));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.destroyCustomerCompanyLocation).toEqual(
          expectedDestroyCustomerCompanyLocationData,
        );
      });

      expect(mockSetSuccess).toHaveBeenCalledWith('Адрес успешно удален');
    });
  });
});
