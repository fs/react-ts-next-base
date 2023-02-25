import React, { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useFileUpload } from 'hooks/useFileUpload';
import useNotifier from 'hooks/useNotifier';

import { mockUploadFile } from '__tests__/mocks/mockUploadFile';
import mockPresignData from '__tests__/mocks/mockPresignData';

import VariantImages from './VariantImages';

const mockSetValue = jest.fn();
jest.mock('lib/apollo/hooks/actions/presignFile');
jest.mock('hooks/useFileUpload');
jest.mock('hooks/useNotifier');
jest.mock('formik', () => ({
  ErrorMessage: () => <div />,
  Formik: ({ children }: { children: ReactElement }) => <div>{children}</div>,
  Form: ({ children }: { children: ReactElement }) => <div>{children}</div>,
  useField: jest.fn((_: string) => {
    return [{}, {}, { setValue: mockSetValue }];
  }),
}));

const mockedUsePresignFile = usePresignFile as jest.Mock;
const mockedUseFileUpload = useFileUpload as jest.Mock;
const mockedUseNotifier = useNotifier as jest.Mock;

describe('VariantPhotos', () => {
  const mockPresignFile = jest.fn(() => mockPresignData);
  mockedUsePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));
  const mockFileUpload = jest.fn(() => mockUploadFile);
  mockedUseFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

  const mockSetError = jest.fn();
  const mockSetSuccess = jest.fn();
  const mockUseNotifier = jest.fn(() => ({
    setError: mockSetError,
    setSuccess: mockSetSuccess,
  }));
  mockedUseNotifier.mockImplementation(mockUseNotifier);

  test('should add photo and call usePresignFile, useFileUpload', async () => {
    // Arrange
    const mockName = 'variantPhotos';
    const mockPhoto = new File(['photo'], 'photo.png', { type: 'image/png' });
    const expectedPresignFileValues = {
      filename: 'photo.png',
      type: 'image/png',
      size: 5,
    };

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          <VariantImages
            name={mockName}
            index="0"
            readOnly={false}
            title=""
            readOnlyTitle=""
            documentFormats={[]}
            variantImages={[]}
          />,
        ),
      ),
    );
    const photosInput = await screen.findByTestId(`add-photos-modal--${mockName}`);
    await user.click(photosInput);

    const fileInput = await screen.findByTestId(
      `load-photo-input-button--add-photos-modal--${mockName}`,
    );
    await user.upload(fileInput, mockPhoto);
    await user.click(
      await screen.findByTestId(`add-photo-submit-button--add-photos-modal--${mockName}`),
    );

    // Assert
    await waitFor(() => {
      expect(mockPresignFile).toHaveBeenCalledWith(expectedPresignFileValues);
      expect(mockSetValue).toBeCalledWith([{ image: mockUploadFile }]);
    });
    expect(mockFileUpload).toHaveBeenCalledWith(mockPresignData, mockPhoto);
  });
});
