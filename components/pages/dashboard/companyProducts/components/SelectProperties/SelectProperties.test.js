import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockProperties } from '__tests__/mocks/mockProperties';
import { mockVariants } from '__tests__/mocks/mockVariants';

import SelectProperties from '.';

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('SelectProperties', () => {
  test('should open modal SelectProperties, and show no-properties message', async () => {
    // Arrange
    const mockSelectedProperties = [];

    render(
      renderWithTheme(
        renderWithApolloClient(
          <SelectProperties
            properties={mockProperties}
            selectedProperties={mockSelectedProperties}
          />,
        ),
      ),
    );

    // Act
    const buttonSelectPropertiesModal = screen.getByTestId('select-properties-modal-button');
    fireEvent.click(buttonSelectPropertiesModal);

    // Assert
    expect(screen.getByTestId('no-selected-properties')).toBeInTheDocument();
    expect(screen.getByTestId('select-properties-submit-button')).toBeInTheDocument();
  });

  test('should add and remove property', async () => {
    // Arrange
    const mockSelectedProperties = [];

    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          <SelectProperties
            properties={mockProperties}
            selectedProperties={mockSelectedProperties}
          />,
        ),
      ),
    );

    // Act
    const buttonSelectPropertiesModal = screen.getByTestId('select-properties-modal-button');
    fireEvent.click(buttonSelectPropertiesModal);
    await selectEvent.select(
      screen.getByText('Выберите характеристики товара'),
      mockProperties[0].displayName,
    );
    user.click(screen.getByTestId('checkbox-property-1'));

    // Assert
    expect(screen.getByTestId('checked-property-1')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('checked-property-1-remove'));

    // Assert
    expect(screen.getByTestId('no-selected-properties')).toBeInTheDocument();
  });

  test('should show initial selected properties', async () => {
    // Arrange
    const { id: value, displayName: label } = mockProperties[0];
    const mockSelectedProperties = [{ value, label }];

    render(
      renderWithTheme(
        renderWithApolloClient(
          <SelectProperties
            properties={mockProperties}
            selectedProperties={mockSelectedProperties}
          />,
        ),
      ),
    );

    // Act
    const buttonSelectPropertiesModal = screen.getByTestId('select-properties-modal-button');
    fireEvent.click(buttonSelectPropertiesModal);

    // Assert
    expect(screen.getByTestId('checked-property-1')).toBeInTheDocument();
  });

  test('selected properties must be disabled', async () => {
    // Arrange
    const { id: value, displayName: label } = mockProperties[0];
    const mockSelectedProperties = [{ value, label }];

    render(
      renderWithTheme(
        renderWithApolloClient(
          <SelectProperties
            properties={mockProperties}
            selectedProperties={mockSelectedProperties}
            disabledPropertiesSelect
          />,
        ),
      ),
    );

    // Act
    const buttonSelectPropertiesModal = screen.getByTestId('select-properties-modal-button');
    await fireEvent.click(buttonSelectPropertiesModal);
    // Assert
    expect(screen.getByLabelText('select-properties')).toBeDisabled();
  });

  test('should call setFieldValue onSubmit', async () => {
    // Arrange
    const { id: value, displayName: label } = mockProperties[0];
    const mockSelectedProperties = [{ value, label }];
    const mockValues = { variants: mockVariants };
    const mockSetSelectedProperties = jest.fn();
    const mockSetFieldValue = jest.fn();

    render(
      renderWithTheme(
        renderWithApolloClient(
          <SelectProperties
            properties={mockProperties}
            selectedProperties={mockSelectedProperties}
            setSelectedProperties={mockSetSelectedProperties}
            setFieldValue={mockSetFieldValue}
            values={mockValues}
          />,
        ),
      ),
    );

    // Act
    const buttonSelectPropertiesModal = screen.getByTestId('select-properties-modal-button');
    fireEvent.click(buttonSelectPropertiesModal);

    const submitButton = screen.getByTestId('select-properties-submit-button');
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockSetSelectedProperties).toHaveBeenCalledWith(mockSelectedProperties);
      expect(mockSetFieldValue).toHaveBeenCalled();
    });
  });
});
