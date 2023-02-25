import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import useNotifier from 'hooks/useNotifier';

import UpdateCustomerCompanyReview from 'graphql/mutations/updateCustomerCompanyReview.graphql';
import UpdateCustomerProductReview from 'graphql/mutations/updateCustomerProductReview.graphql';
import { useUpdateCustomerCompanyReview, useUpdateCustomerProductReview } from './review';

jest.mock('hooks/useNotifier');

describe('review actions', () => {
  // Arrange
  useNotifier.mockImplementation(jest.fn(() => ({ setSuccess: jest.fn(), setError: jest.fn() })));

  describe('useUpdateCustomerCompanyReview', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockReviewId = 1;
      const mockOnSubmit = () => {};

      const data = {
        reviewId: mockReviewId,
        companyBody: 'test comment',
      };

      const mockResult = {
        id: mockReviewId,
        companyBody: data.companyBody,
      };

      const mocks = [
        {
          request: {
            query: UpdateCustomerCompanyReview,
            variables: { input: data },
          },
          result: {
            data: { updateCustomerCompanyReview: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useUpdateCustomerCompanyReview({ reviewId: mockReviewId, onSubmit: mockOnSubmit }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data.companyBody));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateCustomerCompanyReview).toEqual(mockResult);
      });
    });
  });

  describe('useUpdateCustomerProductReview', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockReviewId = 1;
      const mockOnSubmit = () => {};

      const data = {
        reviewId: mockReviewId,
        productBody: 'test comment',
      };

      const mockResult = {
        id: mockReviewId,
        productBody: data.productBody,
      };

      const mocks = [
        {
          request: {
            query: UpdateCustomerProductReview,
            variables: { input: data },
          },
          result: {
            data: { updateCustomerProductReview: mockResult },
          },
        },
      ];

      // Act
      const { result } = renderHook(
        () => useUpdateCustomerProductReview({ reviewId: mockReviewId, onSubmit: mockOnSubmit }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      const execute = result.current[0];
      setTimeout(() => execute(data.productBody));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.updateCustomerProductReview).toEqual(mockResult);
      });
    });
  });
});
