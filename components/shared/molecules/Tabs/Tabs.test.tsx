import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import useRouter from 'hooks/useRouter';

import Tabs from '.';

jest.mock('hooks/useRouter');

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('Tabs', () => {
  // Arrange
  const onClick = jest.fn();
  const firstTabContent = 'First Tab Content';
  const secondTabContent = 'Second Tab Content';

  const mockPushRoute = jest.fn();
  const mockUseRouter = jest.fn(() => ({
    ...mockUseRouterData,
    pushRoute: mockPushRoute,
  }));
  mockedUseRouter.mockImplementation(mockUseRouter);

  const MOCK_TABS = [
    {
      id: 'tab_1',
      name: 'first test tab',
      active: true,
      onClick,
      content: <p>{firstTabContent}</p>,
      action: () => mockPushRoute({ pathname: 'test', query: { tab_1: true } }),
    },
    {
      id: 'tab_2',
      name: 'second test tab',
      active: false,
      onClick,
      content: <p>{secondTabContent}</p>,
      action: () => mockPushRoute({ pathname: 'test', query: { tab_2: true } }),
    },
  ];

  test('should show active tab content', () => {
    // Act
    render(renderWithTheme(<Tabs tabs={MOCK_TABS} activeId={MOCK_TABS[0].id} />));
    const activeTabContent = screen.getByText(firstTabContent);

    // Assert
    expect(activeTabContent).toBeInTheDocument();
  });

  test('should show switch tab and show this tab content', async () => {
    // Act
    render(renderWithTheme(<Tabs tabs={MOCK_TABS} activeId={MOCK_TABS[0].id} />));

    const secondTab = screen.getByTestId(`tab-${MOCK_TABS[1].id}`);

    fireEvent.click(secondTab);

    // Assert
    await waitFor(() => {
      expect(mockPushRoute).toHaveBeenCalledWith({ pathname: 'test', query: { tab_2: true } });
    });
  });
});
