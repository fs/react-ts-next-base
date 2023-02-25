import React from 'react';

import { screen, render } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { NOT_VERIFIED, REJECTED } from 'config/constants/status';
import { getVerificationDeadline } from 'helpers';

import AddressCheckStatus from './AddressCheckStatus';

describe('AddressCheckStatus', () => {
  test('should show rejected status', () => {
    // Arrange
    render(renderWithTheme(renderWithApolloClient(<AddressCheckStatus status={REJECTED} />)));
    // Act
    const checkStatus = screen.getByTestId('address-check-status');
    // Assert
    expect(checkStatus).toHaveTextContent('Внесите запрошенные администратором корректировки');
  });
  test('should show review required status for admin', () => {
    // Arrange
    const expectedText = `На проверку этой лицензии ${getVerificationDeadline(
      new Date(),
    ).toLowerCase()}`;
    render(
      renderWithTheme(
        renderWithApolloClient(<AddressCheckStatus status={NOT_VERIFIED} isAdminAddresses />),
      ),
    );
    // Act
    const checkStatus = screen.getByTestId('address-check-status');

    // Assert
    expect(checkStatus).toHaveTextContent(expectedText);
  });
  test('should show not verified status', () => {
    // Arrange
    render(renderWithTheme(renderWithApolloClient(<AddressCheckStatus status={NOT_VERIFIED} />)));
    // Act
    const checkStatus = screen.getByTestId('address-check-status');
    // Assert
    expect(checkStatus).toHaveTextContent('Мы проверяем указанные вами данные');
  });
});
