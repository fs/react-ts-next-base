import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';
import { TView } from 'public/styles/config/view';
import { EVariant } from '../../types';

export type TProductViewRow = TView & {
  product: ProductInfoFragment;
  isUserBuyer: boolean;
  variant: `${EVariant}`;
  price: string;
  refetchProducts: () => void;
  isFavoriteModalShown: boolean;
};
