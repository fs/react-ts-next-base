import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';
import { TView } from 'public/styles/config/view';
import { TWidth } from 'public/styles/config/width';

export enum EVariant {
  COMPANY = 'company',
  CATALOG = 'catalog',
}

export type TProductCard = TView &
  TWidth & {
    product: ProductInfoFragment;
    variant?: `${EVariant}`;
    refetchProducts?: () => void;
    isFavoriteModalShown?: boolean;
  };
