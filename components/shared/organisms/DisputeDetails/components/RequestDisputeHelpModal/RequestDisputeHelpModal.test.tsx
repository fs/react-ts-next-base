import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRequestDisputeSupport } from 'lib/apollo/hooks/actions/dispute';
import userEvent from '@testing-library/user-event';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import RequestDisputeHelpModal from './RequestDisputeHelpModal';

jest.mock('lib/apollo/hooks/actions/dispute');

describe('RequestDisputeHelpModal', () => {
  const mockedUseRequestDisputeSupport = useRequestDisputeSupport as jest.Mock;
  const mockRequestDisputeSupport = jest.fn(() => {});
  const mockUseRequestDisputeSupport = jest.fn(() => [mockRequestDisputeSupport]);
  mockedUseRequestDisputeSupport.mockImplementation(mockUseRequestDisputeSupport);

  test('should call user useRequestDisputeSupport on submit', async () => {
    // Arrange
    const mockDisputeId = '1';
    const user = userEvent.setup();

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <RequestDisputeHelpModal
              keepMounted
              defaultVisible
              disputeId={mockDisputeId}
              id={mockDisputeId}
            />,
          ),
        ),
      ),
    );
    const requestHelpButton = screen.getByTestId('request-dispute-support-button');
    user.click(requestHelpButton);

    // Assert
    await waitFor(() => {
      expect(mockRequestDisputeSupport).toHaveBeenCalledWith({ disputeId: mockDisputeId });
    });
  });
});
