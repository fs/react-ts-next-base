import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

export type TReservedOrders = {
  isCompanyVerified: boolean;
  orders: OrderInfoFragment[];
  refetchReservedOrders: () => void;
};
