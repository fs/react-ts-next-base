import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';

type TLinkHref = {
  pathname: string;
  query: { [key: string]: string | undefined };
};

export type TProductImage = {
  product: ProductInfoFragment;
  href?: TLinkHref;
};

export type TImage = {
  photo: string | null;
  name?: string | null;
};
