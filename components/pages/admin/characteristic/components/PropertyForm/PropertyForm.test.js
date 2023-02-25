import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import {
  useDestroyProperty,
  useUpdateDictionaryProperty,
  useUpdateStringProperty,
  useUpdateIntegerProperty,
} from 'lib/apollo/hooks/actions/properties';
import { useDictionaryPropertyOptions } from 'lib/apollo/hooks/state/dictionaryPropertyOptions';

import { mockDictionaryPropertyOptions } from '__tests__/mocks/mockDictionaryPropertyOptions';
import { mockProperties } from '__tests__/mocks/mockProperties';
import { PROPERTY_TYPE } from 'config/constants/properties';
import PropertyForm from './PropertyForm';

jest.mock('lib/apollo/hooks/actions/properties');
jest.mock('lib/apollo/hooks/state/dictionaryPropertyOptions');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('PropertyForm', () => {
  const [mockProperty] = mockProperties;

  const mockDestroyProperty = jest.fn(() => Promise.resolve());
  const mockUseDestroyProperty = jest.fn(() => [mockDestroyProperty]);
  useDestroyProperty.mockImplementation(mockUseDestroyProperty);

  const mockUpdateDictionaryProperty = jest.fn(() => Promise.resolve());
  const mockUseUpdateDictionaryProperty = jest.fn(() => [mockUpdateDictionaryProperty]);
  useUpdateDictionaryProperty.mockImplementation(mockUseUpdateDictionaryProperty);

  const mockUpdateStringProperty = jest.fn(() => Promise.resolve());
  const mockUseUpdateStringProperty = jest.fn(() => [mockUpdateStringProperty]);
  useUpdateStringProperty.mockImplementation(mockUseUpdateStringProperty);

  const mockUpdateIntegerProperty = jest.fn(() => Promise.resolve());
  const mockUseUpdateIntegerProperty = jest.fn(() => [mockUpdateIntegerProperty]);
  useUpdateIntegerProperty.mockImplementation(mockUseUpdateIntegerProperty);

  const mockUseDictionaryPropertyOptions = jest.fn(() => ({
    dictionaryPropertyOptions: mockDictionaryPropertyOptions,
  }));
  useDictionaryPropertyOptions.mockImplementation(mockUseDictionaryPropertyOptions);

  test('should call useDestroyProperty on destroy button click', async () => {
    // Arrange
    const mockNotUsedProperty = {
      ...mockProperty,
      canDestroy: {
        value: true,
      },
    };
    const user = userEvent.setup();
    // Act
    render(
      renderWithApolloClient(
        renderWithTheme(renderWithNiceModal(<PropertyForm property={mockNotUsedProperty} />)),
      ),
    );
    const destroyButton = screen.getByTestId('destroy-property-button');
    await user.click(destroyButton);

    const confirmButton = screen.getByTestId('confirm-modal-button');
    await user.click(confirmButton);

    // Assert
    await waitFor(() => {
      expect(mockUseDestroyProperty).toHaveBeenCalled();
      expect(mockDestroyProperty).toHaveBeenCalledWith({ propertyId: mockProperty.id });
    });
  });

  test('should call useUpdateDictionaryProperty on submit dictionary property', async () => {
    // Arrange
    const user = userEvent.setup();
    const name = 'name-for-admin';
    const displayName = 'name-for-user';
    const optionName = 'option-name';

    const mockIntegerProperty = {
      ...mockProperty,
      __typename: PROPERTY_TYPE.DICTIONARY_PROPERTY,
    };

    render(
      renderWithApolloClient(
        renderWithTheme(renderWithNiceModal(<PropertyForm property={mockIntegerProperty} />)),
      ),
    );

    // Act

    const addOptionButton = screen.getByTestId('add-option-button');
    await user.click(addOptionButton);

    const optionInput = screen.getByTestId('property-option-input');
    const nameInput = screen.getByTestId('name');
    const displayNameInput = screen.getByTestId('display-name');

    await user.clear(nameInput);
    await user.clear(displayNameInput);

    await user.type(nameInput, name);
    await user.type(displayNameInput, displayName);
    await user.type(optionInput, optionName);

    const updateButton = screen.getByTestId('edit-property-button');
    await user.click(updateButton);

    const confirmButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmButton);

    // Assert
    expect(mockUseUpdateDictionaryProperty).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockUpdateDictionaryProperty).toHaveBeenCalled();
    });
  });

  test('should call useUpdateStringProperty on submit string property', async () => {
    // Arrange
    const user = userEvent.setup();
    const name = 'name-for-admin';
    const displayName = 'name-for-user';

    const mockIntegerProperty = {
      ...mockProperty,
      __typename: PROPERTY_TYPE.STRING_PROPERTY,
    };

    render(
      renderWithApolloClient(
        renderWithTheme(renderWithNiceModal(<PropertyForm property={mockIntegerProperty} />)),
      ),
    );

    // Act
    const nameInput = screen.getByTestId('name');
    const displayNameInput = screen.getByTestId('display-name');

    await user.clear(nameInput);
    await user.clear(displayNameInput);

    await user.type(nameInput, name);
    await user.type(displayNameInput, displayName);

    const updateButton = screen.getByTestId('edit-property-button');
    await user.click(updateButton);

    const confirmButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmButton);

    // Assert
    expect(mockUseUpdateStringProperty).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockUpdateStringProperty).toHaveBeenCalled();
    });
  });

  test('should call useUpdateIntegerProperty on submit integer property', async () => {
    // Arrange
    const user = userEvent.setup();
    const name = 'name-for-admin';
    const displayName = 'name-for-user';

    const mockIntegerProperty = {
      ...mockProperty,
      __typename: PROPERTY_TYPE.INTEGER_PROPERTY,
    };

    render(
      renderWithApolloClient(
        renderWithTheme(renderWithNiceModal(<PropertyForm property={mockIntegerProperty} />)),
      ),
    );

    // Act
    const nameInput = screen.getByTestId('name');
    const displayNameInput = screen.getByTestId('display-name');

    await user.clear(nameInput);
    await user.clear(displayNameInput);

    await user.type(nameInput, name);
    await user.type(displayNameInput, displayName);

    const updateButton = screen.getByTestId('edit-property-button');
    await user.click(updateButton);

    const confirmButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmButton);

    // Assert
    expect(mockUseUpdateIntegerProperty).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockUpdateIntegerProperty).toHaveBeenCalled();
    });
  });
});
