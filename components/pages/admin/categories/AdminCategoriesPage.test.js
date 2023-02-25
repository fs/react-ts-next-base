import React from 'react';
import selectEvent from 'react-select-event';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useCategories } from 'lib/apollo/hooks/state/categories';
import useRouter from 'hooks/useRouter';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockCategories } from '__tests__/mocks/mockCategories';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import { AdminCategoriesPage } from './AdminCategoriesPage';

jest.mock('lib/apollo/hooks/state/categories');
jest.mock('hooks/useRouter');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('AdminCategoriesPage', () => {
  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);
  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  const mockUseCategories = jest.fn(() => ({ categories: mockCategories, loading: undefined }));
  useCategories.mockImplementation(mockUseCategories);

  test('should add node on category select', async () => {
    // Arrange
    render(
      renderWithTheme(renderWithApolloClient(pageProps => <AdminCategoriesPage {...pageProps} />)),
    );
    const categoriesBefore = screen.getAllByTestId('category-wrapper');

    // Act
    const categorySelect = screen.getByText('Выберите вариант');
    await selectEvent.select(categorySelect, mockCategories[0].name);

    const categoriesAfter = screen.getAllByTestId('category-wrapper');

    // Assert
    expect(categoriesAfter).toHaveLength(categoriesBefore.length + 1);
  });

  test('should remove node on category reselect', async () => {
    // Arrange
    render(
      renderWithTheme(renderWithApolloClient(pageProps => <AdminCategoriesPage {...pageProps} />)),
    );

    // Act
    const categorySelect = screen.getByText('Выберите вариант');
    await selectEvent.select(categorySelect, mockCategories[0].name);

    const subCategorySelect = screen.getByText('Выберите вариант');
    await selectEvent.select(subCategorySelect, mockCategories[1].name);

    const categoriesBefore = screen.getAllByTestId('category-wrapper');

    await selectEvent.openMenu(await screen.findByText(mockCategories[0].name));
    await selectEvent.select(
      screen.getAllByText(mockCategories[0].name)[1],
      mockCategories[1].name,
    );

    const categoriesAfter = screen.getAllByTestId('category-wrapper');

    // Assert
    expect(categoriesAfter).toHaveLength(categoriesBefore.length - 1);
  });
});
