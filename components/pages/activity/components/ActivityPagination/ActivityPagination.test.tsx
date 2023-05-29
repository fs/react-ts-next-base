import { render, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockPageInfo } from '__tests__/mocks/mockPageInfo';

import ActivityPagination from 'components/pages/activity/components/ActivityPagination';

import 'jest-styled-components';

describe('ActivityPagination', () => {
  const mockTestId = 'activity-pagination';
  const mockPageNumber = 1;
  const mockSetPageNumber = jest.fn();

  test('should render correctly', () => {
    // Arrange
    render(
      renderWithTheme(
        <ActivityPagination
          pageInfo={mockPageInfo}
          pageNumber={mockPageNumber}
          setPageNumber={mockSetPageNumber}
          setAfterCursor={jest.fn}
          setBeforeCursor={jest.fn}
        />,
      ),
    );

    // Act
    const pagination = screen.getByTestId(mockTestId);

    // Assert
    expect(pagination).toBeInTheDocument();
  });

  test('should disable buttons if no other pages except current', () => {
    // Arrange
    const mockPageInfoData = { ...mockPageInfo, hasNextPage: false };

    render(
      renderWithTheme(
        <ActivityPagination
          pageInfo={mockPageInfoData}
          pageNumber={mockPageNumber}
          setPageNumber={mockSetPageNumber}
          setAfterCursor={jest.fn}
          setBeforeCursor={jest.fn}
        />,
      ),
    );

    // Act
    const buttons = screen.getAllByRole('button');

    // Assert
    buttons.forEach(btn => {
      expect(btn).toBeDisabled();
    });
  });
});
