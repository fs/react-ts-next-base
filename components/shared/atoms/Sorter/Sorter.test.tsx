import React from 'react';
import useRouter from 'hooks/useRouter';
import selectEvent from 'react-select-event';
import { render, screen } from '@testing-library/react';
import { productSortValues } from 'config/constants/productSortValues';

import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import Sorter from './Sorter';

jest.mock('hooks/useRouter');
describe('Sorter', () => {
  const mockPushRoute = jest.fn();
  const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUseRouter = jest.fn(() => ({
    ...mockUseRouterData,
    pushRoute: mockPushRoute,
  }));
  mockedUseRouter.mockImplementation(mockUseRouter);
  test('should call onChangeSort on select sort order', async () => {
    // Arrange
    render(renderWithTheme(<Sorter options={productSortValues} />));
    const sorter = screen.getByText('По умолчанию');

    // Act
    await selectEvent.select(sorter, ['По убыванию цены']);

    // Assert
    expect(mockUseRouter).toHaveBeenCalled();
    expect(mockPushRoute).toHaveBeenCalledWith({
      query: {
        sortOrder: 'PRICE_DESC',
      },
    });
  });
});
