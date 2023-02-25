import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';

import useNotifier from 'hooks/useNotifier';

import CreateCategory from 'graphql/mutations/createCategory.graphql';
import UpdateCategory from 'graphql/mutations/updateCategory.graphql';
import DestroyCategory from 'graphql/mutations/destroyCategory.graphql';

import { mockCategories } from '__tests__/mocks/mockCategories';

import {
  DEPTH_DECLENSION_SINGULAR_DICTIONARY,
  DEPTH_DECLENSION_DICTIONARY,
} from 'config/constants/categories';

import { useCreateCategory, useUpdateCategory, useDestroyCategory } from './categoriesAdmin';

jest.mock('hooks/useNotifier');

describe('categoriesAdmin', () => {
  const mockSetSuccess = jest.fn();
  useNotifier.mockImplementation(() => ({
    setSuccess: mockSetSuccess,
    setError: jest.fn(),
  }));

  test('useCreateCategory should mutate state', async () => {
    // Arrange
    const data = {
      parentId: 1,
      name: 'Всякая всячина',
    };
    const depth = 1;
    const depthName = DEPTH_DECLENSION_SINGULAR_DICTIONARY[depth];

    const mockedResultData = {
      createCategory: { ...mockCategories[0], ...data },
    };

    const mocks = [
      {
        request: {
          query: CreateCategory,
          variables: { input: data },
        },
        result: {
          data: mockedResultData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useCreateCategory({ depthName }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    const execute = result.current[0];
    setTimeout(() => execute(data));

    // Assert
    await waitFor(() => {
      expect(result.current[1].data).toEqual(mockedResultData);
    });

    expect(mockSetSuccess).toHaveBeenCalledWith(
      `Вы создали ${depthName.toLowerCase()} "${data.name}"`,
    );
  });

  test('useDestroyCategory should mutate state', async () => {
    // Arrange
    const data = {
      categoryId: 1,
    };
    const name = 'Всякая всячина';
    const depth = 1;
    const depthName = DEPTH_DECLENSION_SINGULAR_DICTIONARY[depth];

    const mockedResultData = {
      destroyCategory: { message: '', category: { name } },
    };

    const mocks = [
      {
        request: {
          query: DestroyCategory,
          variables: { input: data },
        },
        result: {
          data: mockedResultData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useDestroyCategory({ depthName }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    const execute = result.current[0];
    setTimeout(() => execute(data));

    // Assert
    await waitFor(() => {
      expect(result.current[1].data).toEqual(mockedResultData);
    });
    expect(mockSetSuccess).toHaveBeenCalledWith(`Вы удалили ${depthName.toLowerCase()} "${name}"`);
  });

  test('useUpdateCategory should mutate state', async () => {
    // Arrange
    const depth = 0;
    const depthName = DEPTH_DECLENSION_DICTIONARY[depth];
    const previousName = 'была такая всячина';
    const data = {
      categoryId: 1,
      name: 'Всякая всячина',
    };

    const mockedResultData = {
      updateCategory: { ...mockCategories[0], ...data },
    };

    const mocks = [
      {
        request: {
          query: UpdateCategory,
          variables: { input: data },
        },
        result: {
          data: mockedResultData,
        },
      },
    ];

    // Act
    const { result } = renderHook(() => useUpdateCategory({ depthName, previousName }), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    const execute = result.current[0];
    setTimeout(() => execute(data));

    // Assert
    await waitFor(() => {
      expect(result.current[1].data).toEqual(mockedResultData);
    });

    expect(mockSetSuccess).toHaveBeenCalledWith(
      `Вы изменили название ${depthName.toLowerCase()} "${previousName}" на "${data.name}"`,
    );
  });
});
