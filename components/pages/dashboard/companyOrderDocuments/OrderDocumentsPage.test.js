import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import useCurrentUser from 'hooks/useCurrentUser';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrders } from 'lib/apollo/hooks/state/orders';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockOrders } from '__tests__/mocks/mockOrders';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';

import { PLACED } from 'config/constants/checkoutStatus';

import { OrderDocumentsPage } from './OrderDocumentsPage';

jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('OrderDocumentsPage', () => {
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

  const mockUseMyCompanies = jest.fn(() => ({
    myCompanies: mockMyCompanies,
    loading: undefined,
  }));
  useMyCompanies.mockImplementation(mockUseMyCompanies);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));
  useCompanySidebar.mockImplementation(jest.fn(() => mockUseCompanySidebarData));

  test('should call hooks on render', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <OrderDocumentsPage {...pageProps} query={query} />),
      ),
    );

    // Act
    const documentPage = screen.getByTestId('company-order-documents-page');

    // Assert
    expect(documentPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [expectedCompanyId] });
      expect(mockUseOrders).toHaveBeenCalledWith({
        companyId: expectedCompanyId,
        checkoutStatus: PLACED,
        orderId: expectedOrderId,
      });
    });
  });

  test('should return error page for non existing company', () => {
    // Arrange
    const mockUseMyCompaniesWithoutCompanies = jest.fn(() => ({
      myCompanies: [],
      loading: undefined,
    }));
    useMyCompanies.mockImplementation(mockUseMyCompaniesWithoutCompanies);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <OrderDocumentsPage {...pageProps} query={query} />),
      ),
    );
    const errorPage = screen.getByTestId('error-page-text');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });
});
