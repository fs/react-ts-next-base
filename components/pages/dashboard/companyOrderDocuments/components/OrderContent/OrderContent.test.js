import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import useCurrentUser from 'hooks/useCurrentUser';
import { useOrders } from 'lib/apollo/hooks/state/orders';

import { mockOrders } from '__tests__/mocks/mockOrders';

import OrderContent from './OrderContent';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/orders');

describe('OrderContent', () => {
  const expectedCompanyId = '1';
  const expectedOrderId = '1';
  const query = { companyId: expectedCompanyId, orderId: expectedOrderId };

  const mockUseCurrentUser = jest.fn(() => ({
    user: mockCurrentUser,
  }));
  useCurrentUser.mockImplementation(mockUseCurrentUser);

  const mockUseOrders = jest.fn(() => ({
    orders: mockOrders,
  }));
  useOrders.mockImplementation(mockUseOrders);

  test('should render correctly', async () => {
    // Arrange
    const expectedLength = mockOrders[0].invoices.length + 1;
    render(
      renderWithTheme(
        renderWithApolloClient(
          <OrderContent orderId={expectedOrderId} context={{}} companyId={expectedCompanyId} />,
        ),
      ),
    );

    // Act
    const documents = await screen.findAllByTestId('document-item-title');

    // Assert
    expect(documents.length).toBe(expectedLength);
  });

  test('should show loader on loading', () => {
    // Arrange
    const mockUseOrdersWithLoading = jest.fn(() => ({
      orders: mockOrders,
      loading: true,
    }));
    useOrders.mockImplementation(mockUseOrdersWithLoading);

    // Act
    render(renderWithTheme(renderWithApolloClient(<OrderContent query={query} canVisit />)));
    const loader = screen.getByTestId('company-documents-order-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
