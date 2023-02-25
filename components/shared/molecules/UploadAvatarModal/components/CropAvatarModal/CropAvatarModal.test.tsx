import React from 'react';
import 'jest-canvas-mock';
import 'jest-styled-components';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import mockPresignData from '__tests__/mocks/mockPresignData';
import { mockUploadFile } from '__tests__/mocks/mockUploadFile';
import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useFileUpload } from 'hooks/useFileUpload';

import useNotifier from 'hooks/useNotifier';
import CropAvatarModal from '.';

jest.mock('lib/apollo/hooks/actions/currentUser');
jest.mock('lib/apollo/hooks/actions/presignFile');
jest.mock('hooks/useFileUpload');
jest.mock('hooks/useNotifier');

describe('CropAvatarModal', () => {
  const mockSetError = jest.fn();
  const mockSetSuccess = jest.fn();
  const mockUseNotifier = jest.fn(() => ({
    setError: mockSetError,
    setSuccess: mockSetSuccess,
  }));
  const mockedUseNotifier = useNotifier as jest.Mock;
  mockedUseNotifier.mockImplementation(mockUseNotifier);

  const mockedUsePresignFile = usePresignFile as jest.Mock;
  const mockPresignFile = jest.fn(() => mockPresignData);
  mockedUsePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));
  const mockedUseFileUpload = useFileUpload as jest.Mock;
  const mockFileUpload = jest.fn(() => mockUploadFile);
  mockedUseFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

  test('should call onSubmit on submit', async () => {
    // Arrange
    const expectedPresignFileValues = {
      filename: 'astley.jpg',
      type: 'image/jpeg',
      size: 180000,
    };
    const onSubmit = jest.fn();
    const avatar = new File([''], 'astley.jpg', {
      type: 'image/jpeg',
    });
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <CropAvatarModal
              id="test"
              onSubmit={onSubmit}
              temporaryUrl="https://etcanada.com/wp-content/uploads/2016/09/astley.jpg"
              avatar={avatar}
              rounded
              keepMounted
              defaultVisible
            />,
          ),
        ),
      ),
    );
    const cropAvatarButton = screen.getByTestId('crop-image-button');

    // Act
    fireEvent.click(cropAvatarButton);

    // Assert
    await waitFor(() => {
      expect(mockPresignFile).toHaveBeenCalledWith(expectedPresignFileValues);
    });

    expect(mockFileUpload).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalled();
  });
});
