import { OrderExecutionStatusEnum } from 'graphql/types';
import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

export enum EVariant {
  DEFAULT = 'default',
  ADMIN_OPERATION = 'admin_operation',
  ADMIN_DISPUTES = 'admin_disputes',
  DOCUMENTS = 'documents',
}

export type TOrderDetails = {
  order: OrderInfoFragment;
  isDetailed?: boolean;
  variant?: `${EVariant}`;
  refetchOrders?: () => void;
};

export type TStatusProps = {
  status?: `${OrderExecutionStatusEnum}` | null;
};
