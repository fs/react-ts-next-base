import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';
import useRouter from 'hooks/useRouter';
import useCurrentUser from 'hooks/useCurrentUser';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrders } from 'lib/apollo/hooks/state/orders';
import { useCity, useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockOrders } from '__tests__/mocks/mockOrders';
import { mockMyCompanies } from '__tests__/mocks/mockMyCompanies';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import { mockUseCompanySidebarData } from '__tests__/mocks/mockUseCompanySidebarData';

import { PLACED } from 'config/constants/checkoutStatus';
import { documentsTypes } from './constants';

import { DocumentsPage } from './DocumentsPage';

jest.mock('hooks/useRouter');
jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/myCompanies');
jest.mock('lib/apollo/hooks/state/orders');
jest.mock('lib/apollo/hooks/state/clientSideState');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('DocumentsPage', () => {
  const expectedCompanyId = '1';
  const expectedOrderId = '1';
  const query = {
    companyId: expectedCompanyId,
    orderId: expectedOrderId,
    type: documentsTypes.IN_TRANSIT,
    startDate: '20.02.2022',
    endDate: '16.02.2022',
  };

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

  const mockUseRouter = jest.fn(() => mockUseRouterData);
  useRouter.mockImplementation(mockUseRouter);

  useCity.mockImplementation(jest.fn(() => mockUseCityData));
  useCompanySidebar.mockImplementation(jest.fn(() => mockUseCompanySidebarData));

  test('should call hooks on render', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <DocumentsPage {...pageProps} query={query} />),
      ),
    );

    // Act
    const documentPage = screen.getByTestId('company-documents-page');
    const orders = screen.getAllByTestId('order-details');

    // Assert
    expect(documentPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseMyCompanies).toHaveBeenCalledWith({ companyIds: [expectedCompanyId] });
      expect(mockUseOrders).toHaveBeenCalledWith({
        ...query,
        companyId: expectedCompanyId,
        checkoutStatus: PLACED,
        orderId: expectedOrderId,
        executionStatuses: documentsTypes.IN_TRANSIT,
        type: documentsTypes.IN_TRANSIT,
        first: 12,
        placedDate: { startDate: query.startDate, endDate: query.endDate },
      });
      expect(orders.length).toBe(mockOrders.length);
    });
  });

  test('should render correctly', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <DocumentsPage {...pageProps} query={query} />),
      ),
    );

    // Act
    const orders = await screen.findAllByTestId('order-details');

    // Assert
    expect(orders.length).toBe(mockOrders.length);
  });

  test('should show loader on loading', async () => {
    // Arrange
    const mockUseOrdersWithLoading = jest.fn(() => ({
      orders: mockOrders,
      loading: true,
    }));
    useOrders.mockImplementation(mockUseOrdersWithLoading);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => <DocumentsPage {...pageProps} query={query} />),
      ),
    );
    const loader = await screen.findByTestId('loader-layout-template-content');

    // Assert
    expect(loader).toBeInTheDocument();
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
        renderWithApolloClient(pageProps => <DocumentsPage {...pageProps} query={query} />),
      ),
    );
    const errorPage = screen.getByTestId('error-page-text');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });
});
