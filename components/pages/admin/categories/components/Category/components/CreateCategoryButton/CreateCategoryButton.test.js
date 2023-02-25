import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import { useCreateCategory } from 'lib/apollo/hooks/actions/categoriesAdmin';
import userEvent from '@testing-library/user-event';
import CreateCategoryButton from './CreateCategoryButton';

jest.mock('lib/apollo/hooks/actions/categoriesAdmin');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateCategoryButton', () => {
  const mockCreateCategory = jest.fn();
  const mockUseCreateCategory = jest.fn(() => [mockCreateCategory]);
  useCreateCategory.mockImplementation(mockUseCreateCategory);

  test('should call useCreateCategory on submit', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockParentId = null;
    const mockOnCompleted = jest.fn();
    const mockCategoryName = 'new category';
    const expectedData = { name: mockCategoryName, parentId: mockParentId };

    // Act
    render(
      renderWithTheme(
        renderWithNiceModal(
          renderWithApolloClient(
            <CreateCategoryButton depth={0} onCompleted={mockOnCompleted} parentId={null} />,
          ),
        ),
      ),
    );
    const createCategoryButton = screen.getByTestId('create-category-button');
    await user.click(createCategoryButton);

    const categoryNameInput = screen.getByTestId('name');
    await user.type(categoryNameInput, mockCategoryName);

    const confirmButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmButton);

    // Assert
    expect(mockUseCreateCategory).toHaveBeenCalled();
    expect(mockCreateCategory).toHaveBeenCalledWith(expectedData);
  });
});
