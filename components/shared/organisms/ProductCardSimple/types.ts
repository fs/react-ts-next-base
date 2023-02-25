import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';

export enum EVariant {
  DEFAULT = 'default',
  ADMIN_PRIORITY = 'admin_priority',
}

export type TProductCardSimple = {
  product: ProductInfoFragment;
  variant?: `${EVariant}`;
};
