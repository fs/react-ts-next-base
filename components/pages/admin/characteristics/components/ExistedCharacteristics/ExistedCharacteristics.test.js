import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import { useProperties } from 'lib/apollo/hooks/state/properties';

import { mockPageInfo } from '__tests__/mocks/mockPageInfo';
import { mockProperties } from '__tests__/mocks/mockProperties';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import ExistedCharacteristics from './ExistedCharacteristics';

jest.mock('lib/apollo/hooks/state/properties');
jest.mock('hooks/useRouter');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('ExistedCharacteristics', () => {
  const mockUseProperties = jest.fn(() => ({
    properties: mockProperties,
    pageInfo: mockPageInfo,
    loading: true,
  }));
  useProperties.mockImplementation(mockUseProperties);

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);

  test('should render correctly ', async () => {
    // Arrange
    const mockQuery = {};
    const expectedValues = {
      first: 12,
      categoryIds: [],
      name: undefined,
    };

    // Act
    render(renderWithApolloClient(renderWithTheme(<ExistedCharacteristics query={mockQuery} />)));
    const propertiesTab = screen.getByTestId('existed-properties-tab');

    // Assert
    expect(propertiesTab).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseProperties).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should pass correct values in query', async () => {
    // Arrange
    const mockSearchQuery = 'test';
    const mockParentIdDepth1 = '3';
    const mockQuery = {
      searchQuery: mockSearchQuery,
      parentIdDepth0: '1',
      parentIdDepth1: mockParentIdDepth1,
    };
    const expectedValues = {
      first: 12,
      categoryIds: [mockParentIdDepth1],
      name: mockSearchQuery,
    };

    // Act
    render(renderWithApolloClient(renderWithTheme(<ExistedCharacteristics query={mockQuery} />)));
    const propertiesTab = screen.getByTestId('existed-properties-tab');

    // Assert
    expect(propertiesTab).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseProperties).toHaveBeenCalledWith(expectedValues);
    });
  });
});
