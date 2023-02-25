import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import useNotifier from 'hooks/useNotifier';

import CreateDictionaryProperty from 'graphql/mutations/createDictionaryProperty.graphql';
import CreateIntegerProperty from 'graphql/mutations/createIntegerProperty.graphql';
import CreateStringProperty from 'graphql/mutations/createStringProperty.graphql';

import UpdateDictionaryProperty from 'graphql/mutations/updateDictionaryProperty.graphql';
import UpdateIntegerProperty from 'graphql/mutations/updateIntegerProperty.graphql';
import UpdateStringProperty from 'graphql/mutations/updateStringProperty.graphql';

import DestroyProperty from 'graphql/mutations/destroyProperty.graphql';

import {
  useCreateDictionaryProperty,
  useCreateIntegerProperty,
  useCreateStringProperty,
  useDestroyProperty,
  useUpdateStringProperty,
  useUpdateDictionaryProperty,
  useUpdateIntegerProperty,
} from './properties';

jest.mock('hooks/useNotifier');

describe('review actions', () => {
  // Arrange
  const mockSetSuccess = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({ setSuccess: mockSetSuccess, setError: jest.fn() })),
  );

  describe('useCreateDictionaryProperty', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        name: 'name',
        displayName: 'displayName',
        categoryIds: ['1'],
        dictionaryPropertyOptions: [{ name: 'dictionaryPropertyName' }],
      };

      const mockResult = {
        name: 'name',
      };

      const mocks = [
        {
          request: {
            query: CreateDictionaryProperty,
            variables: { input: data },
          },
          result: {
            data: { createDictionaryProperty: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateDictionaryProperty(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createDictionaryProperty).toEqual(mockResult);
      });

      expect(mockSetSuccess).toHaveBeenCalledWith(
        `Характеристика "${mockResult.name}" успешно создана`,
      );
    });
  });

  describe('useCreateIntegerProperty', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        name: 'name',
        displayName: 'displayName',
        categoryIds: ['1'],
        unit: 'unit',
      };

      const mockResult = {
        name: 'name',
      };

      const mocks = [
        {
          request: {
            query: CreateIntegerProperty,
            variables: { input: data },
          },
          result: {
            data: { createIntegerProperty: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateIntegerProperty(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createIntegerProperty).toEqual(mockResult);
      });

      expect(mockSetSuccess).toHaveBeenCalledWith(
        `Характеристика "${mockResult.name}" успешно создана`,
      );
    });
  });

  describe('useCreateStringProperty', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        name: 'name',
        displayName: 'displayName',
        categoryIds: ['1'],
      };

      const mockResult = {
        name: 'name',
      };

      const mocks = [
        {
          request: {
            query: CreateStringProperty,
            variables: { input: data },
          },
          result: {
            data: { createStringProperty: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateStringProperty(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createStringProperty).toEqual(mockResult);
      });

      expect(mockSetSuccess).toHaveBeenCalledWith(
        `Характеристика "${mockResult.name}" успешно создана`,
      );
    });
  });
  describe('useDestroyProperty', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockName = 'test';
      const mockOnSubmit = jest.fn();
      const data = {
        propertyId: 1,
      };

      const mockResult = {
        message: 'test',
      };

      const mocks = [
        {
          request: {
            query: DestroyProperty,
            variables: { input: data },
          },
          result: {
            data: { destroyProperty: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useDestroyProperty({ name: mockName, onSubmit: mockOnSubmit }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.destroyProperty).toEqual(mockResult);
      });

      expect(mockSetSuccess).toHaveBeenCalledWith(`Характеристика "${mockName}" успешно удалена`);
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe('useUpdateDictionaryProperty', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        name: 'name',
        displayName: 'displayName',
        dictionaryPropertyOptions: [{ name: 'dictionaryPropertyName' }],
      };

      const mockResult = {
        name: 'name',
      };

      const mocks = [
        {
          request: {
            query: UpdateDictionaryProperty,
            variables: { input: data },
          },
          result: {
            data: { updateDictionaryProperty: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateDictionaryProperty(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateDictionaryProperty).toEqual(mockResult);
      });

      expect(mockSetSuccess).toHaveBeenCalledWith(
        `Характеристика "${mockResult.name}" успешно обновлена`,
      );
    });
  });

  describe('useUpdateIntegerProperty', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        name: 'name',
        displayName: 'displayName',
      };

      const mockResult = {
        name: 'name',
      };

      const mocks = [
        {
          request: {
            query: UpdateIntegerProperty,
            variables: { input: data },
          },
          result: {
            data: { updateIntegerProperty: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateIntegerProperty(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateIntegerProperty).toEqual(mockResult);
      });

      expect(mockSetSuccess).toHaveBeenCalledWith(
        `Характеристика "${mockResult.name}" успешно обновлена`,
      );
    });
  });

  describe('useUpdateStringProperty', () => {
    test('should mutate state', async () => {
      // Arrange
      const data = {
        name: 'name',
        displayName: 'displayName',
      };

      const mockResult = {
        name: 'name',
      };

      const mocks = [
        {
          request: {
            query: UpdateStringProperty,
            variables: { input: data },
          },
          result: {
            data: { updateStringProperty: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useUpdateStringProperty(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateStringProperty).toEqual(mockResult);
      });

      expect(mockSetSuccess).toHaveBeenCalledWith(
        `Характеристика "${mockResult.name}" успешно обновлена`,
      );
    });
  });
});
