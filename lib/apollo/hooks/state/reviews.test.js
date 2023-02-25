import React from 'react';

import SellerProductReviews from 'graphql/queries/sellerProductReviews.graphql';
import BuyerProductReviews from 'graphql/queries/buyerProductReviews.graphql';
import SellerCompanyReviews from 'graphql/queries/sellerCompanyReviews.graphql';
import BuyerCompanyReviews from 'graphql/queries/buyerCompanyReviews.graphql';
import ProductReviews from 'graphql/queries/productReviews.graphql';
import ProductsReviews from 'graphql/queries/productsReviews.graphql';
import CompaniesReviews from 'graphql/queries/companiesReviews.graphql';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import {
  mockBuyerProductReviewsData,
  mockProductReviews,
  mockProductReviewsData,
  mockProductsReviewData,
  mockSellerProductReviewsData,
} from '__tests__/mocks/mockProductReviews';
import {
  mockBuyerCompanyReviewsData,
  mockCompaniesReviews,
  mockCompaniesReviewsData,
  mockSellerCompanyReviewsData,
} from '__tests__/mocks/mockCompaniesReviews';
import {
  useBuyerCompanyReviews,
  useBuyerProductReviews,
  useCompaniesReviews,
  useProductReviews,
  useProductsReviews,
  useSellerCompanyReviews,
  useSellerProductReviews,
} from './reviews';

describe('Reviews', () => {
  describe('useProductsReviews', () => {
    test('should return products reviews data', async () => {
      // Arrange
      const mockSearchQuery = '';
      const mocks = [
        {
          request: {
            query: ProductsReviews,
            variables: { searchQuery: mockSearchQuery },
          },
          result: {
            data: mockProductsReviewData,
          },
        },
      ];

      const { result } = renderHook(() => useProductsReviews({ searchQuery: mockSearchQuery }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.reviews).toEqual(mockProductReviews);
      });
    });

    test('should return error', async () => {
      // Arrange
      const error = new Error();
      const mocks = [
        {
          request: {
            query: ProductsReviews,
          },
          error,
        },
      ];

      const { result } = renderHook(() => useProductsReviews({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.error).toEqual(error);
      });
    });
  });

  describe('useCompaniesReview', () => {
    test('should return companies reviews data', async () => {
      // Arrange
      const mockSearchQuery = '';
      const mocks = [
        {
          request: {
            query: CompaniesReviews,
            variables: { companyName: mockSearchQuery },
          },
          result: {
            data: mockCompaniesReviewsData,
          },
        },
      ];

      const { result } = renderHook(() => useCompaniesReviews({ companyName: mockSearchQuery }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.reviews).toEqual(mockCompaniesReviews);
      });
    });

    test('should return error', async () => {
      // Arrange
      const error = new Error();
      const mocks = [
        {
          request: {
            query: CompaniesReviews,
          },
          error,
        },
      ];

      const { result } = renderHook(() => useCompaniesReviews({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.error).toEqual(error);
      });
    });
  });

  describe('useSellerProductReviews', () => {
    test('should return products reviews data', async () => {
      // Arrange
      const mockSellerCompanyId = 1;
      const mocks = [
        {
          request: {
            query: SellerProductReviews,
            variables: { sellerCompanyId: mockSellerCompanyId },
          },
          result: {
            data: mockSellerProductReviewsData,
          },
        },
      ];

      const { result } = renderHook(
        () => useSellerProductReviews({ sellerCompanyId: mockSellerCompanyId }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      // Assert
      await waitFor(() => {
        expect(result.current.sellerProductReviews).toEqual(mockProductReviews);
      });
    });

    test('should return error', async () => {
      // Arrange
      const error = new Error();
      const mocks = [
        {
          request: {
            query: SellerProductReviews,
          },
          error,
        },
      ];

      const { result } = renderHook(() => useSellerProductReviews({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.error).toEqual(error);
      });
    });
  });

  describe('useBuyerProductReviews', () => {
    test('should return buyer products reviews data', async () => {
      // Arrange
      const mockBuyerCompanyId = 1;
      const mocks = [
        {
          request: {
            query: BuyerProductReviews,
            variables: { buyerCompanyId: mockBuyerCompanyId },
          },
          result: {
            data: mockBuyerProductReviewsData,
          },
        },
      ];

      const { result } = renderHook(
        () => useBuyerProductReviews({ buyerCompanyId: mockBuyerCompanyId }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      // Assert
      await waitFor(() => {
        expect(result.current.buyerProductReviews).toEqual(mockProductReviews);
      });
    });

    test('should return error', async () => {
      // Arrange
      const error = new Error();
      const mocks = [
        {
          request: {
            query: BuyerProductReviews,
          },
          error,
        },
      ];

      const { result } = renderHook(() => useBuyerProductReviews({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.error).toEqual(error);
      });
    });
  });

  describe('useSellerCompanyReviews', () => {
    test('should return seller company reviews data', async () => {
      // Arrange
      const mockSellerCompanyId = 1;
      const mocks = [
        {
          request: {
            query: SellerCompanyReviews,
            variables: { sellerCompanyId: mockSellerCompanyId },
          },
          result: {
            data: mockSellerCompanyReviewsData,
          },
        },
      ];

      const { result } = renderHook(
        () => useSellerCompanyReviews({ sellerCompanyId: mockSellerCompanyId }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      // Assert
      await waitFor(() => {
        expect(result.current.sellerCompanyReviews).toEqual(mockCompaniesReviews);
      });
    });

    test('should return error', async () => {
      // Arrange
      const error = new Error();
      const mocks = [
        {
          request: {
            query: SellerCompanyReviews,
          },
          error,
        },
      ];

      const { result } = renderHook(() => useSellerCompanyReviews({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.error).toEqual(error);
      });
    });
  });

  describe('useBuyerCompanyReviews', () => {
    test('should return buyer company reviews data', async () => {
      // Arrange
      const mockBuyerCompanyId = 1;
      const mocks = [
        {
          request: {
            query: BuyerCompanyReviews,
            variables: { buyerCompanyId: mockBuyerCompanyId },
          },
          result: {
            data: mockBuyerCompanyReviewsData,
          },
        },
      ];

      const { result } = renderHook(
        () => useBuyerCompanyReviews({ buyerCompanyId: mockBuyerCompanyId }),
        {
          wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
        },
      );

      // Assert
      await waitFor(() => {
        expect(result.current.buyerCompanyReviews).toEqual(mockCompaniesReviews);
      });
    });

    test('should return error', async () => {
      // Arrange
      const error = new Error();
      const mocks = [
        {
          request: {
            query: BuyerCompanyReviews,
          },
          error,
        },
      ];

      const { result } = renderHook(() => useBuyerCompanyReviews({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.error).toEqual(error);
      });
    });
  });

  describe('useProductReviews', () => {
    test('should return product reviews data', async () => {
      // Arrange
      const mockProductId = 1;
      const mocks = [
        {
          request: {
            query: ProductReviews,
            variables: { productId: mockProductId, first: 12 },
          },
          result: {
            data: mockProductReviewsData,
          },
        },
      ];

      const { result } = renderHook(() => useProductReviews({ productId: mockProductId }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.productReviews).toEqual(mockProductReviews);
      });
    });

    test('should return error', async () => {
      // Arrange
      const error = new Error();
      const mocks = [
        {
          request: {
            query: ProductReviews,
            variables: { first: 12 },
          },
          error,
        },
      ];

      const { result } = renderHook(() => useProductReviews({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      // Assert
      await waitFor(() => {
        expect(result.current.error).toEqual(error);
      });
    });
  });
});
