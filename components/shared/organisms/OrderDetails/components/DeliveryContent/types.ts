import { DeliveryMethodEnum } from 'graphql/types';
import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

export type getDeliveryAddressLabelProps = {
  deliveryMethod: `${DeliveryMethodEnum}`;
  deliveryAddress?: string | null;
  sellerAddress?: string | null;
};

export type getDeliveryServiceLabelProps = {
  deliveryMethod: `${DeliveryMethodEnum}`;
  serviceLabel: string;
  deliveryLabel?: string;
};

export type TDeliveryContent = Pick<
  OrderInfoFragment,
  'deliveryPrice' | 'deliveryMethod' | 'deliveryService' | 'product' | 'deliveryAddress'
>;
