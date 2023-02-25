import React from 'react';
import selectEvent from 'react-select-event';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import userEvent from '@testing-library/user-event';

import {
  useCreateDictionaryProperty,
  useCreateIntegerProperty,
  useCreateStringProperty,
} from 'lib/apollo/hooks/actions/properties';
import { useCategories } from 'lib/apollo/hooks/state/categories';

import { mockCategories } from '__tests__/mocks/mockCategories';
import CreateCharacteristicForm from './CreateCharacteristicForm';

const testIds = {
  displayName: 'displayName',
  name: 'name',
  formatSelect: 'Выберите формат поля',
  categorySelect: 'Выберите категорию',
  selectorName: 'selectorName',
  submitForm: 'create-property-button',
};

jest.mock('lib/apollo/hooks/state/categories');
jest.mock('lib/apollo/hooks/actions/properties');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateCharacteristicForm', () => {
  const mockUseCategories = jest.fn(() => ({ categories: mockCategories, loading: undefined }));
  useCategories.mockImplementation(mockUseCategories);

  const mockCreateDictionaryProperty = jest.fn();
  const mockUseCreateDictionaryProperty = jest.fn(() => [mockCreateDictionaryProperty]);
  useCreateDictionaryProperty.mockImplementation(mockUseCreateDictionaryProperty);

  const mockCreateStringProperty = jest.fn();
  const mockUseCreateStringProperty = jest.fn(() => [mockCreateStringProperty]);
  useCreateStringProperty.mockImplementation(mockUseCreateStringProperty);

  const mockCreateIntegerProperty = jest.fn();
  const mockUseCreateIntegerProperty = jest.fn(() => [mockCreateIntegerProperty]);
  useCreateIntegerProperty.mockImplementation(mockUseCreateIntegerProperty);

  const mockName = 'property name';
  const mockDisplayName = 'display name';

  test('should call useCreateDictionaryProperty', async () => {
    // Arrange
    const mockSelectorName = 'selector name';
    const user = userEvent.setup();

    render(renderWithTheme(renderWithApolloClient(<CreateCharacteristicForm />)));

    // Act
    const nameInput = screen.getByTestId(testIds.name);
    const displayNameInput = screen.getByTestId(testIds.displayName);

    await user.type(nameInput, mockName);
    await user.type(displayNameInput, mockDisplayName);

    selectEvent.openMenu(await screen.findByText(testIds.formatSelect));
    await selectEvent.select(screen.getByText(testIds.formatSelect), 'Селектор');

    const selectorNameInput = screen.getByTestId(testIds.selectorName);
    await user.type(selectorNameInput, mockSelectorName);

    const categorySelect = screen.getAllByText(testIds.categorySelect)[1];
    await selectEvent.select(categorySelect, mockCategories[0].name);

    const submitFormButton = screen.getByTestId(testIds.submitForm);
    await user.click(submitFormButton);

    // Assert
    expect(mockUseCreateDictionaryProperty).toHaveBeenCalled();
    expect(mockCreateDictionaryProperty).toHaveBeenCalled();
  });

  test('should call useCreateIntegerProperty', async () => {
    // Arrange
    const user = userEvent.setup();
    render(renderWithTheme(renderWithApolloClient(<CreateCharacteristicForm />)));
    // Act
    const nameInput = screen.getByTestId(testIds.name);
    const displayNameInput = screen.getByTestId(testIds.displayName);

    await user.type(nameInput, mockName);
    await user.type(displayNameInput, mockDisplayName);

    selectEvent.openMenu(await screen.findByText(testIds.formatSelect));
    await selectEvent.select(screen.getByText(testIds.formatSelect), 'Цифры');

    const categorySelect = screen.getAllByText(testIds.categorySelect)[1];
    await selectEvent.select(categorySelect, mockCategories[0].name);

    const submitFormButton = screen.getByTestId(testIds.submitForm);
    await user.click(submitFormButton);

    // Assert
    expect(mockUseCreateIntegerProperty).toHaveBeenCalled();
    expect(mockCreateIntegerProperty).toHaveBeenCalled();
  });

  test('should call useCreateStringProperty', async () => {
    // Arrange
    const user = userEvent.setup();
    render(renderWithTheme(renderWithApolloClient(<CreateCharacteristicForm />)));
    // Act
    const nameInput = screen.getByTestId(testIds.name);
    const displayNameInput = screen.getByTestId(testIds.displayName);

    await user.type(nameInput, mockName);
    await user.type(displayNameInput, mockDisplayName);

    selectEvent.openMenu(await screen.findByText(testIds.formatSelect));
    await selectEvent.select(screen.getByText(testIds.formatSelect), 'Буквы');

    const categorySelect = screen.getAllByText(testIds.categorySelect)[1];
    await selectEvent.select(categorySelect, mockCategories[0].name);

    const submitFormButton = screen.getByTestId(testIds.submitForm);
    await user.click(submitFormButton);

    // Assert
    expect(mockUseCreateStringProperty).toHaveBeenCalled();
    expect(mockCreateStringProperty).toHaveBeenCalled();
  });
});
