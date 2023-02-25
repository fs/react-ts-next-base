import { StatusEnum } from 'graphql/types';
import { EVariant } from '../../types';

export type TProductCardSimpleActions = {
  productId: string;
  deleted: boolean;
  status: StatusEnum;
  variant: `${EVariant}`;
  canAddToPriorityList: boolean;
  canRemoveFromPriorityList: boolean;
};

export type TDestroyCustomerProductButton = {
  productId: string;
};

export type TRestoreCustomerProductButton = {
  productId: string;
};

export type TAddProductToPriorityButton = {
  productId: string;
};

export type TRemoveProductFromPriorityButton = {
  productId: string;
};
