import { OrderExecutionStatusEnum } from 'graphql/types';
import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';
import { CompanyInfoFragment } from 'graphql/fragments/__generated__/companyInfo.generated';

export type TOrderContent = {
  orderId: string;
  placedAt: string;
  executionStatus?: `${OrderExecutionStatusEnum}` | null;
  orderCoast: number;
  isUserBuyer: boolean;
  isAdmin: boolean;
  dispute?: DisputeFragment | null;
  buyer?: CompanyInfoFragment | null;
  seller: CompanyInfoFragment;
};

export type TOrderBuyerInfo = {
  buyer?: CompanyInfoFragment | null;
  isAdmin: boolean;
  isUserBuyer: boolean;
  route: string;
};
