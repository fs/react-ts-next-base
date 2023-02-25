import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useCreateReview } from 'lib/apollo/hooks/actions/order';

import { mockOrder } from '__tests__/mocks/mockOrders';

import ReviewModal from './index';

jest.mock('lib/apollo/hooks/actions/order');

describe('ReviewModal', () => {
  const { id: mockOrderId } = mockOrder;
  const mockedUseCreateReview = useCreateReview as jest.Mock;
  const mockCreateReview = jest.fn(() => mockOrder);
  const mockUseCreateReview = jest.fn(() => [mockCreateReview]);
  mockedUseCreateReview.mockImplementation(mockUseCreateReview);

  test('should call useCreateReview on submit', async () => {
    // Arrange
    const expectedCompanyBody = 'company review text';
    const expectedProductBody = 'product review text';
    const expectedValues = {
      companyRating: 2,
      productRating: 2,
      orderId: mockOrderId,
      companyBody: expectedCompanyBody,
      productBody: expectedProductBody,
    };

    // Act
    render(renderWithTheme(renderWithApolloClient(<ReviewModal order={mockOrder} />)));

    fireEvent.click(screen.getByTestId('review-modal-button'));

    const companyRating = screen.getByTestId('companyRating-increment-button');
    const productRating = screen.getByTestId('productRating-increment-button');
    const companyTextField = screen.getByTestId('company-text');
    const productsTextField = screen.getByTestId('products-text');
    const submitButton = screen.getByTestId('create-review-submit-button');

    fireEvent.click(companyRating);
    fireEvent.change(companyTextField, { target: { value: expectedCompanyBody } });

    fireEvent.click(productRating);
    fireEvent.change(productsTextField, { target: { value: expectedProductBody } });

    fireEvent.click(submitButton);

    // Assert
    expect(mockUseCreateReview).toHaveBeenCalledWith();
    await waitFor(() => {
      expect(mockCreateReview).toHaveBeenCalledWith(expectedValues);
    });
  });
});
