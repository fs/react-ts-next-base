import React from 'react';
import { screen, render } from '@testing-library/react';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useRouter from 'hooks/useRouter';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

jest.mock('hooks/useRouter');
describe('SearchForm', () => {
  const expectedText = 'test';
  const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockPushRoute = jest.fn();
  const mockUseRouter = jest.fn(() => ({
    ...mockUseRouterData,
    pushRoute: mockPushRoute,
  }));
  mockedUseRouter.mockImplementation(mockUseRouter);

  test('should call onSubmit on submit', async () => {
    // Arrange
    render(renderWithTheme(renderWithApolloClient(<SearchForm />)));

    // Act
    const user = userEvent.setup();
    const input = screen.getByTestId('search-input');
    await user.type(input, expectedText);
    const searchButton = screen.getByTestId('search-button');
    await user.click(searchButton);

    // Assert
    expect(mockPushRoute).toHaveBeenCalledWith({
      query: {
        searchQuery: expectedText,
      },
    });
  });

  test('should clear the input on remove button click', async () => {
    // Arrange
    render(renderWithTheme(renderWithApolloClient(<SearchForm />)));

    // Act
    const user = userEvent.setup();
    const input = screen.getByTestId('search-input');
    await user.type(input, expectedText);
    const clearButton = screen.getByTestId('clear-input-button-searchQuery');
    await user.click(clearButton);

    // Assert
    expect(mockPushRoute).toHaveBeenCalledWith({
      query: {
        searchQuery: null,
      },
    });
  });
});
