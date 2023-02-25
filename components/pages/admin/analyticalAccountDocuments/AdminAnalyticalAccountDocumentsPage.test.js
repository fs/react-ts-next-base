import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';
import { useTransfers } from 'lib/apollo/hooks/state/transfers';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockOrders } from '__tests__/mocks/mockOrders';
import { mockTransfers } from '__tests__/mocks/mockTransfers';

import { ANALYTICAL_OPERATION } from 'config/constants/analyticalAccount';
import { AdminAnalyticalAccountDocumentsPage } from './AdminAnalyticalAccountDocumentsPage';

jest.mock('lib/apollo/hooks/state/customerOrders');
jest.mock('lib/apollo/hooks/state/transfers');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminAnalyticalAccountDocumentsPage', () => {
  const expectedOperationId = '1';
  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should call useCustomerOrders on render', async () => {
    const query = { id: expectedOperationId, type: ANALYTICAL_OPERATION.ORDER };
    // Arrange
    const mockUseCustomerOrders = jest.fn(() => ({
      customerOrders: mockOrders,
    }));
    useCustomerOrders.mockImplementation(mockUseCustomerOrders);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <AdminAnalyticalAccountDocumentsPage {...pageProps} query={query} />
        )),
      ),
    );
    const documentPage = screen.getByTestId('admin-order-documents-page');

    // Assert
    expect(documentPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseCustomerOrders).toHaveBeenCalledWith({
        ids: [expectedOperationId],
      });
    });
  });

  test('should call useTransfers on render', async () => {
    const query = { id: expectedOperationId, type: ANALYTICAL_OPERATION.TRANSFER };
    // Arrange
    const mockUseTransfers = jest.fn(() => ({
      transfers: mockTransfers,
    }));

    useTransfers.mockImplementation(mockUseTransfers);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <AdminAnalyticalAccountDocumentsPage {...pageProps} query={query} />
        )),
      ),
    );
    const documentPage = screen.getByTestId('admin-order-documents-page');

    // Assert
    expect(documentPage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseTransfers).toHaveBeenCalledWith({
        ids: [expectedOperationId],
      });
    });
  });

  test('should return error page', () => {
    const query = { id: expectedOperationId, type: ANALYTICAL_OPERATION.ORDER };
    // Arrange
    const mockUseCustomerOrders = jest.fn(() => ({
      customerOrders: [],
      error: true,
    }));
    useCustomerOrders.mockImplementation(mockUseCustomerOrders);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <AdminAnalyticalAccountDocumentsPage {...pageProps} query={query} />
        )),
      ),
    );
    const errorPage = screen.getByTestId('error-page-text');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });

  test('should show loader on loading', () => {
    const query = { id: expectedOperationId, type: ANALYTICAL_OPERATION.ORDER };
    // Arrange
    const mockUseCustomerOrders = jest.fn(() => ({
      customerOrders: [],
      loading: true,
    }));
    useCustomerOrders.mockImplementation(mockUseCustomerOrders);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <AdminAnalyticalAccountDocumentsPage {...pageProps} query={query} />
        )),
      ),
    );
    const loader = screen.getByTestId('admin-order-documents-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
