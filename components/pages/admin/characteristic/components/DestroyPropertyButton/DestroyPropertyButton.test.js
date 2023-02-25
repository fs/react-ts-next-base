import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import { mockProperties } from '__tests__/mocks/mockProperties';
import DestroyPropertyButton from './DestroyPropertyButton';

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('DestroyPropertyButton', () => {
  const [mockProperty] = mockProperties;

  test('should be disabled if can not be destroy', () => {
    // Arrange
    render(
      renderWithApolloClient(
        renderWithTheme(
          renderWithNiceModal(
            <DestroyPropertyButton name={mockProperty.name} canBeDestroyed={false} />,
          ),
        ),
      ),
    );

    // Act
    const destroyButton = screen.getByTestId('destroy-property-button');

    // Assert
    expect(destroyButton).toBeDisabled();
  });

  test('should open destroy modal ', async () => {
    // Arrange
    const expectedText = `Вы уверены что хотите удалить характеристику ${mockProperty.name}?`;
    const user = userEvent.setup();

    // Act
    render(
      renderWithApolloClient(
        renderWithTheme(
          renderWithNiceModal(<DestroyPropertyButton canBeDestroyed name={mockProperty.name} />),
        ),
      ),
    );
    const destroyButton = screen.getByTestId('destroy-property-button');
    await user.click(destroyButton);
    const destroyModal = screen.getByTestId('modal-description');

    // Assert
    expect(destroyModal).toHaveTextContent(expectedText);
  });
});
