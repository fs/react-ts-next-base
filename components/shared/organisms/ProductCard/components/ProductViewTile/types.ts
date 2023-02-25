import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';
import { TView } from 'public/styles/config/view';
import { EVariant } from '../../types';

export type TProductCard = TView & {
  product: ProductInfoFragment;
  isUserBuyer: boolean;
  price: string;
  variant: `${EVariant}`;
  refetchProducts: () => void;
  isFavoriteModalShown: boolean;
};
