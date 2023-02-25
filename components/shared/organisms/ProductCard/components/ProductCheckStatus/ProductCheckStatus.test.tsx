import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { StatusEnum } from 'graphql/types';

import ProductCheckStatus from '.';

describe('ProductCheckStatus', () => {
  test("shouldn't show status", () => {
    // Act
    render(renderWithTheme(<ProductCheckStatus status={StatusEnum.Verified} draft={false} />));

    // Assert
    expect(screen.queryByTestId('product-status')).not.toBeInTheDocument();
  });

  test('should show checking status', () => {
    // Act
    render(renderWithTheme(<ProductCheckStatus status={StatusEnum.NotVerified} draft={false} />));
    const productStatus = screen.getByTestId('product-status');
    const productStatusText = screen.getByTestId('product-status-text');

    // Assert
    expect(productStatus).toBeInTheDocument();
    expect(productStatusText).toHaveTextContent('Мы проверяем ваш товар');
  });

  test('should show rejection status', () => {
    // Act
    render(renderWithTheme(<ProductCheckStatus status={StatusEnum.Rejected} draft />));
    const productStatus = screen.getByTestId('product-status');
    const productStatusText = screen.getByTestId('product-status-text');

    // Assert
    expect(productStatus).toBeInTheDocument();
    expect(productStatusText).toHaveTextContent(
      'Внесите запрошенные администратором корректировки',
    );
  });

  test('should show draft status', () => {
    // Act
    render(renderWithTheme(<ProductCheckStatus status={StatusEnum.NotVerified} draft />));
    const productStatus = screen.getByTestId('product-status');
    const productStatusText = screen.getByTestId('product-status-text');

    // Assert
    expect(productStatus).toBeInTheDocument();
    expect(productStatusText).toHaveTextContent('Вы не завершили добавление товара');
  });

  test('should show out of stock status with draft', () => {
    // Act
    render(renderWithTheme(<ProductCheckStatus status={StatusEnum.OutOfStock} draft />));
    const productStatus = screen.getByTestId('product-status');
    const productStatusText = screen.getByTestId('product-status-text');

    // Assert
    expect(productStatus).toBeInTheDocument();
    expect(productStatusText).toHaveTextContent('Товар закончился');
  });

  test('should show out of stock status without draft', () => {
    // Act
    render(renderWithTheme(<ProductCheckStatus status={StatusEnum.OutOfStock} draft={false} />));
    const productStatus = screen.getByTestId('product-status');
    const productStatusText = screen.getByTestId('product-status-text');

    // Assert
    expect(productStatus).toBeInTheDocument();
    expect(productStatusText).toHaveTextContent('Товар закончился');
  });
});
