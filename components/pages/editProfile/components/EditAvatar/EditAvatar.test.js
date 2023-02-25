import React from 'react';
import 'jest-styled-components';

import { render, screen, fireEvent } from '@testing-library/react';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import mockCurrentUser from '__tests__/mocks/mockCurrentUser';

import EditAvatar from '.';

describe('EditAvatar', () => {
  test('should open EditAvatarModal by click', () => {
    // Arrange
    const setUser = jest.fn();
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(<EditAvatar user={mockCurrentUser} setUser={setUser} />),
        ),
      ),
    );
    const editAvatarButton = screen.getByTestId('edit-avatar-button');

    // Act
    fireEvent.click(editAvatarButton);

    // Assert
    const editAvatarModalTitle = screen.getByTestId('edit-avatar-modal-title');
    expect(editAvatarModalTitle).toBeInTheDocument();
  });
});
