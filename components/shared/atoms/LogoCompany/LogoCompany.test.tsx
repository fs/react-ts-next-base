import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import mockCompany from '__tests__/mocks/mockCompany';

import LogoCompany from '.';

describe('LogoCompany', () => {
  test('should show edit button and open crop modal', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(renderWithNiceModal(<LogoCompany edit company={mockCompany} />)),
      ),
    );
    const editLogoButton = screen.getByTestId('edit-logo-company-button');

    // Act
    await user.click(editLogoButton);
    const uploadLogoModal = screen.getByTestId('edit-avatar-modal-title');

    // Assert
    expect(uploadLogoModal).toBeInTheDocument();
  });
});
