import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

export type TAddProductToCart = {
  companyId: string;
};

export type TAddProductToGuestCart = {
  onCompleted: () => void;
};

export type TDestroyOrder = {
  orderId: string;
  onSubmit?: () => void;
  deleteFromCache?: boolean;
};

export type TOrderInfoEdge = {
  node: OrderInfoFragment;
};

export type TExisting = { edges: TOrderInfoEdge[] };

export type TUpdateOrderDelivery = {
  orderId: string;
};

export type TPlaceOrder = {
  orderId: string;
  onConfirm?: () => void;
};

export type TFinishOrderDelivery = {
  orderId: string;
};

export type TConfirmOrderPayment = {
  orderId: string;
  onSubmit?: () => void;
  deleteFromCache?: boolean;
};
