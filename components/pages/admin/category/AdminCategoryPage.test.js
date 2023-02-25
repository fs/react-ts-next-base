import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useCategory } from 'lib/apollo/hooks/state/category';
import { useProperties } from 'lib/apollo/hooks/state/properties';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockCategories } from '__tests__/mocks/mockCategories';
import { mockProperties } from '__tests__/mocks/mockProperties';

import { AdminCategoryPage } from './AdminCategoryPage';

jest.mock('lib/apollo/hooks/state/category');
jest.mock('lib/apollo/hooks/state/properties');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminCategoryPage', () => {
  const mockQuery = { categoryId: 1 };
  const [mockCategory] = mockCategories;
  const mockUseCategory = jest.fn(() => ({ category: mockCategory, loading: undefined }));
  useCategory.mockImplementation(mockUseCategory);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  const mockUseProperties = jest.fn(() => ({
    properties: mockProperties,
    loading: undefined,
  }));
  useProperties.mockImplementation(mockUseProperties);

  test('should render correctly', () => {
    // Arrange
    const mockCategoryData = { id: mockQuery.categoryId };
    const mockPropertiesData = { categoryIds: [mockQuery.categoryId] };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminCategoryPage {...pageProps} query={mockQuery} />),
      ),
    );
    const properties = screen.getAllByTestId('property-wrapper');
    const title = screen.getByTestId('admin-template-title');

    // Assert
    expect(mockUseCategory).toHaveBeenCalledWith(mockCategoryData);
    expect(mockUseProperties).toHaveBeenCalledWith(mockPropertiesData);
    expect(properties).toHaveLength(mockProperties.length);
    expect(title).toHaveTextContent(mockCategory.name);
  });

  test('should show empty message on no category properties', () => {
    // Arrange
    const mockUseEmptyProperties = jest.fn(() => ({
      properties: [],
      loading: undefined,
    }));
    useProperties.mockImplementation(mockUseEmptyProperties);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminCategoryPage {...pageProps} query={mockQuery} />),
      ),
    );
    const emptyListMessage = screen.getByTestId('empty-list-message');

    // Assert
    expect(emptyListMessage).toHaveTextContent('Здесь нет доступных характеристик');
  });

  test('should show error page on not existing category', () => {
    // Arrange
    const mockUseCategoryWithError = jest.fn(() => ({
      category: {},
      error: { message: 'error' },
      loading: undefined,
    }));
    useCategory.mockImplementation(mockUseCategoryWithError);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminCategoryPage {...pageProps} query={mockQuery} />),
      ),
    );
    const errorPage = screen.getByTestId('error-page');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });

  test('should show loader on loading', () => {
    // Arrange
    const mockUseLoadingCategory = jest.fn(() => ({ category: {}, loading: true }));
    useCategory.mockImplementation(mockUseLoadingCategory);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <AdminCategoryPage {...pageProps} query={mockQuery} />),
      ),
    );
    const loader = screen.getByTestId('admin-category-page-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
