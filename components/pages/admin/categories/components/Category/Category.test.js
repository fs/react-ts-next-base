import React from 'react';
import { Formik } from 'formik';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useCategories } from 'lib/apollo/hooks/state/categories';
import { mockCategories } from '__tests__/mocks/mockCategories';

import Category from './Category';

jest.mock('lib/apollo/hooks/state/categories');
describe('Category', () => {
  const mockUseCategories = jest.fn(() => ({ categories: mockCategories, loading: undefined }));
  useCategories.mockImplementation(mockUseCategories);

  test('should call useCategories', () => {
    // Arrange
    const mockInitialValue = { categories: [] };
    const mockParentId = 1;
    const expectedData = {
      parentId: mockParentId,
    };

    // Act
    render(
      renderWithApolloClient(
        renderWithTheme(
          <Formik initialValues={mockInitialValue}>
            <Category parentId={mockParentId} />
          </Formik>,
        ),
      ),
    );

    // Assert
    expect(mockUseCategories).toHaveBeenCalledWith(expectedData);
  });

  test('should show edit & delete button if category selected', async () => {
    // Arrange
    const mockInitialValue = { categories: [mockCategories[0].id] };
    render(
      renderWithApolloClient(
        renderWithTheme(
          <Formik initialValues={mockInitialValue}>
            <Category parentId={0} />
          </Formik>,
        ),
      ),
    );

    // Act
    const updateCategoryButton = screen.getByTestId('update-category-button');
    const destroyCategoryButton = screen.getByTestId('destroy-category-button');

    // Assert
    expect(updateCategoryButton).toBeInTheDocument();
    expect(destroyCategoryButton).toBeInTheDocument();
  });
});
