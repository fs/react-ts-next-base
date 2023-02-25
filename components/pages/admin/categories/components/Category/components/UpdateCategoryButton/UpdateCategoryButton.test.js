import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { useUpdateCategory } from 'lib/apollo/hooks/actions/categoriesAdmin';
import { mockCategories } from '__tests__/mocks/mockCategories';

import UpdateCategoryButton from './UpdateCategoryButton';

jest.mock('lib/apollo/hooks/actions/categoriesAdmin');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('UpdateCategoryButton', () => {
  const mockUpdateCategory = jest.fn();
  const mockUseUpdateCategory = jest.fn(() => [mockUpdateCategory]);
  useUpdateCategory.mockImplementation(mockUseUpdateCategory);

  test('should call UpdateCategoryButton on submit', async () => {
    // Arrange
    const user = userEvent.setup();
    const mcokDepth = 0;
    const mockCategoryName = 'new category';
    const [mockCategory] = mockCategories;
    const expectedData = {
      name: mockCategoryName,
      categoryId: mockCategory.id,
      depth: mcokDepth,
    };

    // Act
    render(
      renderWithTheme(
        renderWithNiceModal(
          renderWithApolloClient(
            <UpdateCategoryButton selectedCategory={mockCategory} depth={0} />,
          ),
        ),
      ),
    );
    const updateCategoryButton = screen.getByTestId('update-category-button');
    await user.click(updateCategoryButton);

    const categoryNameInput = screen.getByTestId('name');
    await user.clear(categoryNameInput);
    await user.type(categoryNameInput, mockCategoryName);

    const confirmButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmButton);

    // Assert
    expect(mockUseUpdateCategory).toHaveBeenCalled();
    expect(mockUpdateCategory).toHaveBeenCalledWith(expectedData);
  });
});
