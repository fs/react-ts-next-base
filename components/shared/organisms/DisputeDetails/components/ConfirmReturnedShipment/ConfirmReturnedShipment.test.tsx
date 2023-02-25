import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockReturnedShipment } from '__tests__/mocks/mockReturnedShipment';

import {
  useConfirmReturnedShipment,
  useRejectReturnedShipment,
} from 'lib/apollo/hooks/actions/returnedShipment';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { ConfirmReturnedShipmentInput, RejectReturnedShipmentInput } from 'graphql/types';
import ConfirmReturnedShipment from '.';

jest.mock('lib/apollo/hooks/actions/returnedShipment');

const mockedUseConfirmReturnedShipment = useConfirmReturnedShipment as jest.Mock;
const mockedUseRejectReturnedShipment = useRejectReturnedShipment as jest.Mock;

describe('ConfirmReturnedShipment', () => {
  const mockConfirmReturnedShipment = jest.fn();
  const mockUseConfirmReturnedShipment = jest.fn(() => [mockConfirmReturnedShipment]);
  mockedUseConfirmReturnedShipment.mockImplementation(mockUseConfirmReturnedShipment);

  const mockRejectReturnedShipment = jest.fn();
  const mockUseRejectReturnedShipment = jest.fn(() => [mockRejectReturnedShipment]);
  mockedUseRejectReturnedShipment.mockImplementation(mockUseRejectReturnedShipment);

  test('should call confirmReturnedShipment on confirm', async () => {
    // Arrange
    const expectedValues = {
      returnedShipmentId: mockReturnedShipment.id,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          renderWithNiceModal(<ConfirmReturnedShipment returnedShipment={mockReturnedShipment} />),
        ),
      ),
    );
    const confirmReturnedShipmentButton = screen.getByTestId('confirm-returned-shipment-button');
    await user.click(confirmReturnedShipmentButton);

    const submitModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(submitModalButton);

    // Assert
    await waitFor(() => {
      expect(mockConfirmReturnedShipment).toHaveBeenCalledWith<ConfirmReturnedShipmentInput[]>(
        expectedValues,
      );
    });
  });

  test('should call rejectReturnedShipment on reject', async () => {
    // Arrange
    const expectedValues = {
      rejectComment: 'reject comment',
      returnedShipmentId: mockReturnedShipment.id,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          renderWithNiceModal(<ConfirmReturnedShipment returnedShipment={mockReturnedShipment} />),
        ),
      ),
    );
    const rejectReturnedShipmentButton = screen.getByTestId('reject-returned-shipment-button');
    await user.click(rejectReturnedShipmentButton);

    const rejectCommentField = await screen.findByTestId('reject-comment');
    await user.type(rejectCommentField, expectedValues.rejectComment);

    const submitModalButton = screen.getByTestId('confirm-modal-button');
    await user.click(submitModalButton);

    // Assert
    await waitFor(() => {
      expect(mockRejectReturnedShipment).toHaveBeenCalledWith<RejectReturnedShipmentInput[]>(
        expectedValues,
      );
    });
  });
});
