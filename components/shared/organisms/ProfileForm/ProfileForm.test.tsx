import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';

import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useUpdateUser } from 'lib/apollo/hooks/actions/user';
import { useFileUpload } from 'hooks/useFileUpload';
import useNotifier from 'hooks/useNotifier';

import ProfileForm from './ProfileForm';

jest.mock('lib/apollo/hooks/actions/user');
jest.mock('lib/apollo/hooks/actions/presignFile');
jest.mock('hooks/useNotifier');
jest.mock('hooks/useFileUpload');

const mockedUseNotifier = useNotifier as jest.Mock;
const mockedUseUpdateUser = useUpdateUser as jest.Mock;
const mockedUsePresignFile = usePresignFile as jest.Mock;
const mockedUseFileUpload = useFileUpload as jest.Mock;

describe('ProfileForm', () => {
  const mockPresignFileData = {
    fields: [
      {
        key: 'mockKey',
        value: 'mockValue',
      },
    ],
    url: 'mockUrl',
  };
  const mockSetSuccess = jest.fn();
  const mockUseNotifier = jest.fn(() => ({ setSuccess: mockSetSuccess, setError: jest.fn() }));
  const mockUpdateUser = jest.fn(() => Promise.resolve());
  const mockPresignFile = jest.fn(() => Promise.resolve(mockPresignFileData));
  const mockFileUpload = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    mockedUseUpdateUser.mockImplementation(() => [mockUpdateUser]);
    mockedUsePresignFile.mockImplementation(() => [mockPresignFile]);
    mockedUseFileUpload.mockImplementation(() => [mockFileUpload]);
    mockedUseNotifier.mockImplementation(mockUseNotifier);
  });

  test('should call useUpdateUser on submit', async () => {
    // Arrange
    const expectedProfile = {
      email: mockCurrentUser.email,
      firstName: mockCurrentUser.firstName,
      lastName: mockCurrentUser.lastName,
    };

    const expectedValues = {
      ...expectedProfile,
      password: '',
      currentPassword: '',
      avatar: undefined,
    };

    const user = userEvent.setup();
    render(renderWithTheme(<ProfileForm user={mockCurrentUser} />));

    // Act
    await user.click(screen.getByTestId('submit-button'));

    // Assert
    await waitFor(() => expect(mockUpdateUser).toHaveBeenCalledWith(expectedValues));
    expect(mockPresignFile).not.toHaveBeenCalled();
    expect(mockFileUpload).not.toHaveBeenCalled();
  });

  test('should call useUpdateUser and fileUpload on submit', async () => {
    // Arrange
    const mockFileName = 'avatar.png';
    const mockFileType = 'image/png';
    const mockFile = new File(['avatarka'], mockFileName, { type: mockFileType });
    const expectedAvatarTestId = 'avatar';
    const expectedProfile = {
      email: mockCurrentUser.email,
      firstName: mockCurrentUser.firstName,
      lastName: mockCurrentUser.lastName,
    };

    const expectedPresignFileValues = {
      filename: mockFileName,
      type: mockFileType,
    };

    const expectedUpdateUserValues = {
      ...expectedProfile,
      password: '',
      currentPassword: '',
      avatar: undefined,
    };

    const user = userEvent.setup();
    render(renderWithTheme(<ProfileForm user={mockCurrentUser} />));

    const fileInput = screen.getByTestId(expectedAvatarTestId);
    await user.upload(fileInput, mockFile);

    // Act
    await user.click(screen.getByTestId('submit-button'));

    // Assert
    await waitFor(() => expect(mockPresignFile).toHaveBeenCalledWith(expectedPresignFileValues));
    expect(mockFileUpload).toHaveBeenCalledWith(mockPresignFileData, mockFile);
    expect(mockUpdateUser).toHaveBeenCalledWith(expectedUpdateUserValues);
  });
});
