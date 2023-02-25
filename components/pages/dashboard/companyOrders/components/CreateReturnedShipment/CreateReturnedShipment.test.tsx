import React from 'react';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  CreateReturnedShipmentInput,
  ReturnedShipmentStatusEnum,
  UpdateReturnedShipmentInput,
} from 'graphql/types';
import { mockDispute } from '__tests__/mocks/mockDispute';
import { mockUploadFile } from '__tests__/mocks/mockUploadFile';
import { mockReturnedShipment } from '__tests__/mocks/mockReturnedShipment';
import mockPresignData from '__tests__/mocks/mockPresignData';

import {
  useCreateReturnedShipment,
  useUpdateReturnedShipment,
} from 'lib/apollo/hooks/actions/returnedShipment';
import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useFileUpload } from 'hooks/useFileUpload';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { usePopperTooltip } from 'react-popper-tooltip';
import CreateReturnedShipment from '.';

jest.mock('lib/apollo/hooks/actions/returnedShipment');
jest.mock('lib/apollo/hooks/actions/presignFile');
jest.mock('react-popper-tooltip');
jest.mock('hooks/useFileUpload');

const mockedUseCreateReturnedShipment = useCreateReturnedShipment as jest.Mock;
const mockedUseUpdateReturnedShipment = useUpdateReturnedShipment as jest.Mock;
const mockedUsePopperTooltip = usePopperTooltip as jest.Mock;
const mockedUsePresignFile = usePresignFile as jest.Mock;
const mockedUseFileUpload = useFileUpload as jest.Mock;

describe('CreateReturnedShipment', () => {
  const mockCompanyId = '1';
  const mockOrderId = '2';

  const mockCreateReturnedShipment = jest.fn();
  const mockUseCreateReturnedShipment = jest.fn(() => [mockCreateReturnedShipment]);
  mockedUseCreateReturnedShipment.mockImplementation(mockUseCreateReturnedShipment);

  const mockGetTooltipProps = jest.fn();
  const mockUsePopperTooltip = jest.fn(() => ({
    visible: true,
    getTooltipProps: mockGetTooltipProps,
  }));
  mockedUsePopperTooltip.mockImplementation(mockUsePopperTooltip);

  const mockUpdateReturnedShipment = jest.fn();
  const mockUseUpdateReturnedShipment = jest.fn(() => [mockUpdateReturnedShipment]);
  mockedUseUpdateReturnedShipment.mockImplementation(mockUseUpdateReturnedShipment);

  const mockPhoto = new File(['photo'], 'photo.png', { type: 'image/png' });
  const mockPresignFile = jest.fn(() => mockPresignData);
  mockedUsePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));
  const mockFileUpload = jest.fn(() => mockUploadFile);
  mockedUseFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

  test('should call createReturnedShipment on submit', async () => {
    // Arrange
    const tomorrow = addDays(new Date(), 1);
    const startDay = addMonths(tomorrow, 1);
    const endDay = addMonths(tomorrow, 1);

    startDay.setDate(7);
    endDay.setDate(9);

    startDay.setUTCHours(0, 0, 0, 0);
    endDay.setUTCHours(0, 0, 0, 0);
    const expectedValues = {
      attachments: [{ attachment: mockUploadFile }],
      disputeId: mockDispute.id,
      startDate: startDay.toISOString(),
      endDate: endDay.toISOString(),
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          renderWithNiceModal(
            <CreateReturnedShipment
              dispute={mockDispute}
              companyId={mockCompanyId}
              orderId={mockOrderId}
            />,
          ),
        ),
      ),
    );

    const [nextStartButton] = screen.getAllByText('Next Month');
    await user.click(nextStartButton);
    const [startDayButton] = screen.getAllByText(startDay.getDate());
    await user.click(startDayButton);

    const [submitStartDayButton] = screen.getAllByTestId('datepicker-button-submit');
    await user.click(submitStartDayButton);

    const [, nextEndButton] = screen.getAllByText('Next Month');
    await user.click(nextEndButton);
    const [, endDayButton] = screen.getAllByText(endDay.getDate());
    await user.click(endDayButton);

    const [, submitEndDayButton] = screen.getAllByTestId('datepicker-button-submit');
    await user.click(submitEndDayButton);

    const fileInput = screen.getByTestId('input-button-attachments');
    await user.upload(fileInput, mockPhoto);

    const submitButton = await screen.findByTestId('create-returned-shipment-submit-button');
    await user.click(submitButton);

    const confirmButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmButton);

    // Assert
    await waitFor(() => {
      expect(mockCreateReturnedShipment).toHaveBeenCalledWith<CreateReturnedShipmentInput[]>(
        expectedValues,
      );
    });
  });

  test('should call updateReturnedShipment on submit', async () => {
    // Arrange
    const expectedValues = {
      attachments: [
        {
          attachment: undefined,
          attachmentRemoteUrl: mockReturnedShipment.attachments[0].attachmentUrl,
        },
      ],
      returnedShipmentId: mockReturnedShipment.id,
      startDate: mockReturnedShipment.startDate,
      endDate: mockReturnedShipment.endDate,
    };

    const mockRejectedDispute = {
      ...mockDispute,
      returnedShipment: {
        ...mockReturnedShipment,
        status: ReturnedShipmentStatusEnum.Rejected,
      },
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithApolloClient(
        renderWithTheme(
          renderWithNiceModal(
            <CreateReturnedShipment
              dispute={mockRejectedDispute}
              companyId={mockCompanyId}
              orderId={mockOrderId}
            />,
          ),
        ),
      ),
    );

    const submitButton = await screen.findByTestId('create-returned-shipment-submit-button');
    await user.click(submitButton);

    const confirmButton = await screen.findByTestId('confirm-modal-button');
    await user.click(confirmButton);

    // Assert
    await waitFor(() => {
      expect(mockUpdateReturnedShipment).toHaveBeenCalledWith<UpdateReturnedShipmentInput[]>(
        expectedValues,
      );
    });
  });
});
