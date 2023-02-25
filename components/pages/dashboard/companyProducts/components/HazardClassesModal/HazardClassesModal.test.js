import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import HazardClassesModal from '.';

describe('HazardClassesModal', () => {
  test('should open modal HazardClassesModal', () => {
    // Arrange
    render(renderWithTheme(<HazardClassesModal />));
    const buttonHazardClasses = screen.getByTestId('hazard-classes-modal-button');

    // Act
    fireEvent.click(buttonHazardClasses);

    // Assert
    expect(screen.getByTestId('hazard-classes-title')).toBeInTheDocument();
  });
});
