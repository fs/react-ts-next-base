import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import {
  mockUseCurrentUserGuestData,
  mockUseCurrentUserRegisteredData,
} from '__tests__/mocks/mockCurrentUser';
import mockPresignData from '__tests__/mocks/mockPresignData';
import { mockUploadFile } from '__tests__/mocks/mockUploadFile';

import {
  useCreatePublicSupportRequest,
  useCreateSupportRequest,
} from 'lib/apollo/hooks/actions/support';
import useCurrentUser from 'hooks/useCurrentUser';
import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useFileUpload } from 'hooks/useFileUpload';

import SupportRequestModal from './SupportRequestModal';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/actions/support');
jest.mock('lib/apollo/hooks/actions/presignFile');
jest.mock('hooks/useFileUpload');

describe('HelpMessage', () => {
  const expectedEmail = 'test@test.com';
  const expectedSubject = 'subject message';
  const expectedMessage = 'message to support';

  const mockedUseCreatePublicSupportRequest = useCreatePublicSupportRequest as jest.Mock;
  const mockCreatePublicSupportRequest = jest.fn(() => Promise.resolve());
  mockedUseCreatePublicSupportRequest.mockImplementation(
    jest.fn(() => [mockCreatePublicSupportRequest]),
  );

  const mockedUseCreateSupportRequest = useCreateSupportRequest as jest.Mock;
  const mockCreateSupportRequest = jest.fn(() => Promise.resolve());
  mockedUseCreateSupportRequest.mockImplementation(jest.fn(() => [mockCreateSupportRequest]));

  const mockedUsePresignFile = usePresignFile as jest.Mock;
  const mockPresignFile = jest.fn(() => mockPresignData);
  mockedUsePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));

  const mockedUseFileUpload = useFileUpload as jest.Mock;
  const mockFileUpload = jest.fn(() => mockUploadFile);
  mockedUseFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

  const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;
  const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserGuestData);
  mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

  test('should call usePresignFile, useFileUpload', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockPhoto = new File(['photo'], 'photo.png', { type: 'image/png' });
    const expectedPresignFileValues = {
      filename: 'photo.png',
      type: 'image/png',
      size: 5,
    };

    // Act
    render(
      renderWithTheme(
        renderWithNiceModal(<SupportRequestModal keepMounted defaultVisible id="test" />),
      ),
    );

    const fileInput = await screen.findByTestId('help-file-input');
    await user.upload(fileInput, mockPhoto);

    // Assert
    await waitFor(() => expect(mockPresignFile).toHaveBeenCalledWith(expectedPresignFileValues));
    expect(mockFileUpload).toHaveBeenCalledWith(mockPresignData, mockPhoto);
  });

  test('should show email field and call createPublicSupportRequest on submit', async () => {
    // Arrange
    const user = userEvent.setup();
    const expectedValues = {
      email: expectedEmail,
      subject: expectedSubject,
      message: expectedMessage,
      images: [],
    };

    // Act
    render(
      renderWithTheme(
        renderWithNiceModal(<SupportRequestModal keepMounted defaultVisible id="test" />),
      ),
    );
    const emailField = await screen.findByTestId('email');
    const subjectField = screen.getByTestId('subject');
    const textField = screen.getByTestId('message');

    await user.type(emailField, expectedEmail);
    await user.type(subjectField, expectedSubject);
    await user.type(textField, expectedMessage);

    const buttonSubmit = screen.getByTestId('submit-button');
    await user.click(buttonSubmit);

    await waitFor(() => {
      expect(mockCreatePublicSupportRequest).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should call createSupportRequest on submit', async () => {
    // Arrange
    const mockUseCurrentUserWithUser = jest.fn(() => mockUseCurrentUserRegisteredData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUserWithUser);
    const user = userEvent.setup();
    const expectedValues = {
      subject: expectedSubject,
      message: expectedMessage,
      images: [],
    };

    // Act
    render(
      renderWithTheme(
        renderWithNiceModal(<SupportRequestModal keepMounted defaultVisible id="test" />),
      ),
    );
    const subjectField = await screen.findByTestId('subject');
    const textField = screen.getByTestId('message');

    await user.type(subjectField, expectedSubject);
    await user.type(textField, expectedMessage);

    const buttonSubmit = screen.getByTestId('submit-button');
    await user.click(buttonSubmit);

    // Assert
    await waitFor(() => {
      expect(mockCreateSupportRequest).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('button submit should be disabled', async () => {
    // Arrange
    const user = userEvent.setup();
    const expectedText = 'text help message to support';

    render(
      renderWithTheme(
        renderWithNiceModal(<SupportRequestModal keepMounted defaultVisible id="test" />),
      ),
    );

    // Act
    const textField = await screen.findByTestId('message');

    await user.type(textField, expectedText);

    const buttonSubmit = await screen.findByTestId('submit-button');
    expect(buttonSubmit).toBeDisabled();
  });
});
