import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';

export type TPriorityProducts = {
  customerProducts: ProductInfoFragment[];
  loading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => Promise<void>;
};
