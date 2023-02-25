import { CompanyInfoFragment } from 'graphql/fragments/__generated__/companyInfo.generated';
import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

export type TCompanyContent = {
  company: CompanyInfoFragment;
};

export type TReviewContent = Pick<OrderInfoFragment, 'productReview' | 'companyReview'>;
export type TReviewDetailsModal = { order: OrderInfoFragment };
