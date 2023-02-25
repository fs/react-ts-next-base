import { StatusEnum } from 'graphql/types';

export enum EProductStatus {
  checking = 'CHECKING',
  rejection = 'REJECTION',
  draft = 'DRAFT',
  outOfStock = 'OUT_OF_STOCK',
}

export type TProductCheckStatus = {
  status: StatusEnum;
  draft: boolean;
};
