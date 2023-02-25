import { ParsedUrlQuery } from 'querystring';

import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';
import { TView } from 'public/styles/config/view';
import { EVariant } from '../../types';

export const parseQuery = (query: ParsedUrlQuery) => {
  return {
    companyId:
      Array.isArray(query.companyId) || query.companyId === undefined ? '' : query.companyId,
  };
};

export type TActionButtons = TView & {
  product: ProductInfoFragment;
  variant: `${EVariant}`;
  isFavoriteModalShown: boolean;
  isUserBuyer: boolean;
  refetchProducts: () => void;
};

export type TFavoriteButton = {
  favorite: boolean;
  productId: string;
  isFavoriteModalShown: boolean;
  refetchProducts: () => void;
};

export type TRemoveProductButton = {
  id: string;
  name: string;
  isDraft?: boolean;
  isTemplate?: boolean;
};

export type TRenewProductButton = {
  productId: string;
  companyId: string;
  onlyRedirect?: boolean;
};

export type TRestoreProductButton = {
  productId: string;
  companyId: string;
};

export type TUseTemplateButton = {
  productId: string;
  companyId: string;
};
