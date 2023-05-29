import { render, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockActivities } from '__tests__/mocks/mockActivities';

import ActivityTable from './ActivityTable';

describe('ActivityTable', () => {
  test('should render correctly', () => {
    // Arrange
    render(renderWithTheme(<ActivityTable activities={mockActivities} />));

    // Act
    const table = screen.getByTestId('activity-table');

    // Assert
    expect(table).toBeInTheDocument();
  });

  test('should render correctly if no data', () => {
    // Arrange
    render(renderWithTheme(<ActivityTable activities={[]} />));

    // Act
    const emptyText = screen.getByTestId('activity-table-empty');

    // Assert
    expect(emptyText).toBeInTheDocument();
  });
});
