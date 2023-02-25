import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useDestroyOrder } from 'lib/apollo/hooks/actions/order';
import useCurrentUser from 'hooks/useCurrentUser';
import useNotifier from 'hooks/useNotifier';

import { mockDeletedOrder } from '__tests__/mocks/mockOrders';
import mockCurrentUser from '__tests__/mocks/mockCurrentUser';

import DeletedOrderItem from './DeletedOrderItem';

jest.mock('hooks/useNotifier');
jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/actions/order');
jest.mock('lib/apollo/hooks/state/deliveryMethods');

describe('DeletedOrderItem', () => {
  const mockSetError = jest.fn();
  const mockSetSuccess = jest.fn();
  const mockUseNotifier = jest.fn(() => ({
    setError: mockSetError,
    setSuccess: mockSetSuccess,
  }));
  useNotifier.mockImplementation(mockUseNotifier);

  const mockDestroyOrder = jest.fn(() => Promise.resolve());
  const mockUseDestroyOrder = jest.fn(() => [mockDestroyOrder]);
  useDestroyOrder.mockImplementation(mockUseDestroyOrder);

  const mockUseCurrentUser = jest.fn(() => ({
    user: mockCurrentUser,
  }));
  useCurrentUser.mockImplementation(mockUseCurrentUser);

  test('should call useDestroyOrder on destroy order', async () => {
    // Arrange
    const { id: mockOrderId } = mockDeletedOrder;

    // Act
    render(renderWithTheme(renderWithApolloClient(<DeletedOrderItem order={mockDeletedOrder} />)));
    const destroyButton = screen.getByTestId(`destroy-order-${mockOrderId}`);
    fireEvent.click(destroyButton);

    // Assert
    await waitFor(() => {
      expect(mockDestroyOrder).toHaveBeenCalled();
    });
  });
});
