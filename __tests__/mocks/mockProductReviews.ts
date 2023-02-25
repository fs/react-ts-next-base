import mockCompany from './mockCompany';
import { mockProduct } from './mockProducts';
import { mockVariants } from './mockVariants';
import { mockPageInfo } from './mockPageInfo';

const mockProductReview = {
  __typename: 'ProductReview' as const,
  productBody: '123',
  productRating: 1,
  product: mockProduct,
  variant: mockVariants[0],
  id: '1',
  createdAt: '2022-02-02',
  seller: mockCompany,
  buyer: mockCompany,
};

export const mockProductReviews = [
  {
    ...mockProductReview,
    productBody: '123',
    productRating: 1,
    id: '1',
    createdAt: '2022-02-02',
  },
  {
    ...mockProductReview,
    productBody: '123456',
    productRating: 5,
    id: '2',
    createdAt: '2022-02-02',
  },
  {
    ...mockProductReview,
    productBody: '123',
    productRating: 5,
    id: '3',
    createdAt: '2022-02-02',
  },
];

export const mockProductRandomReviews = [{ randomReview: mockProductReview }];

export const mockProductRandomReviewData = {
  products: {
    edges: mockProductRandomReviews.map(productRandomReview => ({
      node: productRandomReview,
      cursor: null,
    })),
  },
};

export const mockProductReviewsData = {
  productReviews: {
    edges: mockProductReviews.map(productReview => ({
      node: productReview,
      cursor: null,
    })),
    pageInfo: mockPageInfo,
  },
};

export const mockProductsReviewData = {
  productsReviews: {
    edges: mockProductReviews.map(productReview => ({
      node: productReview,
    })),
    pageInfo: mockPageInfo,
  },
};

export const mockSellerProductReviewsData = {
  sellerProductReviews: {
    edges: mockProductReviews.map(productReview => ({
      node: productReview,
      cursor: 'MJ',
    })),
    pageInfo: mockPageInfo,
  },
};

export const mockBuyerProductReviewsData = {
  buyerProductReviews: {
    edges: mockProductReviews.map(productReview => ({
      node: productReview,
      cursor: 'MJ',
    })),
    pageInfo: mockPageInfo,
  },
};
