import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import { mockDeepCategories } from '__tests__/mocks/mockDeepCategories';

import useRouter from 'hooks/useRouter';
import { useCategories } from 'lib/apollo/hooks/state/categories';

import CategoryBreadcrumbs from './CategoryBreadcrumbs';

jest.mock('lib/apollo/hooks/state/categories');

jest.mock('hooks/useRouter');

const categories = { categories: mockDeepCategories };
describe('CategoryBreadcrumbs', () => {
  const mockPushRoute = jest.fn();
  const mockUseRouter = jest.fn(() => ({
    query: { currentCategory: '1', subcategory: '2' },
    pushRoute: mockPushRoute,
  }));
  useRouter.mockImplementation(mockUseRouter);
  useCategories.mockImplementation(
    jest.fn(({ skip }) => {
      if (skip) {
        return { categories: [] };
      }
      return categories;
    }),
  );
  test('clicks check', async () => {
    render(renderWithTheme(renderWithApolloClient(<CategoryBreadcrumbs />)));

    const mainText = screen.getByText('Главная');
    expect(mainText).toBeInTheDocument();

    const categoryText = screen.getByText('Медицинские расходные материал');
    expect(categoryText).toBeInTheDocument();

    const subcategoryText = screen.getByText('Маски медицинские');
    expect(subcategoryText).toBeInTheDocument();

    const sectionText = screen.getByText('Маски медецинские детские');
    expect(sectionText).toBeInTheDocument();
  });
});
