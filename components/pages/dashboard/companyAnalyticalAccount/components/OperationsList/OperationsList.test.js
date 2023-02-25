import React from 'react';
import { render, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { mockAccountOperations } from '__tests__/mocks/mockAccountOperations';
import mockCompany from '__tests__/mocks/mockCompany';
import { AccountOperationSubjectEnum } from 'graphql/types';

import { useAccountOperations } from 'lib/apollo/hooks/state/accountOperations';

import OperationsList from '.';

jest.mock('lib/apollo/hooks/state/accountOperations');

describe('OperationsList', () => {
  test('should call useAccountOperations', async () => {
    // Arrange
    const mockQuery = {
      operations: 'ORDERS',
      searchQuery: '74 80',
      endDate: '19.02.2022',
      startDate: '18.02.2022',
    };
    const { ProductPayment, ProductDelivery, AgencyFee, DisputeFinished, FinishedDisputeDelivery } =
      AccountOperationSubjectEnum;

    const mockUseAccountOperations = jest.fn(() => ({
      loading: undefined,
      accountOperations: mockAccountOperations,
      pageInfo: { endCursor: 'FF', hasNextPage: true },
    }));
    useAccountOperations.mockImplementation(mockUseAccountOperations);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(<OperationsList company={mockCompany} query={mockQuery} />),
      ),
    );

    // Assert
    await waitFor(() => {
      expect(mockUseAccountOperations).toHaveBeenCalledWith({
        companyId: mockCompany.id,
        orderIds: mockQuery.searchQuery.split(' '),
        subjects: [
          ProductPayment,
          ProductDelivery,
          AgencyFee,
          DisputeFinished,
          FinishedDisputeDelivery,
        ],
        acceptedDate: {
          startDate: mockQuery.startDate,
          endDate: mockQuery.endDate,
        },
        statuses: [],
        first: 12,
      });
    });
  });
});
