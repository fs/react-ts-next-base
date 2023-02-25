import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import RemoveCompany from '.';

describe('RemoveCompany', () => {
  test('should open modal RemoveCompany', () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(renderWithNiceModal(<RemoveCompany lastEmployeeMembers={[]} />)),
      ),
    );
    const buttonRemoveCompany = screen.getByTestId('button-remove-company');

    // Act
    fireEvent.click(buttonRemoveCompany);
    const modalRemoveCompany = screen.getByTestId('simple-modal-title');

    // Assert
    expect(modalRemoveCompany).toBeInTheDocument();
  });
});
