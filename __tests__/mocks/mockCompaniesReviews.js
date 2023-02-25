import mockCompany from './mockCompany';
import { mockPageInfo } from './mockPageInfo';

const mockCompanyReview = {
  __typename: 'CompanyReview',
  companyBody: 'companyBody',
  companyRating: 1,
  id: '1',
  createdAt: '2022-02-02',
  seller: mockCompany,
  buyer: mockCompany,
};

export const mockCompaniesReviews = [
  {
    ...mockCompanyReview,
    companyBody: '123',
    companyRating: 1,
    id: '1',
    createdAt: '2022-02-02',
  },
  {
    ...mockCompanyReview,
    companyBody: '123456',
    companyRating: 5,
    id: '2',
    createdAt: '2022-02-02',
  },
  {
    ...mockCompanyReview,
    companyBody: '123',
    companyRating: 5,
    id: '3',
    createdAt: '2022-02-02',
  },
];

export const mockCompaniesReviewsData = {
  companiesReviews: {
    edges: mockCompaniesReviews.map(companyReview => ({
      node: companyReview,
    })),
    pageInfo: mockPageInfo,
  },
};

export const mockSellerCompanyReviewsData = {
  sellerCompanyReviews: {
    edges: mockCompaniesReviews.map(companyReview => ({
      node: companyReview,
      cursor: 'MJ',
    })),
    pageInfo: mockPageInfo,
  },
};

export const mockBuyerCompanyReviewsData = {
  buyerCompanyReviews: {
    edges: mockCompaniesReviews.map(companyReview => ({
      node: companyReview,
      cursor: 'MJ',
    })),
    pageInfo: mockPageInfo,
  },
};
