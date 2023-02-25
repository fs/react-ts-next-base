import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

export type TOrderCartDetails = {
  order: OrderInfoFragment;
  summaryCount: number;
  onChangeOrderQuantity?: (count: number) => void;
  loadingQuantity?: boolean;
};
