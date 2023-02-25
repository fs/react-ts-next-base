import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { EVariant } from '../../types';

export type TActionContent = {
  companyId?: string;
  variant: `${EVariant}`;
  isDetailed?: boolean;
  refetchOrders: () => void;
  isUserBuyer: boolean;
  order: OrderInfoFragment;
};
