import { CompanyReviewOrderEnum, ProductReviewOrderEnum } from 'graphql/types';

export const REVIEW_TYPE = {
  PRODUCT: 'PRODUCT',
  COMPANIES: 'COMPANIES',
};

export const productOptions = [
  { value: ProductReviewOrderEnum.CreatedAtAsc, label: 'По дате (с начала)' },
  { value: ProductReviewOrderEnum.CreatedAtDesc, label: 'По дате (с конца)' },
  { value: ProductReviewOrderEnum.ProductRatingDesc, label: 'Высший рейтинг' },
  { value: ProductReviewOrderEnum.ProductRatingAsc, label: 'Низший рейтинг' },
];

export const companyOptions = [
  { value: CompanyReviewOrderEnum.CreatedAtAsc, label: 'По дате (с начала)' },
  { value: CompanyReviewOrderEnum.CreatedAtDesc, label: 'По дате (с конца)' },
  { value: CompanyReviewOrderEnum.CompanyRatingDesc, label: 'Высший рейтинг' },
  { value: CompanyReviewOrderEnum.CompanyRatingAsc, label: 'Низший рейтинг' },
];
