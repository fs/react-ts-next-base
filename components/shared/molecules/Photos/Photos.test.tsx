import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import Photos from '.';

describe('Photos', () => {
  const mockOnRemovePhoto = jest.fn();
  const mockImages = [
    {
      id: '1',
      url: 'mock-url',
      metadata: { filename: 'filename' },
    },
    {
      id: '2',
      url: 'mock-url',
      metadata: { filename: 'filename' },
    },
  ];

  test('should show photos', async () => {
    // Arrange
    render(
      renderWithTheme(
        <Photos onRemovePhoto={mockOnRemovePhoto} images={mockImages} loading={false} />,
      ),
    );

    // Act
    const photo = screen.getByTestId('photo-1');

    // Assert
    expect(photo).toBeInTheDocument();
  });

  test('should call onRemovePhoto', async () => {
    // Arrange
    const expectedId = mockImages[0].id;
    render(
      renderWithTheme(
        <Photos onRemovePhoto={mockOnRemovePhoto} images={mockImages} loading={false} />,
      ),
    );

    // Act
    const removeButtons = screen.queryAllByTestId('remove-photo');
    fireEvent.click(removeButtons[0]);

    // Assert
    expect(mockOnRemovePhoto).toHaveBeenCalledWith(expectedId);
  });

  test('should show loader on loading', async () => {
    // Arrange
    render(renderWithTheme(<Photos loading />));

    // Act
    const photoLoader = screen.getByTestId('add-photo-loader');

    // Assert
    expect(photoLoader).toBeInTheDocument();
  });
});
