import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { useDestroyCategory } from 'lib/apollo/hooks/actions/categoriesAdmin';
import { mockCategories } from '__tests__/mocks/mockCategories';

import DestroyCategoryButton from './DestroyCategoryButton';

jest.mock('lib/apollo/hooks/actions/categoriesAdmin');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('DestroyCategoryButton', () => {
  const mockDestroyCategory = jest.fn();
  const mockUseDestroyCategory = jest.fn(() => [mockDestroyCategory]);
  useDestroyCategory.mockImplementation(mockUseDestroyCategory);

  test('should call useDestroyCategory on submit', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockOnCompleted = jest.fn();

    const mockCategory = { ...mockCategories[0], canDestroy: { value: true } };
    const expectedData = { categoryId: mockCategory.id };

    // Act
    render(
      renderWithTheme(
        renderWithNiceModal(
          renderWithApolloClient(
            <DestroyCategoryButton
              selectedCategory={mockCategory}
              depth={0}
              onCompleted={mockOnCompleted}
            />,
          ),
        ),
      ),
    );
    const destroyCategoryButton = screen.getByTestId('destroy-category-button');
    await user.click(destroyCategoryButton);

    const confirmButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmButton);

    // Assert
    expect(mockUseDestroyCategory).toHaveBeenCalled();
    expect(mockDestroyCategory).toHaveBeenCalledWith(expectedData);
  });

  test('destroy button should be disabled if canDestroy is false', () => {
    // Arrange
    const mockOnCompleted = jest.fn();
    const mockCategory = { ...mockCategories[0], canDestroy: { value: false } };

    // Act
    render(
      renderWithTheme(
        renderWithNiceModal(
          renderWithApolloClient(
            <DestroyCategoryButton
              selectedCategory={mockCategory}
              depth={0}
              onCompleted={mockOnCompleted}
            />,
          ),
        ),
      ),
    );
    const destroyCategoryButton = screen.getByTestId('destroy-category-button');

    // Assert
    expect(destroyCategoryButton).toBeDisabled();
  });
});
