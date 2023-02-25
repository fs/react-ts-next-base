import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { useDestroyAdmin } from 'lib/apollo/hooks/actions/admin';

import { mockAdmins } from '__tests__/mocks/mockAdmins';

import AdminItem from '.';

jest.mock('lib/apollo/hooks/actions/admin');

describe('AdminItem', () => {
  const mockDestroyAdmin = jest.fn(() => Promise.resolve());
  const mockUseDestroyAdmin = jest.fn(() => [mockDestroyAdmin]);
  useDestroyAdmin.mockImplementation(mockUseDestroyAdmin);

  test('should call useDestroyAdmin on destroy admin', async () => {
    // Arrange
    const mockAdmin = mockAdmins[1];

    // Act
    render(
      renderWithTheme(renderWithApolloClient(renderWithNiceModal(<AdminItem admin={mockAdmin} />))),
    );
    const destroyAdminButton = screen.getByTestId(`destroy-admin-${mockAdmin.id}`);
    fireEvent.click(destroyAdminButton);

    const deleteSubmitButton = screen.getByTestId('confirm-modal-button');
    fireEvent.click(deleteSubmitButton);

    // Assert
    await waitFor(() => {
      expect(mockDestroyAdmin).toHaveBeenCalled();
    });
  });
});
