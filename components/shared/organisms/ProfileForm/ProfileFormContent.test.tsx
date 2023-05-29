import { render, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';

import ProfileFormContent from './ProfileFormContent';

describe('ProfileFormContent', () => {
  test('should render correctly', async () => {
    // Arrange
    const mockOnSubmit = jest.fn();

    // Act
    render(
      renderWithTheme(
        <ProfileFormContent
          user={mockCurrentUser}
          onSubmit={mockOnSubmit}
          handleAvatarChange={jest.fn}
          temporaryUrl=""
        />,
      ),
    );
    const formTitle = screen.getByTestId('profile-form-title');

    // Assert
    expect(formTitle).toBeInTheDocument();
  });
});
