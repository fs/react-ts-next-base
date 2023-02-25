import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { NOT_VERIFIED, VERIFIED } from 'config/constants/status';
import { mockLocations } from '__tests__/mocks/mockLocations';

import {
  useAcceptCompanyLocation,
  useRejectCompanyLocation,
  useDestroyCustomerCompanyLocation,
} from 'lib/apollo/hooks/actions/companyLocation';
import AddressCard from './AddressCard';

jest.mock('lib/apollo/hooks/actions/companyLocation');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('AddressCard', () => {
  const mockAcceptCompanyLocation = jest.fn();
  const mockUseAcceptCompanyLocation = jest.fn(() => [mockAcceptCompanyLocation]);
  useAcceptCompanyLocation.mockImplementation(mockUseAcceptCompanyLocation);

  const mockRejectCompanyLocation = jest.fn();
  const mockUseRejectCompanyLocation = jest.fn(() => [mockRejectCompanyLocation]);
  useRejectCompanyLocation.mockImplementation(mockUseRejectCompanyLocation);

  const mockDestroyCustomerCompanyLocation = jest.fn();
  const mockUseDestroyCustomerCompanyLocation = jest.fn(() => [mockDestroyCustomerCompanyLocation]);
  useDestroyCustomerCompanyLocation.mockImplementation(mockUseDestroyCustomerCompanyLocation);

  test('should call useAcceptCompanyLocation', async () => {
    // Arrange
    const user = userEvent.setup();
    const notVerifiedLocation = mockLocations.find(({ status }) => status === NOT_VERIFIED);

    render(
      renderWithApolloClient(
        renderWithTheme(renderWithNiceModal(<AddressCard location={notVerifiedLocation} />)),
      ),
    );
    const acceptButton = screen.getByTestId('accept-location');
    await user.click(acceptButton);

    // Act
    const confirmModalButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    expect(mockUseAcceptCompanyLocation).toHaveBeenCalledWith({
      onSubmit: expect.any(Function),
    });
    await waitFor(() => {
      expect(mockAcceptCompanyLocation).toHaveBeenCalledWith(notVerifiedLocation.id);
    });
  });

  test('should call useRejectCompanyLocation', async () => {
    // Arrange
    const user = userEvent.setup();
    const notVerifiedLocation = mockLocations.find(({ status }) => status === NOT_VERIFIED);
    const mockRejectionReason = 'mockRejectionReason';

    const expectedData = {
      companyLocationId: notVerifiedLocation.id,
      rejectionReason: mockRejectionReason,
    };

    render(
      renderWithApolloClient(
        renderWithTheme(renderWithNiceModal(<AddressCard location={notVerifiedLocation} />)),
      ),
    );
    const rejectButton = screen.getByTestId('reject-location');
    await user.click(rejectButton);

    // Act
    const reasonInput = screen.getByTestId('rejection-reason');
    await user.type(reasonInput, mockRejectionReason);

    const confirmModalButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    expect(mockUseRejectCompanyLocation).toHaveBeenCalledWith({
      onSubmit: expect.any(Function),
    });
    await waitFor(() => {
      expect(mockRejectCompanyLocation).toHaveBeenCalledWith(expectedData);
    });
  });

  test('should call useDestroyCustomerCompanyLocation', async () => {
    // Arrange
    const user = userEvent.setup();
    const verifiedLocation = mockLocations.find(({ status }) => status === VERIFIED);

    const expectedData = verifiedLocation.id;

    render(
      renderWithApolloClient(
        renderWithTheme(renderWithNiceModal(<AddressCard location={verifiedLocation} />)),
      ),
    );
    const rejectButton = screen.getByTestId('destroy-location');
    await user.click(rejectButton);

    // Act

    const confirmModalButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmModalButton);

    // Assert
    expect(mockUseDestroyCustomerCompanyLocation).toHaveBeenCalledWith({
      onSubmit: expect.any(Function),
    });
    await waitFor(() => {
      expect(mockDestroyCustomerCompanyLocation).toHaveBeenCalledWith(expectedData);
    });
  });
});
